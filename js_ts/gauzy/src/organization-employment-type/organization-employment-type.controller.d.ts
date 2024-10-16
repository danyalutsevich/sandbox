import { IOrganizationEmploymentType, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController } from './../core/crud';
import { OrganizationEmploymentType } from './organization-employment-type.entity';
import { OrganizationEmploymentTypeService } from './organization-employment-type.service';
export declare class OrganizationEmploymentTypeController extends CrudController<OrganizationEmploymentType> {
    private readonly organizationEmploymentTypeService;
    constructor(organizationEmploymentTypeService: OrganizationEmploymentTypeService);
    /**
     * GET all organization employment types
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IOrganizationEmploymentType>>;
    /**
     * UPDATE organization employment type by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: OrganizationEmploymentType): Promise<IOrganizationEmploymentType>;
}
