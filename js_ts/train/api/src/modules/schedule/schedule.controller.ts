import { Crud, CrudController } from '@dataui/crud';
import { ScheduleEntity } from './schedule.entity';
import { ScheduleService } from './schedule.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
    },
  },
})
@ApiTags('schedule')
@Controller('schedule')
export class ScheduleController implements CrudController<ScheduleEntity> {
  constructor(public service: ScheduleService) { }
}
