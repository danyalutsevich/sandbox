import { Crud, CrudController } from '@dataui/crud';
import { ScheduleEntity } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: ScheduleEntity,
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
})
@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController implements CrudController<ScheduleEntity> {
  constructor(public service: ScheduleService) {}
}
