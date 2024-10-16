"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnNumericTransformerPipe = void 0;
const index_1 = require("../../../plugins/common/dist/index");
/**
 * Convert Non-integer numbers string to integer
 * From https://github.com/typeorm/typeorm/issues/873#issuecomment-502294597
 */
class ColumnNumericTransformerPipe {
    /**
     * Transforms a number to the database value.
     *
     * @param data - The input number.
     * @returns The transformed number or null.
     */
    to(data) {
        return (0, index_1.isNullOrUndefined)(data) ? null : data;
    }
    /**
     * Transforms a string to the entity property value.
     *
     * @param data - The input string.
     * @returns The transformed number or null.
     */
    from(data) {
        if (!(0, index_1.isNullOrUndefined)(data)) {
            const parsedValue = parseFloat(data);
            return isNaN(parsedValue) ? null : parsedValue;
        }
        return null;
    }
}
exports.ColumnNumericTransformerPipe = ColumnNumericTransformerPipe;
//# sourceMappingURL=column-numeric-transformer.pipe.js.map