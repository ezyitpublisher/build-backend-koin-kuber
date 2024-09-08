"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const express_1 = tslib_1.__importDefault(require("express"));
const path_1 = tslib_1.__importDefault(require("path"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const http_1 = tslib_1.__importDefault(require("http"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const admin_1 = require("./routes/admin");
const version_1_1 = require("./routes/version_1");
const users_1 = require("./routes/users");
require("./config/init");
// import "./config/async";
require("./helpers/associations");
// Models
const Admin_1 = tslib_1.__importDefault(require("./models/Admin"));
// ---- Models End 
app.use((0, cors_1.default)());
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/admin/", admin_1.adminRouter);
app.use("/v1/", version_1_1.version_1);
app.use("/users/", users_1.usersRouter);
app.get("/admin/test/", function (req, res) {
    res.send("admin is done.");
});
app.get("/v1/test/", function (req, res) {
    res.send("version 1 is done.");
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
const server = http_1.default.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, async () => {
    let username = "koinkuber@gmail.com";
    let password = "koinkuber@123";
    const hash = bcrypt_1.default.hashSync(password, 10);
    let adminUser = await Admin_1.default.findOne({
        where: {
            email: username
        },
        raw: true
    });
    if (adminUser === null) {
        await Admin_1.default.create({
            "fullname": "Adminer",
            "email": username,
            "password": hash,
            "is_superadmin": 1
        });
    }
    console.log(`Server is running on Port: ${port}`);
});
server.timeout = 9000;
//# sourceMappingURL=app.js.map