"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCategoryWithTests = void 0;
function toCategoryWithTests(category) {
    return Object.assign(Object.assign({}, category), { tests: [] });
}
exports.toCategoryWithTests = toCategoryWithTests;
