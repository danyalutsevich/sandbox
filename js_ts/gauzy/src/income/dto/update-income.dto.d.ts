import { IIncomeUpdateInput } from '../../../plugins/contracts';
import { RelationalCurrencyDTO } from "./../../currency/dto";
import { RelationalTagDTO } from "./../../tags/dto";
import { IncomeDTO } from "./income.dto";
declare const UpdateIncomeDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & RelationalCurrencyDTO & IncomeDTO>;
/**
 * Update income request DTO validation
 */
export declare class UpdateIncomeDTO extends UpdateIncomeDTO_base implements IIncomeUpdateInput {
}
export {};
