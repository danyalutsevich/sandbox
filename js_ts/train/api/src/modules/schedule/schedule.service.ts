import { Injectable } from '@nestjs/common';
import { ScheduleEntity } from './schedule.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleService extends TypeOrmCrudService<ScheduleEntity> {
  constructor(
    @InjectRepository(ScheduleEntity) repo: Repository<ScheduleEntity>,
  ) {
    super(repo);
  }
}
