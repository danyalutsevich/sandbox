import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { RouteEntity } from './route.entity';
import { RouteService } from './route.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, PartialType } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';
import { hasRole } from '@/utils/fuctions/hasRole';
import { Role } from '@/utils/enums/role.enum';
import { Roles } from '@/utils/decorators/role.decorator';

@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: RouteEntity,
  },
  dto: {
    create: RouteEntity,
    update: PartialType(RouteEntity),
    replace: RouteEntity,
  },
  query: {
    softDelete: true,
    join: {
      originStation: {
        alias: 'originStation',
        eager: true,
      },
      destinationStation: {
        alias: 'destinationStation',
        eager: true,
      },
      trains: {
        alias: 'trains',
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
@ApiTags('Route')
@Controller('route')
export class RouteController implements CrudController<RouteEntity> {
  constructor(public service: RouteService) {}
}
