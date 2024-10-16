"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trimmed = void 0;
const class_transformer_1 = require("class-transformer");
function Trimmed() {
    return (0, class_transformer_1.Transform)((params) => (params.value ? params.value.trim() : null));
}
exports.Trimmed = Trimmed;
//# sourceMappingURL=trim.decorator.js.map