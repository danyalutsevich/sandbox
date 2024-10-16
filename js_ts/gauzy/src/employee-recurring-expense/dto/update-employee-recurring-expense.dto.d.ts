import { IRecurringExpenseEditInput } from '../../../plugins/contracts';
import { EmployeeFeatureDTO } from "./../../employee/dto";
import { RelationalCurrencyDTO } from "./../../currency/dto";
import { EmployeeRecurringExpenseDTO } from "./employee-recurring-expense.dto";
declare const UpdateEmployeeRecurringExpenseDTO_base: import("@nestjs/mapped-types").MappedType<RelationalCurrencyDTO & EmployeeFeatureDTO & EmployeeRecurringExpenseDTO>;
export declare class UpdateEmployeeRecurringExpenseDTO extends UpdateEmployeeRecurringExpenseDTO_base implements IRecurringExpenseEditInput {
}
export {};
