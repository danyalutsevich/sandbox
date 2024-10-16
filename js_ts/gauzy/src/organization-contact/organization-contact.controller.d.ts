import { CommandBus } from '@nestjs/cqrs';
import { IEditEntityByMemberInput, IEmployee, IOrganizationContact, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { TenantOrganizationBaseDTO } from './../core/dto';
import { OrganizationContact } from './organization-contact.entity';
import { OrganizationContactService } from './organization-contact.service';
import { CountQueryDTO } from './../shared/dto';
import { CreateOrganizationContactDTO, UpdateOrganizationContactDTO } from './dto';
export declare class OrganizationContactController extends CrudController<OrganizationContact> {
    private readonly organizationContactService;
    private readonly commandBus;
    constructor(organizationContactService: OrganizationContactService, commandBus: CommandBus);
    /**
     * GET organization contact count
     *
     * @param options
     * @returns
     */
    getCount(options: CountQueryDTO<OrganizationContact>): Promise<number>;
    /**
     * GET all organization contact by Pagination
     *
     * @param filter
     * @returns
     */
    pagination(filter: PaginationParams<OrganizationContact>): Promise<IPagination<IOrganizationContact>>;
    /**
     * GET all organization contacts by Employee
     *
     * @param id
     * @param data
     * @returns
     */
    findByEmployee(employeeId: IEmployee['id'], options: TenantOrganizationBaseDTO): Promise<IOrganizationContact[]>;
    /**
     * UPDATE organization contact by Employee
     *
     * @param entity
     * @returns
     */
    updateByEmployee(entity: IEditEntityByMemberInput): Promise<any>;
    /**
     * GET all organization contacts
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IOrganizationContact>>;
    /**
     * GET organization contacts by id
     *
     * @param id
     * @param data
     * @returns
     */
    findById(id: string, data: any): Promise<IOrganizationContact>;
    /**
     * CREATE organization contact
     *
     * @param entity
     * @returns
     */
    create(entity: CreateOrganizationContactDTO): Promise<IOrganizationContact>;
    /**
     * Update organization contact by ID
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: IOrganizationContact['id'], entity: UpdateOrganizationContactDTO): Promise<IOrganizationContact>;
}
