import { ITaskVersionFindInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { TaskVersion } from '../version.entity';

export class VersionQueryDTO
	extends IntersectionType(
		PartialType(TenantOrganizationBaseDTO),
		PickType(TaskVersion, ['projectId', 'organizationTeamId'])
	)
	implements ITaskVersionFindInput {}
