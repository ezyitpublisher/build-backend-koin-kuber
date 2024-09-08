"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winnerUsers = exports.storePaymentWithdraw = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const PaymentWithdraw_1 = tslib_1.__importDefault(require("../../models/PaymentWithdraw"));
const storePaymentWithdraw = async (req, res) => {
    try {
        let payWithAdd;
        let { body } = req;
        if ((body.full_name !== "" && body.full_name !== null && body.full_name !== undefined) &&
            (body.phone_number !== "" && body.phone_number !== null && body.phone_number !== undefined) &&
            (body.payment_gateway !== "" && body.payment_gateway !== null && body.payment_gateway !== undefined) &&
            (body.payment_number !== "" && body.payment_number !== null && body.payment_number !== undefined) &&
            (body.upi_id !== "" && body.upi_id !== null && body.upi_id !== undefined) &&
            (body.paypal_id !== "" && body.paypal_id !== null && body.paypal_id !== undefined) &&
            (body.crypto_id !== "" && body.crypto_id !== null && body.crypto_id !== undefined)) {
            payWithAdd = await PaymentWithdraw_1.default.create(body);
        }
        else {
            throw new Error("Something want to wrong..");
        }
        let response = {
            data: payWithAdd,
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.storePaymentWithdraw = storePaymentWithdraw;
const winnerUsers = async (req, res) => {
    try {
        // Count for winner users
        let winnerUsersCount = await PaymentWithdraw_1.default.findAll({
            where: {
                is_winner: 1
            },
            attributes: ["id", "full_name", "phone_number"]
        });
        let response = {
            data: winnerUsersCount,
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.winnerUsers = winnerUsers;
//# sourceMappingURL=paymentWithdrawControllers.js.map