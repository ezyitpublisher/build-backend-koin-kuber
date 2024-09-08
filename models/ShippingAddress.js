"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/ShippingAddress.ts
const sequelize_1 = require("sequelize");
const init_1 = require("../config/init");
class ShippingAddress extends sequelize_1.Model {
}
ShippingAddress.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    full_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    address_line_1: {
        type: sequelize_1.DataTypes.STRING,
    },
    address_line_2: {
        type: sequelize_1.DataTypes.STRING,
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
    },
    pincode: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
    },
    fcm_token: {
        type: sequelize_1.DataTypes.STRING,
    },
    is_winner: {
        type: sequelize_1.DataTypes.NUMBER,
        defaultValue: 0
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: init_1.sequelize,
    modelName: 'ShippingAddress',
    tableName: 'shipping_address'
});
exports.default = ShippingAddress;
//# sourceMappingURL=ShippingAddress.js.map