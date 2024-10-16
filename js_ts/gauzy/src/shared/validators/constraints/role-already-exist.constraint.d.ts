import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { MikroOrmRoleRepository, TypeOrmRoleRepository } from "../../../role/repository";
/**
 * Role already existed validation constraint
 *
 * @param validationOptions
 * @returns
 */
export declare class RoleAlreadyExistConstraint implements ValidatorConstraintInterface {
    readonly typeOrmRoleRepository: TypeOrmRoleRepository;
    readonly mikroOrmRoleRepository: MikroOrmRoleRepository;
    constructor(typeOrmRoleRepository: TypeOrmRoleRepository, mikroOrmRoleRepository: MikroOrmRoleRepository);
    /**
     * Validates if a role with the given name does not exist for the current tenant.
     *
     * @param name - The name of the role to validate.
     * @returns True if the role does not exist (passes validation), false otherwise.
     */
    validate(name: string): Promise<boolean>;
    /**
     * Gets default message when validation for this constraint fail.
     */
    defaultMessage(validationArguments?: ValidationArguments): string;
}
