import { IUpdateTimesheetStatusInput, TimesheetStatus } from '../../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from "./../../../../core/dto";
/**
 * Update timesheets status request DTO validation
 */
export declare class UpdateTimesheetStatusDTO extends TenantOrganizationBaseDTO implements IUpdateTimesheetStatusInput {
    readonly ids: string[];
    readonly status: TimesheetStatus;
}
