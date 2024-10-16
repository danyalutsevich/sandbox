import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController, CrudAuth } from '@dataui/crud';

import { UserEntity, ServiceEntity } from '../../db/entities';
import { ServiceService } from './service.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/utils/guards/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Crud({
  model: {
    type: ServiceEntity,
  },
  query: {
    softDelete: true,
    join: {
      owner: { alias: 'owner' },
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: UserEntity) => {
    console.log(user);
    return { 'ServiceEntity.ownerId': user.id };
  },
  persist: (user: UserEntity) => {
    return { owner: { id: user.id } };
  },
})
@ApiTags('Service')
@Controller('service')
export class ServiceController implements CrudController<ServiceEntity> {
  constructor(public service: ServiceService) {}
}
