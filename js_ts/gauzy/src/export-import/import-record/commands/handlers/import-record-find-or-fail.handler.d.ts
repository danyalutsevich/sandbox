import { ICommandHandler } from '@nestjs/cqrs';
import { ImportRecordService } from './../../import-record.service';
import { ImportRecordFindOrFailCommand } from './../import-record-find-or-fail.command';
import { ITryRequest } from './../../../../core/crud/try-request';
import { ImportRecord } from './../../import-record.entity';
export declare class ImportRecordFindOrFailHandler implements ICommandHandler<ImportRecordFindOrFailCommand> {
    private readonly _importRecordService;
    constructor(_importRecordService: ImportRecordService);
    execute(event: ImportRecordFindOrFailCommand): Promise<ITryRequest<ImportRecord>>;
}
