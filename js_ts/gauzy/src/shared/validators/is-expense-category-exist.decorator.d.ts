import { ValidationOptions } from "class-validator";
/**
 * Expense category existence validation decorator.
 *
 * @param validationOptions - Options for the validation decorator.
 * @returns {PropertyDecorator} - Decorator function.
 */
export declare const IsExpenseCategoryAlreadyExist: (validationOptions?: ValidationOptions) => PropertyDecorator;
