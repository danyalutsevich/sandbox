import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FavoriteEntity } from './favorite.entity';
import { FavoriteService } from './favorite.service';
import { hasRole } from '@/utils/fuctions/hasRole';
import { Role } from '@/utils/enums/role.enum';
import { JwtAuthGuard } from '@/utils/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Crud({
  model: { type: FavoriteEntity },
  query: {
    join: {
      user: { eager: true },
      schedule: { eager: true },
      'schedule.route': { alias: 'route', eager: true },
      'schedule.train': { alias: 'train', eager: true },
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user) => {
    return hasRole(user, Role.admin)
      ? {}
      : { 'FavoriteEntity.userId': user.id };
  },
  persist: (user) => {
    return hasRole(user, Role.admin) ? {} : { user: { id: user.id } };
  },
})
@ApiBearerAuth()
@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController implements CrudController<FavoriteEntity> {
  constructor(public service: FavoriteService) {}
}
