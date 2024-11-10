import { Repository } from 'typeorm';
import { Report } from '../report.entity';
export declare class TypeOrmReportRepository extends Repository<Report> {
    readonly repository: Repository<Report>;
    constructor(repository: Repository<Report>);
}
