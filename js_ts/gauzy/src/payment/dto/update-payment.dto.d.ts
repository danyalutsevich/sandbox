import { IPaymentUpdateInput } from '../../../plugins/contracts';
import { RelationalCurrencyDTO } from "./../../currency/dto";
import { RelationalTagDTO } from "./../../tags/dto";
import { PaymentDTO } from "./payment.dto";
declare const UpdatePaymentDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & RelationalCurrencyDTO & PaymentDTO>;
/**
 * Update payment request DTO validation
 *
 */
export declare class UpdatePaymentDTO extends UpdatePaymentDTO_base implements IPaymentUpdateInput {
}
export {};
