"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTenantBelongsToUser = void 0;
const class_validator_1 = require("class-validator");
const constraints_1 = require("./constraints");
/**
 * Tenant should belongs to user validation decorator
 *
 * @param validationOptions
 * @returns {PropertyDecorator} - Decorator function.
 */
const IsTenantBelongsToUser = (validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: constraints_1.TenantBelongsToUserConstraint,
        });
    };
};
exports.IsTenantBelongsToUser = IsTenantBelongsToUser;
//# sourceMappingURL=is-tenant-belongs-to-user.decorator.js.map