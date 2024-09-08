"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuth = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const Admin_1 = tslib_1.__importDefault(require("../models/Admin"));
const AdminAuth = async (req, res, next) => {
    try {
        let token = req.headers['x-access-token'];
        if (!token) {
            throw new Error('token not found');
        }
        const { id, iat } = await jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        let loginUserData = await Admin_1.default.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'fullname', 'email', 'password', 'is_superadmin'],
            raw: true
        });
        if (!loginUserData) {
            throw new Error('user not found');
        }
        req.admininfo = loginUserData;
        next();
    }
    catch (error) {
        res.status(401).json({
            message: error.message,
        });
    }
};
exports.AdminAuth = AdminAuth;
//# sourceMappingURL=authentication.js.map