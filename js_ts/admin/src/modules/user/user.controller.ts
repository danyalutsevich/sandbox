import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';

import { UserEntity } from '../../db/entities';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: UserEntity,
  },
  validation: {
    always: true,
  },
  query: {
    join: {
      roles: { alias: 'roles', exclude: ['userId', 'roleId'] },
      'roles.role': { alias: 'role' },
      services: {},
      answers: {},
    },
  },
})
@ApiTags('User')
@Controller('user')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}
}
