"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeShippingAddress = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const ShippingAddress_1 = tslib_1.__importDefault(require("../../models/ShippingAddress"));
const storeShippingAddress = async (req, res) => {
    try {
        let shipAdd;
        let { body } = req;
        if ((body.full_name !== "" && body.full_name !== null && body.full_name !== undefined) &&
            (body.address_line_1 !== "" && body.address_line_1 !== null && body.address_line_1 !== undefined) &&
            (body.address_line_2 !== "" && body.address_line_2 !== null && body.address_line_2 !== undefined) &&
            (body.city !== "" && body.city !== null && body.city !== undefined) &&
            (body.state !== "" && body.state !== null && body.state !== undefined) &&
            (body.pincode !== "" && body.pincode !== null && body.pincode !== undefined) &&
            (body.phone_number !== "" && body.phone_number !== null && body.phone_number !== undefined)) {
            shipAdd = await ShippingAddress_1.default.create(body);
        }
        else {
            throw new Error("Something want to wrong..");
        }
        let response = {
            data: shipAdd,
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.storeShippingAddress = storeShippingAddress;
//# sourceMappingURL=shippingAddressControllers.js.map