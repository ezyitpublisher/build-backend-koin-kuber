"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardInfo = exports.changePassword = exports.admininfo = exports.signIn = exports.signUp = void 0;
const tslib_1 = require("tslib");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const helper_1 = require("../../helpers/helper");
const responseSender_1 = require("../../helpers/responseSender");
const Admin_1 = tslib_1.__importDefault(require("../../models/Admin"));
const PaymentWithdraw_1 = tslib_1.__importDefault(require("../../models/PaymentWithdraw"));
const signUp = async (req, res) => {
    let { body } = req;
    let token, user, newData;
    try {
        body.password = bcrypt_1.default.hashSync(body.password, 10);
        // Create a user
        await Admin_1.default.create(body).then(async (response) => {
            newData = response.get();
            token = await (0, helper_1.jwtToken)(newData.id);
            newData.authentication = token;
        });
        let response = {
            data: newData,
            message: "Admin registered.",
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    try {
        let { body } = req;
        let token, user;
        user = await Admin_1.default.findOne({
            where: {
                email: body.email,
            },
            attributes: ["id", "fullname", "password", "email", "is_superadmin"],
            raw: true,
        });
        if (user !== null) {
            const matchPass = await bcrypt_1.default.compare(body.password, user === null || user === void 0 ? void 0 : user.password);
            if (matchPass) {
                token = await (0, helper_1.jwtToken)(user.id);
                user.authentication = token;
            }
            else {
                throw new Error("Invalid email and password");
            }
        }
        else {
            throw new Error("admin dosen't exist.");
        }
        let response = {
            data: user,
            message: "Admin logined in..."
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.signIn = signIn;
const admininfo = async (req, res) => {
    try {
        let { admininfo: { id } } = req;
        let user = await Admin_1.default.findOne({
            where: { id },
            attributes: ["id", "fullname", "email", "is_superadmin"],
            raw: true,
        });
        let response = {
            data: user,
            message: "Admin logged in..."
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.admininfo = admininfo;
const changePassword = async (req, res) => {
    try {
        let { body, admininfo } = req, admin;
        const matchPass = await bcrypt_1.default.compare(body.curr_password, admininfo.password);
        if (matchPass) {
            body.password = bcrypt_1.default.hashSync(body.new_password, 10);
            admin = await Admin_1.default.update(body, {
                where: {
                    id: admininfo.id
                }
            });
        }
        else {
            throw new Error("current password not mathed.");
        }
        let response = {
            data: admin[0],
            message: 'Password update successfuly.',
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.changePassword = changePassword;
const dashboardInfo = async (req, res) => {
    try {
        let { query } = req;
        // Count for all users
        let totalUsersCount = await PaymentWithdraw_1.default.count();
        // Count for winner users
        let winnerUsersCount = await PaymentWithdraw_1.default.count({
            where: {
                is_winner: 1
            }
        });
        // Count for non-winner users
        let nonWinnerUsersCount = totalUsersCount - winnerUsersCount;
        let response = {
            data: { winnerUsersCount, totalUsersCount },
            message: "Get count of users divided into winners and non-winners."
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.dashboardInfo = dashboardInfo;
//# sourceMappingURL=authController.js.map