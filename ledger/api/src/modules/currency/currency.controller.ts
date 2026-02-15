import { Crud, CrudController } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { CurrencyEntity } from './currency.entity';
import { CurrencyService } from './currency.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: CurrencyEntity,
  },
  dto: {
    create: CurrencyEntity,
  },
})
@ApiTags('Currency')
@Controller('currency')
export class CurrencyController implements CrudController<CurrencyEntity> {
  constructor(public service: CurrencyService) {}
}
