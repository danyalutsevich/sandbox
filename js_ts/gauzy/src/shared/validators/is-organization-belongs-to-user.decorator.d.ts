import { ValidationOptions } from "class-validator";
/**
 * Organization should belongs to user validation decorator
 *
 * @param validationOptions
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const IsOrganizationBelongsToUser: (validationOptions?: ValidationOptions) => PropertyDecorator;
