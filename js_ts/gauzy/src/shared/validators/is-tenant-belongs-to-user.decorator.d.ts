import { ValidationOptions } from "class-validator";
/**
 * Tenant should belongs to user validation decorator
 *
 * @param validationOptions
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const IsTenantBelongsToUser: (validationOptions?: ValidationOptions) => PropertyDecorator;
