import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Repository } from 'typeorm';
import { FavoriteEntity } from './favorite.entity';

@Injectable()
export class FavoriteService extends TypeOrmCrudService<FavoriteEntity> {
  constructor(@InjectRepository(FavoriteEntity) repo: Repository<FavoriteEntity>) {
    super(repo);
  }
}


