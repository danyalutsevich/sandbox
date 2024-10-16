import { SelectQueryBuilder } from 'typeorm';
import { IGetTimesheetInput, ITimesheet } from '../../../plugins/contracts';
import { TenantAwareCrudService } from './../../core/crud';
import { Timesheet } from './timesheet.entity';
import { TypeOrmTimesheetRepository } from './repository/type-orm-timesheet.repository';
import { MikroOrmTimesheetRepository } from './repository/mikro-orm-timesheet.repository';
export declare class TimeSheetService extends TenantAwareCrudService<Timesheet> {
    constructor(typeOrmTimesheetRepository: TypeOrmTimesheetRepository, mikroOrmTimesheetRepository: MikroOrmTimesheetRepository);
    /**
     * GET timesheets count in date range for same tenant
     *
     * @param request
     * @returns
     */
    getTimeSheetCount(request: IGetTimesheetInput): Promise<number>;
    /**
     * GET timesheets in date range for same tenant
     *
     * @param request
     * @returns
     */
    getTimeSheets(request: IGetTimesheetInput): Promise<ITimesheet[]>;
    /**
     * GET timesheet QueryBuilder
     *
     * @param qb
     * @param request
     * @returns
     */
    getFilterTimesheetQuery(qb: SelectQueryBuilder<Timesheet>, request: IGetTimesheetInput): Promise<SelectQueryBuilder<Timesheet>>;
}
