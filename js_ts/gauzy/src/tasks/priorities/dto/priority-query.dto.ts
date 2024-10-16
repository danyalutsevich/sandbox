import { ITaskPriorityFindInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { TaskPriority } from '../priority.entity';
import { TenantOrganizationBaseDTO } from './../../../core/dto';

export class TaskPriorityQueryDTO
	extends IntersectionType(
		PartialType(TenantOrganizationBaseDTO),
		PickType(TaskPriority, ['projectId', 'organizationTeamId'])
	)
	implements ITaskPriorityFindInput {}
