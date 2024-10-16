import { ITaskRelatedIssueTypeFindInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { TaskRelatedIssueType } from '../related-issue-type.entity';
declare const RelatedIssueTypeQueryDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Pick<TaskRelatedIssueType, "projectId" | "organizationTeamId">>;
export declare class RelatedIssueTypeQueryDTO extends RelatedIssueTypeQueryDTO_base implements ITaskRelatedIssueTypeFindInput {
}
export {};
