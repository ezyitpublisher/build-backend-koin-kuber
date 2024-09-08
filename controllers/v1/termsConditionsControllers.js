"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTermsAndConditions = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const TermsConditions_1 = tslib_1.__importDefault(require("../../models/TermsConditions"));
const getTermsAndConditions = async (req, res) => {
    try {
        let termsConditionsTxt;
        let { query } = req;
        // Fetch a specific banner if the editbanner query parameter is provided
        termsConditionsTxt = await TermsConditions_1.default.findOne({
            where: {
                id: 1,
            },
            attributes: ["id", "terms_condition"],
            raw: true,
        });
        let response = {
            data: termsConditionsTxt,
            message: "Get Terms Conditions Txt.",
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.getTermsAndConditions = getTermsAndConditions;
//# sourceMappingURL=termsConditionsControllers.js.map