import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { ITenant } from '../../../../plugins/contracts/dist/index';
/**
 * Validates whether the specified tenant belongs to the current user.
 *
 */
export declare class TenantBelongsToUserConstraint implements ValidatorConstraintInterface {
    /**
     * Validates whether the specified tenant belongs to the current user.
     *
     * @param value - The tenant ID or tenant object to be validated.
     * @returns A boolean indicating whether the specified tenant belongs to the current user.
     */
    validate(value: ITenant['id'] | ITenant): Promise<boolean>;
    /**
     * Gets the default message when validation for the "IsTenantBelongsToUser" constraint fails.
     *
     * @param validationArguments - Validation arguments.
     * @returns The default error message.
     */
    defaultMessage(validationArguments?: ValidationArguments): string;
}
