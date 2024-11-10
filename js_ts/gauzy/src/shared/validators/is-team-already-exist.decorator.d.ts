import { ValidationOptions } from "class-validator";
/**
 * Custom validation decorator factory for checking if a team already exists.
 *
 * @param validationOptions - Validation options.
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const IsTeamAlreadyExist: (validationOptions?: ValidationOptions) => PropertyDecorator;
