"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
class CustomError extends Error {
    constructor(status, success, message) {
        super(message);
        this.status = status;
        this.success = success;
    }
}
const createError = (status, success, message) => {
    const err = new CustomError(status, success, message);
    err.status = status;
    err.success = success;
    err.message = message;
    return err;
};
exports.createError = createError;
