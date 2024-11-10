import { ITaskPriorityUpdateInput } from '../../../../plugins/contracts/dist/index';
import { IntersectionType, PartialType } from '@nestjs/swagger';
import { TaskPriority } from '../priority.entity';
import { TenantOrganizationBaseDTO } from './../../../core/dto';

export class UpdateTaskPriorityDTO extends IntersectionType(
    PartialType(TenantOrganizationBaseDTO),
    PartialType(TaskPriority)
) implements ITaskPriorityUpdateInput { }
