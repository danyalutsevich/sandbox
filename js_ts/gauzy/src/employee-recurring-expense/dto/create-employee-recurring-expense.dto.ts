import { IRecurringExpenseModel } from '../../../plugins/contracts';
import { IntersectionType } from "@nestjs/mapped-types";
import { EmployeeFeatureDTO } from "./../../employee/dto";
import { RelationalCurrencyDTO } from "./../../currency/dto";
import { EmployeeRecurringExpenseDTO } from "./employee-recurring-expense.dto";

export class CreateEmployeeRecurringExpenseDTO extends IntersectionType(
    EmployeeRecurringExpenseDTO,
    EmployeeFeatureDTO,
    RelationalCurrencyDTO
) implements IRecurringExpenseModel { }