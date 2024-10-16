import { DataSource } from 'typeorm';
import { ITenant, ITimeSlot } from '../../../plugins/contracts';
import { Activity } from './activity.entity';
export declare const AppsNames: string[];
export declare const createRandomActivities: (dataSource: DataSource, tenant: ITenant, timeSlots: ITimeSlot[]) => Promise<Activity[]>;
