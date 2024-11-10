import { IGetPaymentInput } from '../../../../plugins/contracts/dist/index';
import { RelationsQueryDTO, SelectorsQueryDTO } from './../../../shared/dto';
declare const PaymentReportQueryDTO_base: import("@nestjs/common").Type<RelationsQueryDTO & SelectorsQueryDTO & Pick<unknown, never>>;
/**
 * Get payment report request DTO validation
 */
export declare class PaymentReportQueryDTO extends PaymentReportQueryDTO_base implements IGetPaymentInput {
}
export {};
