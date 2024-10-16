import { TenantOrganizationBaseDTO } from "core/dto";
export declare abstract class InvoiceItemDTO extends TenantOrganizationBaseDTO {
    readonly description: string;
    readonly price: number;
    readonly quantity: number;
    readonly totalValue: number;
    readonly invoiceId: string;
    readonly taskId: string;
    readonly employeeId: string;
    readonly projectId: string;
    readonly productId: string;
    readonly expenseId: string;
    readonly applyTax: boolean;
    readonly applyDiscount: boolean;
}
