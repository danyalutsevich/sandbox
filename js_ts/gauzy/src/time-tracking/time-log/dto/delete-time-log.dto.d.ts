import { IDeleteTimeLog } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from "./../../../core/dto";
export declare class DeleteTimeLogDTO extends TenantOrganizationBaseDTO implements IDeleteTimeLog {
    logIds: string[];
    forceDelete: boolean;
}
