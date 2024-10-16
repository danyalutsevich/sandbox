import { IKeyResult } from '../../../plugins/contracts';
import { TenantOrganizationBaseDTO } from "core/dto";
export declare class KeyresultUpdateDTO extends TenantOrganizationBaseDTO {
    readonly owner: string;
    readonly progress: number;
    readonly update: number;
    readonly status: string;
    readonly keyResultId: string;
    readonly keyResult: IKeyResult;
}
