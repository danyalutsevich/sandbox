import { IncomeCreateHandler } from './income.create.handler';
import { IncomeDeleteHandler } from './income.delete.handler';
import { IncomeUpdateHandler } from './income.update.handler';
export declare const CommandHandlers: (typeof IncomeCreateHandler | typeof IncomeDeleteHandler | typeof IncomeUpdateHandler)[];
