import { IDeleteTimeSlot } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from "./../../../core/dto";
export declare class DeleteTimeSlotDTO extends TenantOrganizationBaseDTO implements IDeleteTimeSlot {
    readonly ids: string[];
}
