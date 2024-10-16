import { IDailyPlanUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { CreateDailyPlanDTO } from './create-daily-plan.dto';
declare const UpdateDailyPlanDTO_base: import("@nestjs/common").Type<TenantOrganizationBaseDTO & Partial<Pick<CreateDailyPlanDTO, keyof CreateDailyPlanDTO>>>;
/**
 * Update Daily Plan DTO validation
 */
export declare class UpdateDailyPlanDTO extends UpdateDailyPlanDTO_base implements IDailyPlanUpdateInput {
}
export {};
