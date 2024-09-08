"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const init_1 = require("../config/init");
class Notification extends sequelize_1.Model {
}
Notification.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    notify_title: {
        type: sequelize_1.DataTypes.STRING,
    },
    notify_msg: {
        type: sequelize_1.DataTypes.STRING,
    },
    notify_img: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: init_1.sequelize,
    modelName: 'Notification',
    tableName: 'notifications'
});
exports.default = Notification;
//# sourceMappingURL=Notification.js.map