import { IEditEntityByMemberInput, IOrganizationDepartment, IOrganizationDepartmentCreateInput, IPagination } from '../../plugins/contracts/dist/index';
import { CommandBus } from '@nestjs/cqrs';
import { CrudController, PaginationParams } from './../core/crud';
import { OrganizationDepartment } from './organization-department.entity';
import { OrganizationDepartmentService } from './organization-department.service';
export declare class OrganizationDepartmentController extends CrudController<OrganizationDepartment> {
    private readonly organizationDepartmentService;
    private readonly commandBus;
    constructor(organizationDepartmentService: OrganizationDepartmentService, commandBus: CommandBus);
    /**
     * GET organization department by employee
     *
     * @param id
     * @returns
     */
    findByEmployee(id: string): Promise<IPagination<OrganizationDepartment>>;
    /**
     * UPDATE organization department by employee
     *
     * @param entity
     * @returns
     */
    updateByEmployee(entity: IEditEntityByMemberInput): Promise<any>;
    /**
     * GET all organization department
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IOrganizationDepartment>>;
    /**
     * Get pagination data of organization department
     *
     * @param id
     * @param entity
     * @returns
     */
    pagination(filter: PaginationParams<OrganizationDepartment>): Promise<IPagination<IOrganizationDepartment>>;
    /**
     * UPDATE organization department by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: IOrganizationDepartmentCreateInput): Promise<any>;
}
