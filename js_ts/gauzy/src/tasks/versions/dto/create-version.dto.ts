import { ITaskVersionCreateInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PartialType } from '@nestjs/swagger';
import { TaskVersion } from '../version.entity';
import { TenantOrganizationBaseDTO } from '../../../core/dto';

export class CreateVersionDTO
	extends IntersectionType(PartialType(TenantOrganizationBaseDTO), TaskVersion)
	implements ITaskVersionCreateInput {}
