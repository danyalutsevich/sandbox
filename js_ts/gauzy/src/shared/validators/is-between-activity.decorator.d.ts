import { ClassConstructor } from "class-transformer";
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from "class-validator";
/**
 * IsBetweenActivity custom decorator.
 *
 * @param validationOptions - Validation options.
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const IsBetweenActivty: <T>(type: ClassConstructor<T>, property: (o: T) => any, validationOptions?: ValidationOptions) => PropertyDecorator;
/**
 * Is between activity check validation constraint
 *
 * @param validationOptions
 * @returns
 */
export declare class BetweenActivtyConstraint implements ValidatorConstraintInterface {
    /**
     * Validate if the start and end values in the activityLevel object are between 0 and 100 (inclusive).
     *
     * @param activityLevel - The object containing start and end properties to be validated.
     * @param args - Validation arguments.
     * @returns {boolean} - Returns `true` if both start and end values are between 0 and 100 (inclusive); otherwise, `false`.
     */
    validate(activityLevel: {
        start: number;
        end: number;
    }, args: ValidationArguments): boolean;
    /**
     * Get the default error message for the IsBetweenActivty constraint.
     *
     * @param args - Validation arguments.
     * @returns {string} - The default error message.
     */
    defaultMessage(args: ValidationArguments): string;
}
