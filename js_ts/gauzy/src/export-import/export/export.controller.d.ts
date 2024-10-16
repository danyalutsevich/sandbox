import { ExportService } from './export.service';
export declare class ExportController {
    private readonly _exportService;
    constructor(_exportService: ExportService);
    exportAll(data: any, res: any): Promise<any>;
    downloadTemplate(res: any): Promise<any>;
    exportByName(data: any, res: any): Promise<any>;
}
