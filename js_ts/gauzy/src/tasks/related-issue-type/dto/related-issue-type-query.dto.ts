import { ITaskRelatedIssueTypeFindInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { TaskRelatedIssueType } from '../related-issue-type.entity';

export class RelatedIssueTypeQueryDTO
	extends IntersectionType(
		PartialType(TenantOrganizationBaseDTO),
		PickType(TaskRelatedIssueType, ['projectId', 'organizationTeamId'])
	)
	implements ITaskRelatedIssueTypeFindInput { }
