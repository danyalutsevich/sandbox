import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { UserEntity } from '../../db/entities';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }
}
