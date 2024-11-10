import { IEmployee, IOrganizationContact, IOrganizationContactFindInput, IPagination } from '../../plugins/contracts/dist/index';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { OrganizationContact } from './organization-contact.entity';
import { MikroOrmOrganizationContactRepository, TypeOrmOrganizationContactRepository } from './repository';
export declare class OrganizationContactService extends TenantAwareCrudService<OrganizationContact> {
    readonly typeOrmOrganizationContactRepository: TypeOrmOrganizationContactRepository;
    readonly mikroOrmOrganizationContactRepository: MikroOrmOrganizationContactRepository;
    constructor(typeOrmOrganizationContactRepository: TypeOrmOrganizationContactRepository, mikroOrmOrganizationContactRepository: MikroOrmOrganizationContactRepository);
    /**
     * Find employee assigned contacts
     *
     * @param employeeId
     * @param options
     * @returns
     */
    findByEmployee(employeeId: IEmployee['id'], options: IOrganizationContactFindInput): Promise<IOrganizationContact[]>;
    findAllOrganizationContacts(data: any): Promise<IPagination<OrganizationContact>>;
    getOrganizationContactByEmployee(data: any): Promise<{
        items: OrganizationContact[];
        total: number;
    }>;
    findById(id: string, relations: string[]): Promise<IOrganizationContact>;
    /**
     * Organization contact by pagination
     *
     * @param params
     * @returns
     */
    pagination(params?: PaginationParams<any>): Promise<IPagination<IOrganizationContact>>;
}
