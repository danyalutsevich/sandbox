import { ITaskRelatedIssueTypeCreateInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PartialType } from '@nestjs/swagger';
import { TaskRelatedIssueType } from '../related-issue-type.entity';
import { TenantOrganizationBaseDTO } from '../../../core/dto';

export class CreateRelatedIssueTypeDTO
	extends IntersectionType(
		PartialType(TenantOrganizationBaseDTO),
		TaskRelatedIssueType
	)
	implements ITaskRelatedIssueTypeCreateInput { }
