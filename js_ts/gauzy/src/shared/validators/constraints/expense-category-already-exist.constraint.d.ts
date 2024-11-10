import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { MikroOrmExpenseCategoryRepository, TypeOrmExpenseCategoryRepository } from "../../../expense-categories/repository";
/**
 * Expense category already existed validation constraint
 *
 * @param validationOptions
 * @returns
 */
export declare class ExpenseCategoryAlreadyExistConstraint implements ValidatorConstraintInterface {
    readonly typeOrmExpenseCategoryRepository: TypeOrmExpenseCategoryRepository;
    readonly mikroOrmExpenseCategoryRepository: MikroOrmExpenseCategoryRepository;
    constructor(typeOrmExpenseCategoryRepository: TypeOrmExpenseCategoryRepository, mikroOrmExpenseCategoryRepository: MikroOrmExpenseCategoryRepository);
    /**
     * Validates if a given name for an expense category is unique within the specified organization.
     *
     * @param name - The name of the expense category to validate.
     * @param args - Validation arguments containing additional contextual information.
     * @returns True if the name is unique (or in the case of an update, not matching any other than itself), otherwise false.
     */
    validate(name: string, args: ValidationArguments): Promise<boolean>;
    /**
     * Gets default message when validation for this constraint fail.
     */
    defaultMessage(validationArguments?: ValidationArguments): string;
}
