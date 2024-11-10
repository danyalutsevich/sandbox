import { DataSource } from 'typeorm';
import { ITimeSlot, ITenant, ITimesheet } from '../../../plugins/contracts';
import { ApplicationPluginConfig } from '../../../plugins/common/dist/index';
export declare const createRandomTimeLogs: (dataSource: DataSource, config: Partial<ApplicationPluginConfig>, tenant: ITenant, timeSheets: ITimesheet[]) => Promise<ITimeSlot[]>;
export declare const recalculateTimesheetActivity: (dataSource: DataSource, timesheets: ITimesheet[]) => Promise<void>;
