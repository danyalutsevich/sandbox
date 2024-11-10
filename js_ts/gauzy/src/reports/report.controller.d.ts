import { GetReportMenuItemsInput, IPagination, UpdateReportMenuInput } from '../../plugins/contracts/dist/index';
import { Report } from './report.entity';
import { ReportService } from './report.service';
import { ReportOrganizationService } from './report-organization.service';
export declare class ReportController {
    private readonly _reportService;
    private readonly _reportOrganizationService;
    constructor(_reportService: ReportService, _reportOrganizationService: ReportOrganizationService);
    /**
     * Get all reports
     *
     * @param options
     * @returns
     */
    findAllReports(options: GetReportMenuItemsInput): Promise<IPagination<Report>>;
    /**
     *
     * @param filter
     * @returns
     */
    getMenuItems(filter?: GetReportMenuItemsInput): Promise<Report[]>;
    /**
     *
     * @param input
     * @returns
     */
    updateReportMenu(input?: UpdateReportMenuInput): Promise<import("./report-organization.entity").ReportOrganization>;
}
