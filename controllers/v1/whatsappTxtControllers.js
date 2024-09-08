"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWhatsappTxt = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const WhatsappTxt_1 = tslib_1.__importDefault(require("../../models/WhatsappTxt"));
const getWhatsappTxt = async (req, res) => {
    try {
        let WhatsappTxt;
        // Fetch paginated banners with the search condition
        WhatsappTxt = await WhatsappTxt_1.default.findAll({
            where: { status: 1 },
            attributes: ["id", "title", "share_txt", "imageandvideo"],
            raw: true,
        });
        let response = {
            data: WhatsappTxt
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.getWhatsappTxt = getWhatsappTxt;
//# sourceMappingURL=whatsappTxtControllers.js.map