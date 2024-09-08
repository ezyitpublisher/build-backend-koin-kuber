"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification = exports.client = void 0;
const tslib_1 = require("tslib");
const OneSignal = tslib_1.__importStar(require("@onesignal/node-onesignal"));
// OneSignal configuration
const configuration = OneSignal.createConfiguration({
    userAuthKey: process.env.USER_KEY_TOKEN, // Your OneSignal User Auth Key
    restApiKey: process.env.API_KEY, // Your OneSignal REST API Key
});
const client = new OneSignal.DefaultApi(configuration);
exports.client = client;
// Create a notification object
const notification = new OneSignal.Notification();
exports.notification = notification;
//# sourceMappingURL=firebase.js.map