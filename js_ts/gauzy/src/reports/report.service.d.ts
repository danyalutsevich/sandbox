import { GetReportMenuItemsInput, IPagination, IReport } from '../../plugins/contracts/dist/index';
import { CrudService } from '../core/crud';
import { Report } from './report.entity';
import { MikroOrmReportRepository } from './repository/mikro-orm-report.repository';
import { TypeOrmReportRepository } from './repository/type-orm-report.repository';
export declare class ReportService extends CrudService<Report> {
    readonly typeOrmReportRepository: TypeOrmReportRepository;
    readonly mikroOrmReportRepository: MikroOrmReportRepository;
    private readonly logger;
    constructor(typeOrmReportRepository: TypeOrmReportRepository, mikroOrmReportRepository: MikroOrmReportRepository);
    /**
     * Retrieves all reports for the specified organization and tenant, including whether they should be shown in the menu.
     *
     * @param filter The filter containing organization ID and tenant ID for retrieving reports.
     * @returns A promise that resolves to an object containing paginated report items and total count.
     */
    findAllReports(filter?: any): Promise<IPagination<Report>>;
    /**
     * Retrieves report menu items based on the provided options.
     *
     * @param input The input containing the organization ID and tenant ID for filtering report menu items.
     * @returns A promise that resolves to an array of report menu items.
     */
    getMenuItems(input: GetReportMenuItemsInput): Promise<IReport[]>;
}
