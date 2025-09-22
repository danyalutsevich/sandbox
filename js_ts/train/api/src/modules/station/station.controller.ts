import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { StationEntity } from './station.entity';
import { ApiBearerAuth, ApiTags, PartialType } from '@nestjs/swagger';
import { StationService } from './station.service';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';
import { hasRole } from '@/utils/fuctions/hasRole';
import { Role } from '@/utils/enums/role.enum';
import { Roles } from '@/utils/decorators/role.decorator';

@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: StationEntity,
  },
  dto: {
    create: StationEntity,
    update: PartialType(StationEntity),
    replace: StationEntity,
  },
  query: {
    softDelete: true,
    join: {},
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
@ApiTags('Station')
@Controller('station')
export class StationController implements CrudController<StationEntity> {
  constructor(public service: StationService) {}
}
