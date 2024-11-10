import { Repository } from 'typeorm';
import { ReportOrganization } from '../report-organization.entity';
export declare class TypeOrmReportOrganizationRepository extends Repository<ReportOrganization> {
    readonly repository: Repository<ReportOrganization>;
    constructor(repository: Repository<ReportOrganization>);
}
