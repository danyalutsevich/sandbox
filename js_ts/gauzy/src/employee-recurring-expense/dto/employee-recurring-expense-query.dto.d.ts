import { EmployeeFeatureDTO } from "./../../employee/dto";
import { DateRangeQueryDTO, RelationsQueryDTO } from "./../../shared/dto";
declare const EmployeeRecurringExpenseQueryDTO_base: import("@nestjs/mapped-types").MappedType<RelationsQueryDTO & DateRangeQueryDTO & EmployeeFeatureDTO>;
export declare class EmployeeRecurringExpenseQueryDTO extends EmployeeRecurringExpenseQueryDTO_base {
}
export {};
