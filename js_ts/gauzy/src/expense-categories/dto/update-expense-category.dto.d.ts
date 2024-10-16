import { IExpenseCategory } from '../../../plugins/contracts';
import { RelationalTagDTO } from "./../../tags/dto";
import { ExpenseCategoryDTO } from "./expense-category.dto";
declare const UpdateExpenseCategoryDTO_base: import("@nestjs/mapped-types").MappedType<RelationalTagDTO & ExpenseCategoryDTO>;
/**
 * Update expense category request validation
 */
export declare class UpdateExpenseCategoryDTO extends UpdateExpenseCategoryDTO_base implements IExpenseCategory {
    readonly id: string;
}
export {};
