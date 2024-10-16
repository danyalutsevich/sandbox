import { ExpenseCreateHandler } from './expense.create.handler';
import { ExpenseDeleteHandler } from './expense.delete.handler';
import { ExpenseUpdateHandler } from './expense.update.handler';
export declare const CommandHandlers: (typeof ExpenseCreateHandler | typeof ExpenseDeleteHandler | typeof ExpenseUpdateHandler)[];
