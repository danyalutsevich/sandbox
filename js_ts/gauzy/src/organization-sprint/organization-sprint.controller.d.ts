import { CommandBus } from '@nestjs/cqrs';
import { IOrganizationSprint, IOrganizationSprintUpdateInput, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { OrganizationSprint } from './organization-sprint.entity';
import { OrganizationSprintService } from './organization-sprint.service';
export declare class OrganizationSprintController extends CrudController<OrganizationSprint> {
    private readonly organizationSprintService;
    private readonly commandBus;
    constructor(organizationSprintService: OrganizationSprintService, commandBus: CommandBus);
    /**
     * GET all organization sprints
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IOrganizationSprint>>;
    /**
     * CREATE organization sprint
     *
     * @param entity
     * @param options
     * @returns
     */
    create(body: OrganizationSprint, ...options: any[]): Promise<IOrganizationSprint>;
    /**
     * UPDATE organization sprint by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, body: IOrganizationSprintUpdateInput): Promise<IOrganizationSprint>;
}
