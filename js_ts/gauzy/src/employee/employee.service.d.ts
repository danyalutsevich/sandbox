import { FindOneOptions, SelectQueryBuilder } from 'typeorm';
import { IBasePerTenantAndOrganizationEntityModel, IDateRangePicker, IEmployee, IOrganization, IPagination } from '../../plugins/contracts/dist/index';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { Employee } from './employee.entity';
import { MikroOrmEmployeeRepository, TypeOrmEmployeeRepository } from './repository';
export declare class EmployeeService extends TenantAwareCrudService<Employee> {
    readonly typeOrmEmployeeRepository: TypeOrmEmployeeRepository;
    readonly mikroOrmEmployeeRepository: MikroOrmEmployeeRepository;
    constructor(typeOrmEmployeeRepository: TypeOrmEmployeeRepository, mikroOrmEmployeeRepository: MikroOrmEmployeeRepository);
    /**
     * Finds employees based on an array of user IDs.
     * @param userIds An array of user IDs.
     * @returns A promise resolving to an array of employees.
     */
    findEmployeesByUserIds(userIds: string[]): Promise<Employee[]>;
    /**
     * Finds the employeeId associated with a given userId.
     *
     * @param userId The ID of the user.
     * @returns The employeeId or null if not found or in case of an error.
     */
    findEmployeeIdByUserId(userId: string): Promise<string | null>;
    /**
     * Finds an employee by user ID.
     *
     * @param userId The ID of the user to find.
     * @returns A Promise resolving to the employee if found, otherwise null.
     */
    findOneByUserId(userId: string, options?: FindOneOptions<Employee>): Promise<IEmployee | null>;
    /**
     * Retrieves all active employees with their associated user and organization details.
     * @returns A Promise that resolves to an array of active employees.
     */
    findAllActive(): Promise<Employee[]>;
    /**
     * Find the employees working in the organization for a particular date range.
     * An employee is considered to be 'working' if:
     * 1. The startedWorkOn date is (not null and) less than the last day forMonth
     * 2. The endWork date is either null or greater than the first day forMonth
     * @param organizationId
     * @param forRange
     * @param withUser
     * @returns
     */
    findWorkingEmployees(organizationId: IOrganization['id'], forRange: IDateRangePicker | any, withUser?: boolean): Promise<IPagination<IEmployee>>;
    /**
     * Find the counts of employees working in the organization for a particular date range.
     * An employee is considered to be 'working' if:
     * 1. The startedWorkOn date is (not null and) less than the last day forMonth
     * 2. The endWork date is either null or greater than the first day forMonth
     * @param organizationId
     * @param forRange
     * @returns
     */
    findWorkingEmployeesCount(organizationId: string, forRange: IDateRangePicker | any): Promise<{
        total: number;
    }>;
    /**
     * Adds a filter to the TypeORM SelectQueryBuilder for the Employee entity based on specified conditions.
     *
     * @param qb - The TypeORM SelectQueryBuilder for the Employee entity.
     * @param organizationId - The organization ID to filter by.
     * @param forRange - An object representing a date range (IDateRangePicker) or any other type.
     */
    getFilterQuery(qb: SelectQueryBuilder<Employee>, organizationId: string, forRange: IDateRangePicker | any): void;
    /**
     * Get all employees using pagination
     *
     * @param options Pagination options
     * @returns Promise containing paginated employees and total count
     */
    pagination(options: PaginationParams<any>): Promise<IPagination<IEmployee>>;
    /**
     * Softly delete an employee by ID, with organization and tenant constraints.
     *
     * @param employeeId - ID of the employee to delete.
     * @param options - Contains organizationId and possibly other per-tenant information.
     * @returns - UpdateResult or DeleteResult depending on the ORM type.
     */
    softRemovedById(employeeId: IEmployee['id'], options: IBasePerTenantAndOrganizationEntityModel): Promise<Employee>;
    /**
     * Restores a soft-deleted employee by ID.
     *
     * This method restores an employee who was previously soft-deleted. It uses the organization ID
     * and tenant ID to ensure that the correct employee is restored.
     *
     * @param employeeId The ID of the employee to restore.
     * @param options Additional context parameters, including organization ID and tenant ID.
     * @returns The restored Employee entity.
     * @throws BadRequestException if the employee cannot be restored or if an error occurs.
     */
    softRecoverById(employeeId: IEmployee['id'], options: IBasePerTenantAndOrganizationEntityModel): Promise<Employee>;
}
