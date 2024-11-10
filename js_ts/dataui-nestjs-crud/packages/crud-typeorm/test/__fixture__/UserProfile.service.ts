import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TypeOrmCrudService } from '../../src/typeorm-crud.service';
import { UserProfile } from '../../../../integration/crud-typeorm/users-profiles';

@Injectable()
export class UserProfilesService extends TypeOrmCrudService<UserProfile> {
  constructor(@InjectRepository(UserProfile) repo) {
    super(repo);
  }
}
