import { IEmployee, IManualTimeInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from "./../../../core/dto";
/**
 * Data transfer object for creating or updating ManualTimeLog entities.
 */
export declare class ManualTimeLogDTO extends TenantOrganizationBaseDTO implements IManualTimeInput {
    /**
     * The start date and time of the manual time log.
     */
    startedAt: Date;
    /**
     * The end date and time of the manual time log.
     */
    stoppedAt: Date;
    /**
     * The ID of the employee associated with the manual time log.
     */
    employeeId: IEmployee['id'];
}
