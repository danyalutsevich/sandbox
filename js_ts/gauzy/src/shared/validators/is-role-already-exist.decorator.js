"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRoleAlreadyExist = void 0;
const class_validator_1 = require("class-validator");
const constraints_1 = require("./constraints");
/**
 * Decorator Factory: Checks if a role already exists.
 *
 * @param validationOptions - Validation options for the decorator.
 * @returns {PropertyDecorator} - Decorator function.
 */
const IsRoleAlreadyExist = (validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: constraints_1.RoleAlreadyExistConstraint,
        });
    };
};
exports.IsRoleAlreadyExist = IsRoleAlreadyExist;
//# sourceMappingURL=is-role-already-exist.decorator.js.map