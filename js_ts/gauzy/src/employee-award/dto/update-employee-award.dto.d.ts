import { IEmployeeAwardUpdateInput } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
/**
 * Update employee award DTO validation
 */
export declare class UpdateEmployeeAwardDTO extends TenantOrganizationBaseDTO implements IEmployeeAwardUpdateInput {
    readonly name: string;
    readonly year: string;
}
