import { IExpenseCreateInput } from "../../../plugins/contracts";
declare const CreateExpenseDTO_base: import("@nestjs/mapped-types").MappedType<any>;
/**
 * Create Expense DTO request validation
 */
export declare class CreateExpenseDTO extends CreateExpenseDTO_base implements IExpenseCreateInput {
}
export {};
