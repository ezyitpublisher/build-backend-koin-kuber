"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.ts
const sequelize_1 = require("sequelize");
const init_1 = require("../config/init");
class Banner extends sequelize_1.Model {
}
Banner.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    phone_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    banner: {
        type: sequelize_1.DataTypes.STRING,
    },
    phones: {
        type: sequelize_1.DataTypes.STRING,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize: init_1.sequelize,
    modelName: 'Banner',
    tableName: 'banners'
});
exports.default = Banner;
//# sourceMappingURL=Banner.js.map