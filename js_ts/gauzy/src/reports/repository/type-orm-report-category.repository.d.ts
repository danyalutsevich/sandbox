import { Repository } from 'typeorm';
import { ReportCategory } from '../report-category.entity';
export declare class TypeOrmReportCategoryRepository extends Repository<ReportCategory> {
    readonly repository: Repository<ReportCategory>;
    constructor(repository: Repository<ReportCategory>);
}
