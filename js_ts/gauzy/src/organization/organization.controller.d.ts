import { IOrganization, IPagination } from '../../plugins/contracts/dist/index';
import { CommandBus } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { CrudController } from './../core/crud';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDTO, OrganizationFindOptionsDTO, UpdateOrganizationDTO } from './dto';
export declare class OrganizationController extends CrudController<Organization> {
    private readonly organizationService;
    private readonly commandBus;
    constructor(organizationService: OrganizationService, commandBus: CommandBus);
    /**
     * GET organization count
     *
     * @param options
     * @returns
     */
    getCount(options: FindOptionsWhere<Organization>): Promise<number>;
    /**
     * GET organization pagination
     *
     * @param options
     * @returns
     */
    pagination(options: OrganizationFindOptionsDTO<Organization>): Promise<IPagination<IOrganization>>;
    /**
     * GET organizations by find many conditions
     *
     * @param options
     * @returns
     */
    findAll(options: OrganizationFindOptionsDTO<Organization>): Promise<IPagination<IOrganization>>;
    /**
     * GET organization by id
     *
     * @param id
     * @param options
     * @returns
     */
    findById(id: IOrganization['id'], options: OrganizationFindOptionsDTO<Organization>): Promise<IOrganization>;
    /**
     * CREATE organization for specific tenant
     *
     * @param entity
     * @returns
     */
    create(entity: CreateOrganizationDTO): Promise<IOrganization>;
    /**
     * UPDATE organization by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: IOrganization['id'], entity: UpdateOrganizationDTO): Promise<IOrganization>;
}
