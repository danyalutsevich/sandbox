import { Crud, CrudController } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { I18nEntity } from 'src/db/entities';
import { I18nService } from './i18n.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: I18nEntity,
  },
})
@ApiTags('I18n')
@Controller('i18n')
export class I18nController implements CrudController<I18nEntity> {
  constructor(public service: I18nService) { }
}
