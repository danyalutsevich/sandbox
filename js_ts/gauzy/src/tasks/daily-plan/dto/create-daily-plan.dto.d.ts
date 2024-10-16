import { DailyPlanStatusEnum, IDailyPlanCreateInput, ITask } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { EmployeeFeatureDTO } from '../../../employee/dto';
declare const CreateDailyPlanDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & EmployeeFeatureDTO>;
/**
 * Create Daily Plan DTO validation
 */
export declare class CreateDailyPlanDTO extends CreateDailyPlanDTO_base implements IDailyPlanCreateInput {
    readonly date: Date;
    readonly workTimePlanned: number;
    readonly status: DailyPlanStatusEnum;
    readonly taskId?: ITask['id'];
}
export {};
