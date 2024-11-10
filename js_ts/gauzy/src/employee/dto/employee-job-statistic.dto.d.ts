import { UpdateEmployeeJobsStatistics } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
/**
 * Employee Job Statistic DTO
 */
export declare class EmployeeJobStatisticDTO extends TenantOrganizationBaseDTO implements UpdateEmployeeJobsStatistics {
    isJobSearchActive: boolean;
}
