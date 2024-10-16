import { OrganizationDepartment } from './organization-department.entity';
import { TenantAwareCrudService } from './../core/crud';
import { TypeOrmOrganizationDepartmentRepository } from './repository/type-orm-organization-department.repository';
import { MikroOrmOrganizationDepartmentRepository } from './repository/mikro-orm-organization-department.repository';
export declare class OrganizationDepartmentService extends TenantAwareCrudService<OrganizationDepartment> {
    constructor(typeOrmOrganizationDepartmentRepository: TypeOrmOrganizationDepartmentRepository, mikroOrmOrganizationDepartmentRepository: MikroOrmOrganizationDepartmentRepository);
    /**
     *
     * @param id
     * @returns
     */
    findByEmployee(id: string): Promise<any>;
    /**
     *
     * @param filter
     * @returns
     */
    pagination(filter?: any): Promise<import("../../plugins/contracts/dist").IPagination<OrganizationDepartment>>;
}
