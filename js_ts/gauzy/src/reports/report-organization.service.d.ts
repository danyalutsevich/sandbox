import { IOrganization, UpdateReportMenuInput } from '../../plugins/contracts/dist/index';
import { TenantAwareCrudService } from '../core/crud';
import { ReportOrganization } from './report-organization.entity';
import { TypeOrmReportRepository } from './repository/type-orm-report.repository';
import { TypeOrmReportOrganizationRepository } from './repository/type-orm-report-organization.repository';
import { MikroOrmReportOrganizationRepository } from './repository/mikro-orm-report-organization.repository';
export declare class ReportOrganizationService extends TenantAwareCrudService<ReportOrganization> {
    private readonly typeOrmReportRepository;
    private readonly typeOrmReportOrganizationRepository;
    private readonly mikroOrmReportOrganizationRepository;
    constructor(typeOrmReportRepository: TypeOrmReportRepository, typeOrmReportOrganizationRepository: TypeOrmReportOrganizationRepository, mikroOrmReportOrganizationRepository: MikroOrmReportOrganizationRepository);
    /**
     * Updates an existing report menu entry if it exists, otherwise creates a new one.
     * @param input The input containing data for updating or creating the report menu entry.
     * @returns The updated or newly created report menu entry.
     */
    updateReportMenu(input: UpdateReportMenuInput): Promise<ReportOrganization>;
    /**
     * Bulk create organization default reports menu.
     *
     * @param input - The organization input data.
     * @returns A promise that resolves to an array of created ReportOrganization instances.
     */
    bulkCreateOrganizationReport(input: IOrganization): Promise<ReportOrganization[]>;
}
