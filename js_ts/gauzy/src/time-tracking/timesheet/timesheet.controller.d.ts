import { CommandBus } from '@nestjs/cqrs';
import { ITimesheet } from '../../../plugins/contracts';
import { TimeSheetService } from './timesheet.service';
import { SubmitTimesheetStatusDTO, TimesheetQueryDTO, UpdateTimesheetStatusDTO } from './dto/query';
export declare class TimeSheetController {
    private readonly commandBus;
    private readonly timeSheetService;
    constructor(commandBus: CommandBus, timeSheetService: TimeSheetService);
    /**
     * GET timesheet counts in the same tenant
     *
     * @param options
     * @returns
     */
    getTimesheetCount(options: TimesheetQueryDTO): Promise<number>;
    /**
     * UPDATE timesheet status
     *
     * @param entity
     * @returns
     */
    updateTimesheetStatus(entity: UpdateTimesheetStatusDTO): Promise<ITimesheet[]>;
    /**
     * UPDATE timesheet submit status
     *
     * @param entity
     * @returns
     */
    submitTimeSheet(entity: SubmitTimesheetStatusDTO): Promise<ITimesheet[]>;
    /**
     * GET all timesheet in same tenant
     *
     * @param options
     * @returns
     */
    get(options: TimesheetQueryDTO): Promise<ITimesheet[]>;
    /**
     * Find timesheet by id
     *
     * @param id
     * @returns
     */
    findById(id: ITimesheet['id']): Promise<ITimesheet>;
}
