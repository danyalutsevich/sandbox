import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from 'src/db/entities';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService extends TypeOrmCrudService<QuestionEntity> {
  constructor(
    @InjectRepository(QuestionEntity) public repo: Repository<QuestionEntity>,
  ) {
    super(repo);
  }
}
