"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOrganizationBelongsToUser = void 0;
const class_validator_1 = require("class-validator");
const constraints_1 = require("./constraints");
/**
 * Organization should belongs to user validation decorator
 *
 * @param validationOptions
 * @returns {PropertyDecorator} - Decorator function.
 */
const IsOrganizationBelongsToUser = (validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: constraints_1.OrganizationBelongsToUserConstraint,
        });
    };
};
exports.IsOrganizationBelongsToUser = IsOrganizationBelongsToUser;
//# sourceMappingURL=is-organization-belongs-to-user.decorator.js.map