import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TrainEntity } from './train.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrainService extends TypeOrmCrudService<TrainEntity> {
  constructor(
    @InjectRepository(TrainEntity)
    repo: Repository<TrainEntity>,
  ) {
    super(repo);
  }
}
