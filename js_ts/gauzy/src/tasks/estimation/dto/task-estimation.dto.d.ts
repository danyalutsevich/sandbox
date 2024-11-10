import { TenantOrganizationBaseDTO } from '../../../core/dto';
export declare class TaskEstimationDTO extends TenantOrganizationBaseDTO {
    estimate: number;
    employeeId: string;
    taskId: string;
}
