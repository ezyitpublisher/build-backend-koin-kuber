"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSend = exports.jwtToken = void 0;
const tslib_1 = require("tslib");
const jwt = tslib_1.__importStar(require("jsonwebtoken"));
const firebase_1 = require("../config/firebase");
const jwtToken = (id) => {
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
    });
    return token;
};
exports.jwtToken = jwtToken;
const notificationSend = async (content, fcmToken, notifiy_img = null) => {
    try {
        let notificationRes;
        firebase_1.notification.app_id = process.env.APP_KEY; // Your OneSignal App ID
        firebase_1.notification.headings = { en: content.notify_title }; // Title of the notification
        firebase_1.notification.contents = { en: content.notify_msg }; // Content of the notification
        firebase_1.notification.included_segments = ['All']; // Target all
        // Optionally, you can target specific devices using player_ids
        firebase_1.notification.include_player_ids = fcmToken;
        if (notifiy_img !== null) {
            firebase_1.notification.big_picture = notifiy_img; // Add image to the notification if available
        }
        // Send the notification
        notificationRes = await firebase_1.client.createNotification(firebase_1.notification);
        return notificationRes;
    }
    catch (error) {
        console.log("🚀 ~ notificationSend ~ error:", error);
    }
};
exports.notificationSend = notificationSend;
//# sourceMappingURL=helper.js.map