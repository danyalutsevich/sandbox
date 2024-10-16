import { Repository } from 'typeorm';
import { OrganizationDepartment } from '../organization-department.entity';
export declare class TypeOrmOrganizationDepartmentRepository extends Repository<OrganizationDepartment> {
    readonly repository: Repository<OrganizationDepartment>;
    constructor(repository: Repository<OrganizationDepartment>);
}
