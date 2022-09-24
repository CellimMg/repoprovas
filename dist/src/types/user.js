"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInsertFromSchema = void 0;
function userInsertFromSchema(userSchema) {
    const { email, password } = userSchema;
    return { email, password };
}
exports.userInsertFromSchema = userInsertFromSchema;
