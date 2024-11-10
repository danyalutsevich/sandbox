import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { LanguagesEnum, IPagination, IEmployee } from '../../plugins/contracts/dist/index';
import { CrudController, OptionParams, PaginationParams } from './../core/crud';
import { CountQueryDTO } from './../shared/dto';
import { Employee } from './employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeBulkInputDTO, CreateEmployeeDTO, UpdateEmployeeDTO, UpdateProfileDTO } from './dto';
import { TenantOrganizationBaseDTO } from './../core/dto';
export declare class EmployeeController extends CrudController<Employee> {
    private readonly _employeeService;
    private readonly _commandBus;
    constructor(_employeeService: EmployeeService, _commandBus: CommandBus);
    /**
     * Retrieve all working employees based on specified query data.
     *
     * This endpoint fetches all working employees using a command pattern. The query parameter 'data'
     * is parsed using a custom `ParseJsonPipe`, allowing clients to provide structured input.
     *
     * @param data - The JSON-formatted query data, parsed by `ParseJsonPipe`.
     * @returns A promise resolving to a paginated list of working employees.
     */
    findAllWorkingEmployees(data: any): Promise<IPagination<IEmployee>>;
    /**
     * Retrieve the count of all working employees.
     *
     * This endpoint returns the total count of working employees, based on the given query data.
     * The 'data' parameter is parsed with `ParseJsonPipe` to ensure correct structure.
     *
     * @param data - The JSON-formatted query data parsed by `ParseJsonPipe`.
     * @returns A promise resolving to an object with the total count of working employees.
     * @throws NotFoundException if no data is provided or if the count operation fails.
     */
    findAllWorkingEmployeesCount(data: any): Promise<{
        total: number;
    }>;
    /**
     * CREATE bulk employees in the same tenant.
     *
     * This endpoint allows for the bulk creation of employees within the same tenant.
     * It accepts an array of employee data and processes it in a single request.
     *
     * @param entity The DTO containing the list of employees to create.
     * @param themeLanguage The theme language for additional context.
     * @param languageCode The language code for localization.
     * @param origin The origin of the request for reference.
     * @returns A promise resolving to an array of the created employees.
     */
    createBulk(entity: EmployeeBulkInputDTO, themeLanguage: LanguagesEnum, languageCode: LanguagesEnum, origin: string): Promise<IEmployee[]>;
    /**
     * GET employee count in the same tenant.
     *
     * This endpoint retrieves the count of employees within a specific tenant.
     * It takes query parameters to filter the employee count by certain criteria.
     *
     * @param options Query parameters to filter the employee count.
     * @returns A promise resolving to the total count of employees in the tenant.
     */
    getCount(options: CountQueryDTO<Employee>): Promise<number>;
    /**
     * GET employees by pagination in the same tenant.
     *
     * This endpoint retrieves employees by pagination within a specific tenant.
     * It uses query parameters to manage pagination and filtering options.
     *
     * @param params Pagination and filtering parameters.
     * @returns A promise resolving to a paginated list of employees.
     */
    pagination(params: PaginationParams<Employee>): Promise<IPagination<IEmployee>>;
    /**
     * GET all employees in the same tenant.
     *
     * This endpoint retrieves all employees within a specific tenant with pagination and filtering options.
     * It applies additional constraints to ensure only active, non-archived employees are retrieved.
     *
     * @param options Pagination and filtering parameters.
     * @returns A promise resolving to a paginated list of employees.
     */
    findAll(options: PaginationParams<Employee>): Promise<IPagination<IEmployee>>;
    /**
     * GET employee by ID within the same tenant.
     *
     * This endpoint retrieves an employee by their ID, allowing additional filtering based on permissions.
     *
     * @param id The unique identifier of the employee to find.
     * @param params Additional query parameters to customize the search, like related entities.
     * @returns A promise resolving to the employee record if found.
     */
    findById(id: IEmployee['id'], params: OptionParams<Employee>): Promise<IEmployee>;
    /**
     * CREATE a new employee in the same tenant.
     *
     * This endpoint creates a new employee, handling necessary validations and internationalization.
     *
     * @param entity The details of the new employee to be created.
     * @param origin The origin header, used to determine the request source.
     * @param languageCode The language code for localization and internationalization.
     * @returns A promise resolving to the newly created employee record.
     */
    create(entity: CreateEmployeeDTO, origin: string, languageCode: LanguagesEnum): Promise<IEmployee>;
    /**
     * UPDATE an existing employee by ID in the same tenant.
     *
     * This endpoint updates an existing employee record based on the provided ID and update data.
     *
     * @param id The unique identifier of the employee to update.
     * @param entity The data to update for the employee.
     * @returns A promise resolving to the updated employee record.
     */
    update(id: IEmployee['id'], entity: UpdateEmployeeDTO): Promise<IEmployee>;
    /**
     * Update employee's own profile by themselves
     *
     * This endpoint allows an employee to update their own profile.
     *
     * @param id The unique identifier of the employee.
     * @param entity The data to update for the employee's profile.
     * @returns A promise resolving to the updated employee record.
     */
    updateProfile(id: string, entity: UpdateProfileDTO): Promise<IEmployee>;
    /**
     * Soft delete employee from organization
     *
     * @param employeeId
     * @returns
     */
    delete(employeeId: IEmployee['id'], options: TenantOrganizationBaseDTO): Promise<DeleteResult>;
    /**
     * Soft deletes an employee from the organization by ID.
     *
     * This endpoint allows soft-deletion of an employee record by providing its UUID.
     *
     * @param employeeId - The UUID of the employee to be soft-deleted.
     * @param params - Parameters required for tenant/organization identification.
     * @returns A promise resolving to the soft-deleted employee entity.
     */
    softRemove(employeeId: IEmployee['id'], params: TenantOrganizationBaseDTO): Promise<Employee>;
    /**
     * Restores a soft-deleted employee by ID.
     *
     * This endpoint allows the restoration of a soft-deleted employee record by providing its UUID.
     *
     * @param employeeId - The UUID of the employee to be restored.
     * @param params - Parameters for tenant/organization identification.
     * @returns A promise resolving to the restored employee entity.
     */
    softRecover(employeeId: IEmployee['id'], params: TenantOrganizationBaseDTO): Promise<Employee>;
}
