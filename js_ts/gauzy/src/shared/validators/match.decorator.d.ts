import { ClassConstructor } from 'class-transformer';
import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
/**
 * Match two fields value decorator
 *
 * @param type
 * @param property
 * @param validationOptions
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const Match: <T>(type: ClassConstructor<T>, property: (o: T) => any, validationOptions?: ValidationOptions) => PropertyDecorator;
/**
 * Match two fields value constraint.
 */
export declare class MatchConstraint implements ValidatorConstraintInterface {
    /**
     * Validate if the value matches another field's value.
     *
     * @param value - The value to validate.
     * @param args - Validation arguments.
     * @returns {boolean} - Indicates whether the validation passed.
     */
    validate(value: any, args: ValidationArguments): boolean;
    /**
     * Gets the default validation error message.
     *
     * @param args - Validation arguments.
     * @returns {string} - The default error message.
     */
    defaultMessage(args: ValidationArguments): string;
}
