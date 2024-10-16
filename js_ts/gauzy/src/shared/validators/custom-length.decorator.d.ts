import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare function length(text: string, length: number): boolean;
/**
 * Custom length validation decorator.
 *
 * @param length - The expected length of the property.
 * @param validationOptions - Options for the validation decorator.
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const CustomLength: (length?: number, validationOptions?: ValidationOptions) => PropertyDecorator;
/**
 * Validator constraint for custom length validation.
 */
export declare class CustomLengthConstraint implements ValidatorConstraintInterface {
    /**
     * Validates the length of the provided value.
     * @param value - The value to be validated.
     * @param args - Validation arguments containing constraints.
     * @returns {boolean} - True if the length is within the specified constraints, otherwise false.
     */
    validate(value: string, args: ValidationArguments): boolean;
    /**
     * Returns the default error message for the custom length validation.
     * @param validationArguments - Validation arguments containing the value.
     * @returns {string} - Default error message.
     */
    defaultMessage(validationArguments: ValidationArguments): string;
}
