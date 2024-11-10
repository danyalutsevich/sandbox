import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { IEditEntityByMemberInput, IEmployee, IOrganizationProject, IOrganizationProjectSetting, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { OrganizationProject } from './organization-project.entity';
import { OrganizationProjectService } from './organization-project.service';
import { CountQueryDTO, RelationsQueryDTO } from './../shared/dto';
import { TenantOrganizationBaseDTO } from './../core/dto';
import { CreateOrganizationProjectDTO, UpdateOrganizationProjectDTO, UpdateProjectSettingDTO, UpdateTaskModeDTO } from './dto';
export declare class OrganizationProjectController extends CrudController<OrganizationProject> {
    private readonly organizationProjectService;
    private readonly commandBus;
    constructor(organizationProjectService: OrganizationProjectService, commandBus: CommandBus);
    /**
     * GET organization project by employee
     *
     * @param employeeId
     * @param options
     * @returns
     */
    findByEmployee(employeeId: IEmployee['id'], options: TenantOrganizationBaseDTO): Promise<IOrganizationProject[]>;
    /**
     * UPDATE organization project by employee
     *
     * @param body
     * @returns
     */
    updateByEmployee(body: IEditEntityByMemberInput): Promise<boolean>;
    /**
     * UPDATE organization project task view mode
     *
     * @param id
     * @param body
     * @returns
     */
    updateTaskViewMode(id: IOrganizationProject['id'], entity: UpdateTaskModeDTO): Promise<IOrganizationProject>;
    /**
     * Update organization project settings by ID.
     *
     * @param id - The ID of the organization project to update settings for.
     * @param entity - An object containing the updated project settings.
     * @returns A promise that resolves to an `IOrganizationProject` object representing the updated project settings.
     */
    updateProjectSetting(id: IOrganizationProject['id'], entity: UpdateProjectSettingDTO): Promise<IOrganizationProjectSetting>;
    /**
     *
     * @param params
     * @returns
     */
    findSyncedProjects(params: PaginationParams<OrganizationProject>): Promise<IPagination<IOrganizationProject>>;
    /**
     * GET organization project count
     *
     * @param options
     * @returns
     */
    getCount(options: CountQueryDTO<OrganizationProject>): Promise<number>;
    /**
     * GET all organization project by Pagination
     *
     * @param filter
     * @returns
     */
    pagination(filter: PaginationParams<OrganizationProject>): Promise<IPagination<IOrganizationProject>>;
    /**
     * GET all organization project
     *
     * @param data
     * @returns
     */
    findAll(params: PaginationParams<OrganizationProject>): Promise<IPagination<IOrganizationProject>>;
    /**
     * Find project by primary ID
     *
     * @param id
     * @returns
     */
    findById(id: IOrganizationProject['id'], options: RelationsQueryDTO): Promise<IOrganizationProject>;
    /**
     * CREATE organization project
     *
     * @param entity
     * @returns
     */
    create(entity: CreateOrganizationProjectDTO): Promise<IOrganizationProject>;
    /**
     * UPDATE organization project by id
     *
     * @param id
     * @param body
     * @returns
     */
    update(id: IOrganizationProject['id'], entity: UpdateOrganizationProjectDTO): Promise<IOrganizationProject>;
    /**
     * Delete organization project
     *
     * @param id
     * @returns
     */
    delete(id: IOrganizationProject['id']): Promise<DeleteResult>;
}
