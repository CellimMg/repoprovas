"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alreadyExists = exports.notFound = exports.wrongCredentials = exports.unexpected = exports.unauthorized = exports.codeStringToNumber = exports.isCustomError = void 0;
function isCustomError(error) {
    return error.code !== undefined;
}
exports.isCustomError = isCustomError;
function codeStringToNumber(code) {
    switch (code) {
        case "unauthorized":
            return 403;
        case "already_exists":
            return 409;
        case "not_found":
            return 404;
        case "wrong_credentials":
            return 401;
        default: //or unexpected
            return 500;
    }
}
exports.codeStringToNumber = codeStringToNumber;
function unauthorized(message) {
    return { code: "unauthorized", message };
}
exports.unauthorized = unauthorized;
function unexpected() {
    return { code: "unexpected" };
}
exports.unexpected = unexpected;
function wrongCredentials(message) {
    return { code: "wrong_credentials", message };
}
exports.wrongCredentials = wrongCredentials;
function notFound(message) {
    return { code: "not_found", message };
}
exports.notFound = notFound;
function alreadyExists(message) {
    return { code: "already_exists", message };
}
exports.alreadyExists = alreadyExists;
