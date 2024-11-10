import { Crud, CrudController } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { QuestionEntity } from 'src/db/entities';
import { QuestionService } from './question.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: QuestionEntity,
  },
})
@ApiTags('Question')
@Controller('question')
export class QuestionController implements CrudController<QuestionEntity> {
  constructor(public service: QuestionService) { }
}
