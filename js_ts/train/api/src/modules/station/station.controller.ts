import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { StationEntity } from './station.entity';
import { ApiTags } from '@nestjs/swagger';
import { StationService } from './station.service';

@Crud({
  model: {
    type: StationEntity,
  },
  query: {
    softDelete: true,
  },
  // routes: {
  //   exclude: ['getManyBase', 'getOneBase'],
  // },
})
@ApiTags('Station')
@Controller('station')
export class StationController implements CrudController<StationEntity> {
  constructor(public service: StationService) { }
}
