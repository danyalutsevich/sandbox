import { ValidationOptions } from "class-validator";
/**
 * Decorator Factory: Checks if a role already exists.
 *
 * @param validationOptions - Validation options for the decorator.
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const IsRoleAlreadyExist: (validationOptions?: ValidationOptions) => PropertyDecorator;
