import { ICommandHandler } from '@nestjs/cqrs';
import { ImportHistoryService } from './../../import-history.service';
import { ImportHistoryCreateCommand } from '../import-history-create.command';
import { ImportHistory } from './../../import-history.entity';
export declare class ImportHistoryCreateHandler implements ICommandHandler<ImportHistoryCreateCommand> {
    private readonly _importHistoryService;
    constructor(_importHistoryService: ImportHistoryService);
    execute(event: ImportHistoryCreateCommand): Promise<ImportHistory>;
}
