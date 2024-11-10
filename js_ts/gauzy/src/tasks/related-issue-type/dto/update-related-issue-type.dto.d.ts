import { ITaskRelatedIssueTypeUpdateInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { TaskRelatedIssueType } from '../related-issue-type.entity';
declare const UpdatesRelatedIssueTypeDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Partial<TaskRelatedIssueType>>;
export declare class UpdatesRelatedIssueTypeDTO extends UpdatesRelatedIssueTypeDTO_base implements ITaskRelatedIssueTypeUpdateInput {
}
export {};
