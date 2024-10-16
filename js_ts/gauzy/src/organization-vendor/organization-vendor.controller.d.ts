import { IOrganizationVendor, IPagination } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { OrganizationVendorService } from './organization-vendor.service';
import { OrganizationVendor } from './organization-vendor.entity';
export declare class OrganizationVendorController extends CrudController<OrganizationVendor> {
    private readonly organizationVendorService;
    constructor(organizationVendorService: OrganizationVendorService);
    /**
     * GET all organization vendors recurring expense
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IOrganizationVendor>>;
    pagination(filter: PaginationParams<OrganizationVendor>): Promise<IPagination<IOrganizationVendor>>;
    /**
     * UPDATE organization vendor by id
     *
     * @param id
     * @param body
     * @returns
     */
    update(id: string, body: OrganizationVendor): Promise<IOrganizationVendor>;
    /**
     * DELETE organization vendor by id
     *
     * @param id
     * @returns
     */
    delete(id: string): Promise<any>;
}
