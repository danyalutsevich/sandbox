import { IOrganizationDepartment, IOrganizationEmploymentType, IOrganizationPosition, ISkill } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class EmploymentDTO extends TenantOrganizationBaseDTO {
    readonly startedWorkOn?: Date;
    readonly endWork?: Date;
    readonly short_description?: string;
    readonly description?: string;
    readonly anonymousBonus?: boolean;
    readonly organizationEmploymentTypes?: IOrganizationEmploymentType[];
    readonly organizationDepartments?: IOrganizationDepartment[];
    readonly employeeLevel?: string;
    readonly organizationPosition?: IOrganizationPosition;
    readonly skills?: ISkill[];
}
