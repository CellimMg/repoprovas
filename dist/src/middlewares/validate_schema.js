"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
function validateSchema(schema) {
    return (req, res, next) => {
        const data = req.body;
        const { error } = schema.validate(data);
        if (error)
            return res.status(422).send({ message: error.message });
        next();
    };
}
exports.validateSchema = validateSchema;
