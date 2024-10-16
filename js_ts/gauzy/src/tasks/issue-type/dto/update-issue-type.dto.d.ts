import { IIssueTypeUpdateInput } from '../../../../plugins/contracts/dist/index';
import { IssueType } from '../issue-type.entity';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
declare const UpdateIssueTypeDTO_base: import("@nestjs/common").Type<Partial<TenantOrganizationBaseDTO> & Partial<IssueType>>;
export declare class UpdateIssueTypeDTO extends UpdateIssueTypeDTO_base implements IIssueTypeUpdateInput {
}
export {};
