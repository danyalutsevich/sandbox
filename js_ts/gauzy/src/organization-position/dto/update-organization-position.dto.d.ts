import { IOrganizationPosition } from '../../../plugins/contracts';
import { RelationalTagDTO } from "./../../tags/dto";
import { OrganizationPositionDTO } from "./organization-position.dto";
declare const UpdateOrganizationPositionDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & OrganizationPositionDTO>;
/**
 * Organization Position Update DTO
 *
 */
export declare class UpdateOrganizationPositionDTO extends UpdateOrganizationPositionDTO_base implements IOrganizationPosition {
    readonly name: string;
}
export {};
