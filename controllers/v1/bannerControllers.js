"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBanner = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const Banner_1 = tslib_1.__importDefault(require("../../models/Banner"));
const getBanner = async (req, res) => {
    try {
        let banner;
        // Fetch paginated banners with the search condition
        banner = await Banner_1.default.findAll({
            where: { status: 1 },
            attributes: ["id", "phone_name", "phones", "banner"],
            raw: true,
        });
        let response = {
            data: banner
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.getBanner = getBanner;
//# sourceMappingURL=bannerControllers.js.map