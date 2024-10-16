"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRoleShouldExist = void 0;
const class_validator_1 = require("class-validator");
const constraints_1 = require("./constraints");
/**
 * Custom validation decorator factory for checking if a role should exist.
 *
 * @param validationOptions - Validation options.
 * @returns {PropertyDecorator} - Decorator function.
 */
const IsRoleShouldExist = (validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: constraints_1.RoleShouldExistConstraint,
        });
    };
};
exports.IsRoleShouldExist = IsRoleShouldExist;
//# sourceMappingURL=is-role-should-exist.decorator.js.map