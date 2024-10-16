import { IRecurringExpenseModel } from '../../../plugins/contracts';
import { EmployeeFeatureDTO } from "./../../employee/dto";
import { RelationalCurrencyDTO } from "./../../currency/dto";
import { EmployeeRecurringExpenseDTO } from "./employee-recurring-expense.dto";
declare const CreateEmployeeRecurringExpenseDTO_base: import("@nestjs/mapped-types").MappedType<RelationalCurrencyDTO & EmployeeFeatureDTO & EmployeeRecurringExpenseDTO>;
export declare class CreateEmployeeRecurringExpenseDTO extends CreateEmployeeRecurringExpenseDTO_base implements IRecurringExpenseModel {
}
export {};
