"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTask = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const Task_1 = tslib_1.__importDefault(require("../../models/Task"));
const getTask = async (req, res) => {
    try {
        let task;
        // Fetch paginated tasks with the search condition
        task = await Task_1.default.findAll({
            where: { status: 1 },
            attributes: ["id", "title", "task"],
            raw: true,
        });
        let response = {
            data: task
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.getTask = getTask;
//# sourceMappingURL=taskControllers.js.map