import { Crud, CrudController } from '@dataui/crud';
import { ExchangeRateEntity } from './exchange-rate.entity';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';

@Crud({
  model: {
    type: ExchangeRateEntity,
  },
})
@ApiTags('Exchange Rates')
@Controller('exchange-rate')
export class ExchangeRateController
  implements CrudController<ExchangeRateEntity>
{
  constructor(public service: ExchangeRateService) {}
}
