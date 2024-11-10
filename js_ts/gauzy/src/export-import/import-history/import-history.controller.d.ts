import { IImportHistory, IPagination } from '../../../plugins/contracts';
import { ImportHistoryService } from './import-history.service';
export declare class ImportHistoryController {
    private readonly _importHistoryService;
    constructor(_importHistoryService: ImportHistoryService);
    /**
     *
     * @returns
     */
    findAll(): Promise<IPagination<IImportHistory>>;
}
