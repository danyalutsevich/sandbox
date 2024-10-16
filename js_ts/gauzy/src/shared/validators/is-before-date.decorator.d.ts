import { ClassConstructor } from 'class-transformer';
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
/**
 *
 * @param type
 * @param property
 * @param validationOptions
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const IsBeforeDate: <T>(type: ClassConstructor<T>, property: (o: T) => any, validationOptions?: ValidationOptions) => PropertyDecorator;
/**
 * Is before date check validation constraint
 *
 * @param validationOptions
 * @returns
 */
export declare class BeforeDateConstraint implements ValidatorConstraintInterface {
    /**
     * Validate if the start date is before the end date.
     *
     * @param value - The date to be validated.
     * @param args - Validation arguments, including constraints.
     * @returns {boolean} - Returns `true` if the start date is before the end date; otherwise, `false`.
     */
    validate(value: Date, args: ValidationArguments): boolean;
    /**
     * Get the default error message for the IsBeforeDate constraint.
     *
     * @param args - Validation arguments.
     * @returns {string} - The default error message.
     */
    defaultMessage(args: ValidationArguments): string;
}
