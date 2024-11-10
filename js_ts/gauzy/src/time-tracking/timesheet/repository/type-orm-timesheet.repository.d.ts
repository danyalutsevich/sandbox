import { Repository } from 'typeorm';
import { Timesheet } from '../timesheet.entity';
export declare class TypeOrmTimesheetRepository extends Repository<Timesheet> {
    readonly repository: Repository<Timesheet>;
    constructor(repository: Repository<Timesheet>);
}
