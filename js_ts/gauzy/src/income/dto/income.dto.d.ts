import { TenantOrganizationBaseDTO } from "./../../core/dto";
export declare class IncomeDTO extends TenantOrganizationBaseDTO {
    readonly clientId: string;
    readonly amount: number;
    readonly valueDate: Date;
    readonly notes: string;
    readonly isBonus: boolean;
    readonly reference: string;
}
