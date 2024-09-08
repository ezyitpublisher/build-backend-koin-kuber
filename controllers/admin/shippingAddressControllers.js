"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winnersAnnouncement = exports.exportShippingAddress = exports.getShippingAddress = void 0;
const tslib_1 = require("tslib");
const sequelize_1 = require("sequelize");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const csv_writer_1 = require("csv-writer");
// Helpers
const responseSender_1 = require("../../helpers/responseSender");
// Models
const ShippingAddress_1 = tslib_1.__importDefault(require("../../models/ShippingAddress"));
const getShippingAddress = async (req, res) => {
    try {
        let { query } = req, shippingaddress, shippingaddressCount;
        // Set default values for page and limit if not provided in the query
        let page = parseInt(query.page) || 1;
        let limit = parseInt(query.limit) || 20;
        let offset = (page - 1) * limit;
        // Search condition for the title
        let searchCondition = query.search ? {
            [sequelize_1.Op.or]: [
                { full_name: { [sequelize_1.Op.like]: `%${query.search}%` } },
                { city: { [sequelize_1.Op.like]: `%${query.search}%` } },
                { state: { [sequelize_1.Op.like]: `%${query.search}%` } }
            ]
        } : {};
        // Get total count of banners with the search condition
        shippingaddressCount = await ShippingAddress_1.default.count({
            where: searchCondition,
        });
        shippingaddress = await ShippingAddress_1.default.findAll({
            where: searchCondition,
            attributes: ["id", "full_name", "address_line_1", "address_line_2", "city", "state", "pincode", "phone_number", "is_winner"],
            limit: limit,
            offset: offset,
            raw: true,
        });
        let response = {
            data: shippingaddress,
            dataCount: shippingaddressCount,
            totalPage: Math.ceil(shippingaddressCount / limit),
            currentPage: page,
            message: "Get all Shipping Address."
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.getShippingAddress = getShippingAddress;
const exportShippingAddress = async (req, res) => {
    try {
        let { query } = req, expotFiled;
        const publicDir = path_1.default.join(__dirname, '../../public/uploads/exports_file');
        let shippingaddress = await ShippingAddress_1.default.findAll({
            attributes: parseInt(query.all) === 1 ? ["id", "full_name", "address_line_1", "address_line_2", "city", "state", "pincode", "phone_number"] : ["id", "full_name", "phone_number"],
            raw: true,
        });
        if (parseInt(query.all) === 1) {
            expotFiled = [
                { id: 'id', title: 'ID' },
                { id: 'full_name', title: 'Full Name' },
                { id: 'address_line_1', title: 'Address 1' },
                { id: 'address_line_2', title: 'Address 2' },
                { id: 'city', title: 'City' },
                { id: 'state', title: 'State' },
                { id: 'pincode', title: 'Pincode' },
                { id: 'phone_number', title: 'Phone Number' },
            ];
        }
        else {
            expotFiled = [
                { id: 'id', title: 'ID' },
                { id: 'full_name', title: 'Full Name' },
                { id: 'phone_number', title: 'Phone Number' },
            ];
        }
        // Ensure the directory exists
        if (!fs_1.default.existsSync(publicDir)) {
            fs_1.default.mkdirSync(publicDir, { recursive: true });
        }
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filePath = path_1.default.join(publicDir, `${uniqueSuffix}.csv`);
        const csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
            path: filePath,
            header: expotFiled
        });
        // Write records to the CSV file
        await csvWriter.writeRecords(shippingaddress);
        // Set the correct MIME type and file extension for the response
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=${uniqueSuffix}.csv`);
        let response = {
            data: `${uniqueSuffix}.csv`,
            message: "Full Name And Mobile Number in CSV format"
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (err) {
        console.error('Error writing CSV file:', err);
        res.sendStatus(500);
    }
};
exports.exportShippingAddress = exportShippingAddress;
const winnersAnnouncement = async (req, res) => {
    try {
        let winRes;
        let { query, body } = req;
        if (query.winner_id) {
            winRes = await ShippingAddress_1.default.update(body, {
                where: {
                    id: query.winner_id
                }
            });
        }
        else {
            throw new Error("someting want wrong.");
        }
        let response = {
            data: winRes[0],
            message: 'New Task added.',
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.winnersAnnouncement = winnersAnnouncement;
//# sourceMappingURL=shippingAddressControllers.js.map