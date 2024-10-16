import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';

import { ServiceEntity } from '../../db/entities/Service.entity';
import { CrudRequest, Override } from '@dataui/crud';

@Injectable()
export class ServiceService extends TypeOrmCrudService<ServiceEntity> {
  constructor(@InjectRepository(ServiceEntity) repo) {
    super(repo);
  }
  @Override()
  async deleteOne(req: CrudRequest): Promise<void | ServiceEntity> {
    
   return super.deleteOne(req);
  }
}
