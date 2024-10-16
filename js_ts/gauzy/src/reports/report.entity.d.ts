import { IReport, IReportCategory, IReportOrganization } from '../../plugins/contracts/dist/index';
import { BaseEntity } from '../core/entities/internal';
export declare class Report extends BaseEntity implements IReport {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
    iconClass?: string;
    showInMenu?: boolean;
    /** Additional virtual columns */
    imageUrl?: string;
    category?: IReportCategory;
    categoryId?: IReportCategory['id'];
    reportOrganizations?: IReportOrganization[];
}
