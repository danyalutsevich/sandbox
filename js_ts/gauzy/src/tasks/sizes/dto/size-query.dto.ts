import { ITaskSizeFindInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { TaskSize } from '../size.entity';
import { TenantOrganizationBaseDTO } from './../../../core/dto';

export class TaskSizeQueryDTO
	extends IntersectionType(
		PartialType(TenantOrganizationBaseDTO),
		PickType(TaskSize, ['projectId', 'organizationTeamId'])
	)
	implements ITaskSizeFindInput {}
