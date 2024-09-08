"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.sendNotification = exports.getNotifications = void 0;
const tslib_1 = require("tslib");
const responseSender_1 = require("../../helpers/responseSender"); // Import helper functions for sending success and error responses
const helper_1 = require("../../helpers/helper"); // Import a helper function for sending notifications
const Notification_1 = tslib_1.__importDefault(require("../../models/Notification")); // Import the Notification model
const PaymentWithdraw_1 = tslib_1.__importDefault(require("../../models/PaymentWithdraw")); // Import the ShippingAddress model
const sequelize_1 = require("sequelize"); // Import the Op object for Sequelize query operators
const getNotifications = async (req, res) => {
    try {
        let notification, notifiCount, fileRes;
        let { query } = req; // Extract query parameters from the request
        // Set default values for page and limit if not provided in the query
        let page = parseInt(query.page) || 1; // Set default page to 1
        let limit = parseInt(query.limit) || 5; // Set default limit to 5
        let offset = (page - 1) * limit; // Calculate the offset for pagination
        // Search condition for the title
        let searchCondition = query.search
            ? { notification: { [sequelize_1.Op.like]: `%${query.search}%` } } // If a search query is provided, use it in the search condition
            : {}; // Otherwise, use an empty search condition
        if (query.resent_id) {
            // Fetch a specific notification if the resent_id query parameter is provided
            notification = await Notification_1.default.findOne({
                where: {
                    id: parseInt(query.resent_id),
                },
                attributes: ["notify_title", "notify_msg", "notify_img"], // Select specific attributes
                raw: true, // Return raw data (not instances of the model)
            });
            await PaymentWithdraw_1.default.findAll({
                attributes: ['fcm_token'], // Select FCM tokens
                raw: true
            }).then((res) => {
                if (res !== null) {
                    // Filter out null values and remove duplicates
                    const validFcmTokens = Array.from(new Set(res.map(item => item.fcm_token) // Extract fcm_token from each item
                        .filter(token => token !== null) // Remove null values
                    ));
                    let bodyRes = {
                        "notify_title": notification.notify_title,
                        "notify_msg": notification.notify_msg,
                    };
                    fileRes = "../../public/uploads/notifications/" + notification.notify_img; // Set the path for the notification image
                    (0, helper_1.notificationSend)(bodyRes, validFcmTokens, fileRes); // Send the notification
                }
            });
        }
        else {
            // Get total count of notifications with the search condition
            notifiCount = await Notification_1.default.count({
                where: searchCondition, // Apply the search condition
            });
            // Fetch paginated notifications with the search condition
            notification = await Notification_1.default.findAll({
                where: searchCondition, // Apply the search condition
                attributes: ["id", "notify_title", "notify_msg", "notify_img", "status"], // Select specific attributes
                limit: limit, // Limit the number of results
                offset: offset, // Apply the offset for pagination
                raw: true, // Return raw data
            });
        }
        let response = {
            data: notification, // Return the fetched notifications
            dataCount: notifiCount, // Return the total count of notifications
            totalPage: Math.ceil(notifiCount / limit), // Calculate the total number of pages
            currentPage: page, // Return the current page
            message: "Get all notifications.", // Response message
        };
        return (0, responseSender_1.sendSuccess)(res, response); // Send a success response
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message); // Handle errors and send an error response
    }
};
exports.getNotifications = getNotifications;
const sendNotification = async (req, res) => {
    try {
        let notifyRes;
        let { body, query, file } = req; // Extract the body, query, and file from the request
        if (file) {
            body.notify_img = file.filename; // If a file is uploaded, set the file name in the request body
        }
        notifyRes = await Notification_1.default.create(body); // Create a new notification with the request body
        await PaymentWithdraw_1.default.findAll({
            attributes: ['fcm_token'], // Select FCM tokens
            raw: true
        }).then((res) => {
            if (res !== null) {
                // Filter out null values and remove duplicates
                const validFcmTokens = Array.from(new Set(res.map(item => item.fcm_token) // Extract fcm_token from each item
                    .filter(token => token !== null) // Remove null values
                ));
                (0, helper_1.notificationSend)(body, validFcmTokens, file); // Send the notification with the valid FCM tokens
            }
        });
        let response = {
            data: notifyRes, // Return the created notification
            message: 'New Notify added.', // Response message
        };
        return (0, responseSender_1.sendSuccess)(res, response); // Send a success response
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message); // Handle errors and send an error response
    }
};
exports.sendNotification = sendNotification;
const deleteNotification = async (req, res) => {
    try {
        let { query } = req; // Extract the query parameters from the request
        let task = await Notification_1.default.destroy({
            where: {
                id: query.del_id // Delete the notification with the specified ID
            }
        });
        let response = {
            data: task, // Return the result of the deletion
            message: "Task deleted." // Response message
        };
        return (0, responseSender_1.sendSuccess)(res, response); // Send a success response
    }
    catch (error) {
        return (0, responseSender_1.sendError)(res, error.message); // Handle errors and send an error response
    }
};
exports.deleteNotification = deleteNotification;
//# sourceMappingURL=notificationControllers.js.map