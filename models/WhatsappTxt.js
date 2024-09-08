"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.ts
const sequelize_1 = require("sequelize");
const init_1 = require("../config/init");
class WhatsappTxt extends sequelize_1.Model {
}
WhatsappTxt.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    share_txt: {
        type: sequelize_1.DataTypes.STRING(500),
    },
    imageandvideo: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: init_1.sequelize,
    modelName: 'WhatsappTxt',
    tableName: 'whatsapp_txts'
});
exports.default = WhatsappTxt;
//# sourceMappingURL=WhatsappTxt.js.map