"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEditTermsConditions = exports.getTermsAndConditions = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const TermsConditions_1 = tslib_1.__importDefault(require("../../models/TermsConditions"));
const getTermsAndConditions = async (req, res) => {
    try {
        let termsConditionsTxt;
        let { query } = req;
        if (query.edit_id) {
            // Fetch a specific banner if the editbanner query parameter is provided
            termsConditionsTxt = await TermsConditions_1.default.findOne({
                where: {
                    id: parseInt(query.edit_id),
                },
                raw: true,
            });
        }
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
const addEditTermsConditions = async (req, res) => {
    try {
        let { body, query } = req;
        let terms_condition_txt;
        await TermsConditions_1.default.update(body, {
            where: {
                id: parseInt(query.edit_id)
            }
        }).then(async (response) => {
            if (response[0] === 1) {
                terms_condition_txt = 1;
            }
            else {
                terms_condition_txt = await TermsConditions_1.default.create(body);
            }
        });
        let response = {
            data: terms_condition_txt,
            message: 'New terms condition txt added.',
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.addEditTermsConditions = addEditTermsConditions;
//# sourceMappingURL=termsConditionsControllers.js.map