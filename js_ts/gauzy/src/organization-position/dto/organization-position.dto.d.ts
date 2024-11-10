import { IOrganizationPosition } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class OrganizationPositionDTO extends TenantOrganizationBaseDTO implements IOrganizationPosition {
    readonly name: string;
}
