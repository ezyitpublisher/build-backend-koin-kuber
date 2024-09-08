"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWhatsappTxt = exports.addEditWhatsappTxt = exports.getWhatsappTxt = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const WhatsappTxt_1 = tslib_1.__importDefault(require("../../models/WhatsappTxt"));
const sequelize_1 = require("sequelize");
const getWhatsappTxt = async (req, res) => {
    try {
        let WhatsappTxt, WhatsappTxtCount;
        let { query } = req;
        // Set default values for page and limit if not provided in the query
        let page = parseInt(query.page) || 1;
        let limit = 10;
        let offset = (page - 1) * limit;
        // Search condition for the title
        let searchCondition = query.search
            ? { share_txt: { [sequelize_1.Op.like]: `%${query.search}%` } }
            : {};
        if (query.edit_id) {
            // Fetch a specific banner if the editbanner query parameter is provided
            WhatsappTxt = await WhatsappTxt_1.default.findOne({
                where: {
                    id: parseInt(query.edit_id),
                },
                attributes: ["title", "share_txt", "imageandvideo", "status"],
                raw: true,
            });
        }
        else {
            // Get total count of banners with the search condition
            WhatsappTxtCount = await WhatsappTxt_1.default.count({
                where: searchCondition,
            });
            // Fetch paginated banners with the search condition
            WhatsappTxt = await WhatsappTxt_1.default.findAll({
                where: searchCondition,
                attributes: ["id", "title", "share_txt", "imageandvideo", "status"],
                limit: limit,
                offset: offset,
                raw: true,
            });
        }
        let response = {
            data: WhatsappTxt,
            dataCount: WhatsappTxtCount,
            totalPage: Math.ceil(WhatsappTxtCount / limit),
            currentPage: page,
            message: "Get all Whatsapp Txt.",
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.getWhatsappTxt = getWhatsappTxt;
const addEditWhatsappTxt = async (req, res) => {
    try {
        let { file, body, query } = req;
        let share_txt;
        body.status = parseInt(body.status);
        if (file) {
            body.imageandvideo = file.filename;
        }
        if (query.edit_id) {
            share_txt = await WhatsappTxt_1.default.update(body, {
                where: {
                    id: parseInt(query.edit_id)
                }
            });
        }
        else if (query.status_id) {
            share_txt = await WhatsappTxt_1.default.update(body, {
                where: {
                    id: query.status_id
                }
            });
        }
        else {
            share_txt = await WhatsappTxt_1.default.create(body);
        }
        let response = {
            data: (query.edit_id || query.status_id) ? share_txt[0] : share_txt,
            message: query.status_id ? `${body.status ? 'Whatsapp Txt Active' : 'Whatsapp Txt De-Active'}` : query.edit_id ? 'Whatsapp Txt update successfuly.' : 'New Whatsapp Txt added.',
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.addEditWhatsappTxt = addEditWhatsappTxt;
const deleteWhatsappTxt = async (req, res) => {
    try {
        let { query } = req;
        let banner = await WhatsappTxt_1.default.destroy({
            where: {
                id: query.del_id
            }
        });
        let response = {
            data: banner,
            message: "Whatsapp Text and Media deleted."
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.deleteWhatsappTxt = deleteWhatsappTxt;
//# sourceMappingURL=whatsappTxtControllers.js.map