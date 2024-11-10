import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
import { IEmployee } from '../../../../plugins/contracts/dist/index';
import { MikroOrmEmployeeRepository, TypeOrmEmployeeRepository } from "../../../employee/repository";
/**
 * Validator constraint for employee belonging to organization validation.
 */
export declare class EmployeeBelongsToOrganizationConstraint implements ValidatorConstraintInterface {
    readonly typeOrmEmployeeRepository: TypeOrmEmployeeRepository;
    readonly mikroOrmEmployeeRepository: MikroOrmEmployeeRepository;
    constructor(typeOrmEmployeeRepository: TypeOrmEmployeeRepository, mikroOrmEmployeeRepository: MikroOrmEmployeeRepository);
    /**
     * Validates if the employee belongs to the organization.
     * @param value - The employee ID or employee object.
     * @param args - Validation arguments containing the object with organization details.
     * @returns {Promise<boolean>} - True if the employee belongs to the organization, otherwise false.
     */
    validate(value: IEmployee['id'] | IEmployee, args: ValidationArguments): Promise<boolean>;
    /**
     * Fetches an employee entity based on the employee ID, organization ID, and tenant ID.
     * It uses the appropriate ORM repository to perform the find operation.
     *
     * @param employeeId - The ID of the employee.
     * @param organizationId - The ID of the organization the employee belongs to.
     * @param tenantId - The tenant ID.
     * @returns A Promise that resolves to the employee entity if found, or undefined.
     */
    private findOneByOrFail;
    /**
     * Gets default message when validation for this constraint fail.
     */
    defaultMessage(validationArguments?: ValidationArguments): string;
}
