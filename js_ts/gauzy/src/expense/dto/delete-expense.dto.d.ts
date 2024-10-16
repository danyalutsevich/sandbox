import { IExpenseFindInput } from "../../../plugins/contracts";
import { EmployeeFeatureDTO } from "./../../employee/dto";
import { ExpenseDTO } from "./expense.dto";
declare const DeleteExpenseDTO_base: import("@nestjs/mapped-types").MappedType<Partial<EmployeeFeatureDTO> & Pick<ExpenseDTO, "organization" | "organizationId">>;
/**
 * Delete expense request DTO validation
 */
export declare class DeleteExpenseDTO extends DeleteExpenseDTO_base implements IExpenseFindInput {
}
export {};
