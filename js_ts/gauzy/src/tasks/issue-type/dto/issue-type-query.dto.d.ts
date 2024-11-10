import { IIssueTypeFindInput } from '../../../../plugins/contracts/dist/index';
import { IssueType } from '../issue-type.entity';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
declare const IssueTypeQueryDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Pick<IssueType, "projectId" | "organizationTeamId">>;
export declare class IssueTypeQueryDTO extends IssueTypeQueryDTO_base implements IIssueTypeFindInput {
}
export {};
