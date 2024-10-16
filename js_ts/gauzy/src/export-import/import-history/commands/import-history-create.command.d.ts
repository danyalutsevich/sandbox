import { ICommand } from '@nestjs/cqrs';
import { IImportHistory } from '../../../../plugins/contracts/dist/index';
export declare class ImportHistoryCreateCommand implements ICommand {
    readonly input: IImportHistory;
    static readonly type = "[Create] Import History";
    constructor(input: IImportHistory);
}
