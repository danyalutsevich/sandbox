import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { TrainEntity } from './train.entity';
import { ApiTags } from '@nestjs/swagger';
import { TrainService } from './train.service';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';

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
})
@ApiTags('Train')
@Controller('train')
export class TrainController implements CrudController<TrainEntity> {
  constructor(public service: TrainService) {}
}
