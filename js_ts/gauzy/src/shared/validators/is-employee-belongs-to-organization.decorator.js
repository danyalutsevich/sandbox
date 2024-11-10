"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEmployeeBelongsToOrganization = void 0;
const class_validator_1 = require("class-validator");
const constraints_1 = require("./constraints");
/**
 * Decorator to validate if an employee belongs to the organization for a specific tenant.
 *
 * @param validationOptions - Options for validation.
 * @returns {PropertyDecorator} - Decorator function.
 */
const IsEmployeeBelongsToOrganization = (validationOptions) => {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: constraints_1.EmployeeBelongsToOrganizationConstraint,
        });
    };
};
exports.IsEmployeeBelongsToOrganization = IsEmployeeBelongsToOrganization;
//# sourceMappingURL=is-employee-belongs-to-organization.decorator.js.map