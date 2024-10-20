import { ITaskRelatedIssueTypeUpdateInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PartialType } from '@nestjs/swagger';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { TaskRelatedIssueType } from '../related-issue-type.entity';

export class UpdatesRelatedIssueTypeDTO
	extends IntersectionType(
		PartialType(TenantOrganizationBaseDTO),
		PartialType(TaskRelatedIssueType)
	)
	implements ITaskRelatedIssueTypeUpdateInput { }
