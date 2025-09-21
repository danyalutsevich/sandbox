import { Crud, CrudController } from '@dataui/crud';
import { RouteEntity } from './route.entity';
import { RouteService } from './route.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: RouteEntity,
  },
  query: {
    softDelete: true,
  },
})
@ApiTags('Route')
@Controller('route')
export class RouteController implements CrudController<RouteEntity> {
  constructor(public service: RouteService) {}
}
