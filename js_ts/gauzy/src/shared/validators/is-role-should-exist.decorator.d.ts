import { ValidationOptions } from "class-validator";
/**
 * Custom validation decorator factory for checking if a role should exist.
 *
 * @param validationOptions - Validation options.
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const IsRoleShouldExist: (validationOptions?: ValidationOptions) => PropertyDecorator;
