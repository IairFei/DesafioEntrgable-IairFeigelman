import customErrors from "../errors/customErrors.js";
import usersServices from "..//services/user.services.js";
import { logger } from "../utils/logger.js";
import userRepository from "../persistences/mongo/repositories/users.repository.js";
import { sendMail } from "../utils/sendMails.js";

const sendEmailResetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        res.cookie("resetPassword", email, { httpOnly: true, maxAge: 10000 });

        const response = await userServices.sendEmailResetPassword(email);
        res.status(200).json({ status: "ok", response });
    } catch (error) {
        error.path = "[POST] /api/user/email/reset-password";
        next(error);
    }
};

const resetPassword = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const emailCookie = req.cookies.resetPassword;
        if (!emailCookie) throw customErrors.badRequestError("Email link expired");

        await userServices.resetPassword(email, password);

        res.status(200).json({ status: "ok", message: "Password updated" });
    } catch (error) {
        error.path = "[POST] /api/user/reset-password";
        next(error);
    }
};

const changeUserRole = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const response = await userServices.changeUserRole(uid);
        res.status(200).json({ status: "ok", response });
    } catch (error) {
        error.path = "[GET] /api/user/premium/:uid";
        next(error);
    }
};

const addDocuments = async (req, res, next) => {
    try {
        const { uid } = req.params;
        const files = req.files;
        const response = await userServices.addDocuments(uid, files);
        res.status(200).json({ status: "ok", response });
    } catch (error) {
        error.path = "[GET] /api/user/:uid/documents";
        next(error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userRepository.getAll();
        const usersResponse = users.map(user => ({
            first_name: user.first_name,
            email: user.email,
            role: user.role,
        }));

        res.status(200).json({ status: "success", payload: usersResponse });
    } catch (error) {
        res.status(500).json({ status: "error", msg: "Error al obtener usuarios" });
    }
};

const deleteInactiveUsers = async (req, res) => {
    try {
        const inactiveThreshold = moment().subtract(30, 'minutes');
        const users = await userRepository.getAll();

        const inactiveUsers = users.filter(user => moment(user.last_connection).isBefore(inactiveThreshold));

        for (const user of inactiveUsers) {
            await userRepository.deleteOne(user._id);
            await sendMail(user.email, "Cuenta eliminada", "Tu cuenta ha sido eliminada por inactividad");
        }

        res.status(200).json({ status: "success", msg: "Usuarios inactivos eliminados" });
    } catch (error) {
            res.status(500).json({ status: "error", msg: "Error al eliminar usuarios inactivos" });
    }
};

export default { sendEmailResetPassword, resetPassword, changeUserRole, addDocuments, getAllUsers, deleteInactiveUsers };