import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { MikroOrmOrganizationTeamRepository, TypeOrmOrganizationTeamRepository } from "../../../organization-team/repository";
export declare class TeamAlreadyExistConstraint implements ValidatorConstraintInterface {
    readonly typeOrmOrganizationTeamRepository: TypeOrmOrganizationTeamRepository;
    readonly mikroOrmOrganizationTeamRepository: MikroOrmOrganizationTeamRepository;
    constructor(typeOrmOrganizationTeamRepository: TypeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository: MikroOrmOrganizationTeamRepository);
    /**
     * Validates if a given name is not already in use in the specified organization.
     *
     * @param name - The name to validate.
     * @param args - Validation arguments, expected to contain organization ID and tenant ID.
     * @returns True if the name is not in use or if there's no organization ID, false otherwise.
     */
    validate(name: any, args: ValidationArguments): Promise<boolean>;
    /**
     * Gets default message when validation for this constraint fail.
     */
    defaultMessage(validationArguments?: ValidationArguments): string;
}
