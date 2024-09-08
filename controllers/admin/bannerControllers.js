"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBanner = exports.addEditBanner = exports.getBanner = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const Banner_1 = tslib_1.__importDefault(require("../../models/Banner"));
const sequelize_1 = require("sequelize");
const getBanner = async (req, res) => {
    try {
        let banner, bannerCount;
        let { query } = req;
        // Set default values for page and limit if not provided in the query
        let page = parseInt(query.page) || 1;
        let limit = parseInt(query.limit) || 10;
        let offset = (page - 1) * limit;
        // Search condition for the title
        let searchCondition = query.search
            ? { phone_name: { [sequelize_1.Op.like]: `%${query.search}%` } }
            : {};
        if (query.editbanner) {
            // Fetch a specific banner if the editbanner query parameter is provided
            banner = await Banner_1.default.findOne({
                where: {
                    id: parseInt(query.editbanner),
                },
                attributes: ["phone_name", "banner", "phones", "status"],
                raw: true,
            });
        }
        else {
            // Get total count of banners with the search condition
            bannerCount = await Banner_1.default.count({
                where: searchCondition,
            });
            // Fetch paginated banners with the search condition
            banner = await Banner_1.default.findAll({
                where: searchCondition,
                attributes: ["id", "phone_name", "banner", "phones", "status"],
                limit: limit,
                offset: offset,
                raw: true,
            });
        }
        let response = {
            data: banner,
            dataCount: bannerCount,
            totalPage: Math.ceil(bannerCount / limit),
            currentPage: page,
            message: "Get all banners.",
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.getBanner = getBanner;
const addEditBanner = async (req, res) => {
    var _a, _b, _c, _d, _e, _f;
    try {
        let { files, body, query } = req;
        let banner;
        if (((files === null || files === void 0 ? void 0 : files.banner) !== undefined && ((_a = files === null || files === void 0 ? void 0 : files.banner[0]) === null || _a === void 0 ? void 0 : _a.fieldname) === "banner") && ((files === null || files === void 0 ? void 0 : files.phones) !== undefined && ((_b = files === null || files === void 0 ? void 0 : files.phones[0]) === null || _b === void 0 ? void 0 : _b.fieldname) === "phones")) {
            body.banner = files === null || files === void 0 ? void 0 : files.banner[0].filename;
            body.phones = (_c = files === null || files === void 0 ? void 0 : files.phones[0]) === null || _c === void 0 ? void 0 : _c.filename;
        }
        else if ((files === null || files === void 0 ? void 0 : files.banner) !== undefined && ((_d = files === null || files === void 0 ? void 0 : files.banner[0]) === null || _d === void 0 ? void 0 : _d.fieldname) === "banner") {
            body.banner = files === null || files === void 0 ? void 0 : files.banner[0].filename;
        }
        else if ((files === null || files === void 0 ? void 0 : files.phones) !== undefined && ((_e = files === null || files === void 0 ? void 0 : files.phones[0]) === null || _e === void 0 ? void 0 : _e.fieldname) === "phones") {
            body.phones = (_f = files === null || files === void 0 ? void 0 : files.phones[0]) === null || _f === void 0 ? void 0 : _f.filename;
        }
        if (query.edit_id) {
            banner = await Banner_1.default.update(body, {
                where: {
                    id: parseInt(query.edit_id)
                }
            });
        }
        else if (query.status_id) {
            banner = await Banner_1.default.update(body, {
                where: {
                    id: query.status_id
                }
            });
        }
        else {
            banner = await Banner_1.default.create(body);
        }
        let response = {
            data: (query.edit_id || query.status_id) ? banner[0] : banner,
            message: query.status_id ? `${body.status ? 'Banner Active' : 'Banner De-Active'}` : query.edit_id ? 'Banner update successfuly.' : 'New banner added.',
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.addEditBanner = addEditBanner;
const deleteBanner = async (req, res) => {
    try {
        let { query } = req;
        let banner = await Banner_1.default.destroy({
            where: {
                id: query.del_id
            }
        });
        let response = {
            data: banner,
            message: "Banner deleted."
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.deleteBanner = deleteBanner;
//# sourceMappingURL=bannerControllers.js.map