import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { IIssueTypeFindInput } from '../../../../plugins/contracts/dist/index';
import { IssueType } from '../issue-type.entity';
import { TenantOrganizationBaseDTO } from '../../../core/dto';

export class IssueTypeQueryDTO
	extends IntersectionType(
		PartialType(TenantOrganizationBaseDTO),
		PickType(IssueType, ['projectId', 'organizationTeamId'])
	)
	implements IIssueTypeFindInput {}
