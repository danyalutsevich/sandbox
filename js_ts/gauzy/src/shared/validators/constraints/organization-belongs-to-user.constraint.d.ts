import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { IOrganization } from '../../../../plugins/contracts/dist/index';
import { MikroOrmUserOrganizationRepository, TypeOrmUserOrganizationRepository } from "../../../user-organization/repository";
/**
 * Validator constraint for checking if a user belongs to the organization.
 */
export declare class OrganizationBelongsToUserConstraint implements ValidatorConstraintInterface {
    readonly typeOrmUserOrganizationRepository: TypeOrmUserOrganizationRepository;
    readonly mikroOrmUserOrganizationRepository: MikroOrmUserOrganizationRepository;
    constructor(typeOrmUserOrganizationRepository: TypeOrmUserOrganizationRepository, mikroOrmUserOrganizationRepository: MikroOrmUserOrganizationRepository);
    /**
     * Validates if the user belongs to the organization.
     *
     * @param value - The organization ID or organization object.
     * @returns {Promise<boolean>} - True if the user belongs to the organization, otherwise false.
     */
    validate(value: IOrganization['id'] | IOrganization): Promise<boolean>;
    /**
     * Checks if the given organization exists for the current user in the database.
     *
     * @param organizationId The ID of the organization.
     * @returns {Promise<boolean>} - True if found, false otherwise.
     */
    checkOrganizationExistence(organizationId: string): Promise<boolean>;
    /**
     * Gets the default error message when the validation fails.
     * @param validationArguments - Validation arguments containing the value.
     * @returns {string} - Default error message.
     */
    defaultMessage(validationArguments?: ValidationArguments): string;
}
