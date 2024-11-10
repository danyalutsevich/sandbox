import { IPagination } from '../../plugins/contracts/dist/index';
import { PaginationParams } from './../core/crud';
import { ReportCategory } from './report-category.entity';
import { ReportCategoryService } from './report-category.service';
export declare class ReportCategoryController {
    private reportCategoryService;
    constructor(reportCategoryService: ReportCategoryService);
    findAll(filter?: PaginationParams<ReportCategory>): Promise<IPagination<ReportCategory>>;
}
