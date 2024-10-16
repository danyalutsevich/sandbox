import { OrganizationVendor } from './organization-vendor.entity';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmOrganizationVendorRepository } from './repository/type-orm-organization-vendor.repository';
import { MikroOrmOrganizationVendorRepository } from './repository/mikro-orm-organization-vendor.repository';
export declare class OrganizationVendorService extends TenantAwareCrudService<OrganizationVendor> {
    constructor(typeOrmOrganizationVendorRepository: TypeOrmOrganizationVendorRepository, mikroOrmOrganizationVendorRepository: MikroOrmOrganizationVendorRepository);
    deleteVendor(vendorId: any): Promise<import("typeorm").DeleteResult>;
    pagination(filter?: any): Promise<import("../../plugins/contracts/dist").IPagination<OrganizationVendor>>;
}
