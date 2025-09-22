import { Crud, CrudController } from '@dataui/crud';
import { RouteEntity } from './route.entity';
import { RouteService } from './route.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: RouteEntity,
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
})
@ApiTags('Route')
@Controller('route')
export class RouteController implements CrudController<RouteEntity> {
  constructor(public service: RouteService) {}
}
