import { ValidationOptions } from "class-validator";
/**
 * Decorator to validate if an employee belongs to the organization for a specific tenant.
 *
 * @param validationOptions - Options for validation.
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const IsEmployeeBelongsToOrganization: (validationOptions?: ValidationOptions) => PropertyDecorator;
