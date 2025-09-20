import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { StationEntity } from './station.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StationService extends TypeOrmCrudService<StationEntity> {
  constructor(
    @InjectRepository(StationEntity)
    repo: Repository<StationEntity>,
  ) {
    super(repo);
  }
}
