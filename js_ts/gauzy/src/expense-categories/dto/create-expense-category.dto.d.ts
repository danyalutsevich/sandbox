import { IExpenseCategory } from '../../../plugins/contracts';
import { RelationalTagDTO } from "../../tags/dto";
import { ExpenseCategoryDTO } from "./expense-category.dto";
declare const CreateExpenseCategoryDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & ExpenseCategoryDTO>;
/**
 * Create expense category request validation
 */
export declare class CreateExpenseCategoryDTO extends CreateExpenseCategoryDTO_base implements IExpenseCategory {
}
export {};
