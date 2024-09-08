"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/User.ts
const sequelize_1 = require("sequelize");
const init_1 = require("../config/init");
class TermsConditions extends sequelize_1.Model {
}
TermsConditions.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    terms_condition: {
        type: sequelize_1.DataTypes.TEXT,
    }
}, {
    sequelize: init_1.sequelize,
    modelName: 'TermsConditions',
    tableName: 'terms_condition'
});
exports.default = TermsConditions;
//# sourceMappingURL=TermsConditions.js.map