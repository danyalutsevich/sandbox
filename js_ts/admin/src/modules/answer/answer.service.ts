import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from 'src/db/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService extends TypeOrmCrudService<AnswerEntity> {
  constructor(
    @InjectRepository(AnswerEntity) public repo: Repository<AnswerEntity>,
  ) {
    super(repo);
  }
}
