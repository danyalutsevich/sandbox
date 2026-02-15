import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntryEntity } from './entry.entity';

@Injectable()
export class EntryService extends TypeOrmCrudService<EntryEntity> {
  constructor(
    @InjectRepository(EntryEntity)
    entryRepo: Repository<EntryEntity>,
  ) {
    super(entryRepo);
  }
}
