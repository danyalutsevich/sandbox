import { Crud, CrudController } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { AnswerEntity, QuestionEntity } from 'src/db/entities';
import { AnswerService } from './answer.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: QuestionEntity,
  },
})
@ApiTags('Answer')
@Controller('answer')
export class AnswerController implements CrudController<AnswerEntity> {
  constructor(public service: AnswerService) { }
}
