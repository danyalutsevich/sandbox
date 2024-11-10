import { IPayment } from '../../../plugins/contracts';
import { EmployeeFeatureDTO } from "./../../employee/dto";
import { RelationalCurrencyDTO } from "./../../currency/dto";
import { RelationalTagDTO } from "./../../tags/dto";
import { PaymentDTO } from "./payment.dto";
declare const CreatePaymentDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & RelationalCurrencyDTO & Partial<EmployeeFeatureDTO> & PaymentDTO>;
/**
 * Create payment request DTO validation
 *
 */
export declare class CreatePaymentDTO extends CreatePaymentDTO_base implements IPayment {
}
export {};
