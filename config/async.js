"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
(async () => {
    try {
        await init_1.sequelize.sync({ alter: true });
        console.log('All models synchronized with the database.');
    }
    catch (error) {
        console.error('Error synchronizing models:', error);
    }
})();
//# sourceMappingURL=async.js.map