import { IReport, IReportOrganization } from '../../plugins/contracts/dist/index';
import { TenantOrganizationBaseEntity } from '../core/entities/internal';
export declare class ReportOrganization extends TenantOrganizationBaseEntity implements IReportOrganization {
    isEnabled?: boolean;
    report?: IReport;
    reportId?: IReport['id'];
}
