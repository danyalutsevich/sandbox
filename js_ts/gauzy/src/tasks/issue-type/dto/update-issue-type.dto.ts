import { IntersectionType, PartialType } from '@nestjs/swagger';
import { IIssueTypeUpdateInput } from '../../../../plugins/contracts/dist/index';
import { IssueType } from '../issue-type.entity';
import { TenantOrganizationBaseDTO } from '../../../core/dto';

export class UpdateIssueTypeDTO
	extends IntersectionType(PartialType(TenantOrganizationBaseDTO), PartialType(IssueType))
	implements IIssueTypeUpdateInput {}
