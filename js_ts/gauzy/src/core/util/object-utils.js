"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectUtils = void 0;
class ObjectUtils {
    /**
     * Checks if given value is an object.
     * We cannot use instanceof because it has problems when running on different contexts.
     * And we don't simply use typeof because typeof null === "object".
     */
    static isObject(val) {
        return val !== null && typeof val === "object";
    }
}
exports.ObjectUtils = ObjectUtils;
//# sourceMappingURL=object-utils.js.map