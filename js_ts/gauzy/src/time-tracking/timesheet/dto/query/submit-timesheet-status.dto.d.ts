import { ISubmitTimesheetInput } from '../../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from "../../../../core/dto";
/**
 * Submit timesheets status request DTO validation
 */
export declare class SubmitTimesheetStatusDTO extends TenantOrganizationBaseDTO implements ISubmitTimesheetInput {
    readonly ids: string[];
    readonly status: 'submit' | 'unsubmit';
}
