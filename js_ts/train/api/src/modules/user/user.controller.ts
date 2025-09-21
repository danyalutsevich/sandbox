import { Crud, CrudController } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: UserEntity,
  },
  query: {
    softDelete: true,
  },
})
@ApiTags('User')
@Controller('user')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) { }
}
