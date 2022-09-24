"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDisciplineWithCategories = void 0;
function toDisciplineWithCategories(discipline) {
    return Object.assign(Object.assign({}, discipline), { categories: [] });
}
exports.toDisciplineWithCategories = toDisciplineWithCategories;
