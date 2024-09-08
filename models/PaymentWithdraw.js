"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/PaymentWithdraw.ts
const sequelize_1 = require("sequelize");
const init_1 = require("../config/init");
class PaymentWithdraw extends sequelize_1.Model {
}
PaymentWithdraw.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    full_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
    },
    payment_gateway: {
        type: sequelize_1.DataTypes.STRING,
    },
    payment_number: {
        type: sequelize_1.DataTypes.STRING,
    },
    upi_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    paypal_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    crypto_id: {
        type: sequelize_1.DataTypes.STRING,
    },
    fcm_token: {
        type: sequelize_1.DataTypes.STRING,
    },
    is_winner: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: init_1.sequelize,
    modelName: 'PaymentWithdraw',
    tableName: 'payment_withdraws'
});
exports.default = PaymentWithdraw;
//# sourceMappingURL=PaymentWithdraw.js.map