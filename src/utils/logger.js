import { createLogger, transports, format, addColors } from "winston";
const { printf, combine, colorize, timestamp } = format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "blue",
    http: "magenta",
  },
};

addColors(customLevels.colors);

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const consoleFormat = combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat);

export const logger = createLogger({
  levels: customLevels.levels,
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console({ format: consoleFormat }),
    new transports.File({ filename: "logs/app.log" }),
    new transports.File({ filename: "logs/error.log", format: logFormat, level: "error" }),
  ],
});