import { ICommand } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { IImportRecord, IImportRecordFind } from '../../../../plugins/contracts/dist/index';
export declare class ImportRecordUpdateOrCreateCommand implements ICommand {
    readonly options: FindOptionsWhere<IImportRecordFind>;
    readonly input?: IImportRecord;
    static readonly type = "[Find Or Create] Import Record";
    constructor(options: FindOptionsWhere<IImportRecordFind>, input?: IImportRecord);
}
