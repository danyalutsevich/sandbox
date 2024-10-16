import { Repository } from 'typeorm';
import { OrganizationVendor } from '../organization-vendor.entity';
export declare class TypeOrmOrganizationVendorRepository extends Repository<OrganizationVendor> {
    readonly repository: Repository<OrganizationVendor>;
    constructor(repository: Repository<OrganizationVendor>);
}
