import { ITaskRelatedIssueTypeCreateInput } from '../../../../plugins/contracts/dist/index';
import { TaskRelatedIssueType } from '../related-issue-type.entity';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
declare const CreateRelatedIssueTypeDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & TaskRelatedIssueType>;
export declare class CreateRelatedIssueTypeDTO extends CreateRelatedIssueTypeDTO_base implements ITaskRelatedIssueTypeCreateInput {
}
export {};
