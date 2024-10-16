import { ITaskVersionUpdateInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PartialType } from '@nestjs/swagger';
import { TenantOrganizationBaseDTO } from '../../../core/dto';
import { TaskVersion } from '../version.entity';

export class UpdatesVersionDTO
	extends IntersectionType(PartialType(TenantOrganizationBaseDTO), PartialType(TaskVersion))
	implements ITaskVersionUpdateInput {}
