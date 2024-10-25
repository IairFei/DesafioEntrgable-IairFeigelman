import { ticketModel } from "../models/tickets.model.js";

const create = async (data) => {
  return await ticketModel.create(data);
};

export default {
  create,
};