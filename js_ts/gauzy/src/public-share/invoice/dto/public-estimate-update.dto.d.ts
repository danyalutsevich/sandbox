import { EstimateStatusTypesEnum, IInvoiceUpdateInput } from '../../../../plugins/contracts/dist/index';
export declare class PublicEstimateUpdateDTO implements IInvoiceUpdateInput {
    readonly isEstimate: boolean;
    readonly status: EstimateStatusTypesEnum;
}
