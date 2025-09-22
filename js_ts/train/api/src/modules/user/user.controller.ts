import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { Controller, UseGuards } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';
import { Roles } from '@/utils/decorators/role.decorator';
import { Role } from '@/utils/enums/role.enum';
import { hasRole } from '@/utils/fuctions/hasRole';

@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: UserEntity,
  },
  query: {},
  routes: {
    getManyBase: { decorators: [Roles([Role.admin])] },
    getOneBase: { decorators: [Roles([Role.admin, Role.user])] },
    createOneBase: { decorators: [Roles([Role.admin, Role.user])] },
    createManyBase: { decorators: [Roles([Role.admin])] },
    updateOneBase: { decorators: [Roles([Role.admin, Role.user])] },
    replaceOneBase: { decorators: [Roles([Role.admin, Role.user])] },
    deleteOneBase: { decorators: [Roles([Role.admin, Role.user])] },
    recoverOneBase: { decorators: [Roles([Role.admin])] },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user) => {
    return hasRole(user, Role.admin) ? {} : { id: user.id };
  },
  persist: (user) => {
    return hasRole(user, Role.admin) ? {} : { user: { id: user.id } };
  },
})
@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}
}
