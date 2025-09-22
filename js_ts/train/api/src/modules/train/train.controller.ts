import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { TrainEntity } from './train.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TrainService } from './train.service';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';
import { Roles } from '@/utils/decorators/role.decorator';
import { Role } from '@/utils/enums/role.enum';

@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: TrainEntity,
  },
  query: {
    softDelete: true,
    join: {
      route: {
        alias: 'route',
      },
      nextStation: {
        alias: 'nextStation',
      },
      schedules: {
        alias: 'schedules',
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
@ApiTags('Train')
@Controller('train')
export class TrainController implements CrudController<TrainEntity> {
  constructor(public service: TrainService) {}
}
