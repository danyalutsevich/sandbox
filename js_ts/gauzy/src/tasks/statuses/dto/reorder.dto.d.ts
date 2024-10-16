import { IReorderDTO, IReorderRequestDTO } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
/**
 * DTO for individual reorder request item.
 */
export declare class ReorderDTO implements IReorderDTO {
    readonly id: string;
    readonly order: number;
}
/**
 * DTO for the entire reorder request containing multiple items.
 */
export declare class ReorderRequestDTO extends TenantOrganizationBaseDTO implements IReorderRequestDTO {
    reorder: ReorderDTO[];
}
