import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { ScheduleEntity } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, PartialType } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';
import { hasRole } from '@/utils/fuctions/hasRole';
import { Role } from '@/utils/enums/role.enum';
import { Roles } from '@/utils/decorators/role.decorator';

@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: ScheduleEntity,
  },
  dto: {
    create: ScheduleEntity,
    update: PartialType(ScheduleEntity),
    replace: ScheduleEntity,
  },
  query: {
    softDelete: true,
    join: {
      route: {
        alias: 'route',
        eager: true,
      },
      train: {
        alias: 'train',
        eager: true,
      },
      'train.nextStation': {
        alias: 'nextStation',
      },
      'route.originStation': {
        alias: 'originStation',
      },
      'route.destinationStation': {
        alias: 'destinationStation',
      },
    },
  },

  routes: {
    getManyBase: { decorators: [Roles([Role.admin, Role.user])] },
    getOneBase: { decorators: [Roles([Role.admin, Role.user])] },
    createOneBase: { decorators: [Roles([Role.admin])] },
    createManyBase: { decorators: [Roles([Role.admin])] },
    updateOneBase: { decorators: [Roles([Role.admin])] },
    replaceOneBase: { decorators: [Roles([Role.admin])] },
    deleteOneBase: { decorators: [Roles([Role.admin])] },
    recoverOneBase: { decorators: [Roles([Role.admin])] },
  },
})
@ApiBearerAuth()
@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController implements CrudController<ScheduleEntity> {
  constructor(public service: ScheduleService) {}
}
