"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendValidationError = exports.sendAuthError = exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (async (res, req) => {
    const responseData = {
        data: req.data,
        dataCount: req.dataCount,
        totalPage: req.totalPage,
        currentPage: req.currentPage,
        message: req.message,
    };
    res.status(200).send(responseData);
});
exports.sendSuccess = sendSuccess;
const sendAuthError = (async (res, req) => {
    res.status(401).send(req.error);
});
exports.sendAuthError = sendAuthError;
const sendError = (async (res, error) => {
    const responseData = {
        message: error,
    };
    res.status(422).send(responseData);
});
exports.sendError = sendError;
const sendValidationError = (async (res, error) => {
    let transformed = {};
    if (error) {
        Object.keys(error).forEach(function (key, val) {
            transformed[key] = error[key][0];
        });
    }
    res.status(422).send({ status: false, error: transformed });
});
exports.sendValidationError = sendValidationError;
//# sourceMappingURL=responseSender.js.map