"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.addEditTask = exports.getTask = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender");
const Task_1 = tslib_1.__importDefault(require("../../models/Task"));
const sequelize_1 = require("sequelize");
const getTask = async (req, res) => {
    try {
        let task, taskCount;
        let { query } = req;
        // Set default values for page and limit if not provided in the query
        let page = parseInt(query.page) || 1;
        let limit = parseInt(query.limit) || 10;
        let offset = (page - 1) * limit;
        // Search condition for the title
        let searchCondition = query.search
            ? { task: { [sequelize_1.Op.like]: `%${query.search}%` } }
            : {};
        if (query.edit_id) {
            // Fetch a specific task if the edit_id query parameter is provided
            task = await Task_1.default.findOne({
                where: {
                    id: parseInt(query.edit_id),
                },
                attributes: ["title", "task", "status"],
                raw: true,
            });
        }
        else {
            // Get total count of tasks with the search condition
            taskCount = await Task_1.default.count({
                where: searchCondition,
            });
            // Fetch paginated tasks with the search condition
            task = await Task_1.default.findAll({
                where: searchCondition,
                attributes: ["id", "title", "task", "status"],
                limit: limit,
                offset: offset,
                raw: true,
            });
        }
        let response = {
            data: task,
            dataCount: taskCount,
            totalPage: Math.ceil(taskCount / limit),
            currentPage: page,
            message: "Get all tasks.",
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.getTask = getTask;
const addEditTask = async (req, res) => {
    try {
        let taskRes;
        let { body, query } = req;
        if (query.edit_id) {
            taskRes = await Task_1.default.update(body, {
                where: {
                    id: query.edit_id
                }
            });
        }
        else if (query.status_id) {
            taskRes = await Task_1.default.update(body, {
                where: {
                    id: query.status_id
                }
            });
        }
        else {
            taskRes = await Task_1.default.create(body);
        }
        let response = {
            data: (query.edit_id || query.status_id) ? taskRes[0] : taskRes,
            message: query.status_id ? `${body.status ? 'Task Active' : 'Task De-Active'}` : query.edit_id ? 'Task update successfuly.' : 'New Task added.',
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.addEditTask = addEditTask;
const deleteTask = async (req, res) => {
    try {
        let { query } = req;
        let task = await Task_1.default.destroy({
            where: {
                id: query.del_id
            }
        });
        let response = {
            data: task,
            message: "Task deleted."
        };
        return (0, responseSender_1.sendSuccess)(res, response);
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message);
    }
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=taskControllers.js.map