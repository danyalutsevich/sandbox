import { TimeFrameStatusEnum } from '../../../plugins/contracts';
export declare class GoalTimeFrameDTO {
    readonly name: string;
    readonly status: TimeFrameStatusEnum;
    readonly startDate: Date;
    readonly endDate: Date;
}
