import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nEntity } from 'src/db/entities';
import { Repository } from 'typeorm';
import { getI18nConnection, I18nRepository } from 'typeorm-i18n';

@Injectable()
export class I18nService extends TypeOrmCrudService<I18nEntity> {
  i18nRepo: I18nRepository<I18nEntity>;
  constructor(
    @InjectRepository(I18nEntity)
    public repo: Repository<I18nEntity>,
  ) {
    // const repo = getI18nConnection().getRepository(I18nEntity);
    super(repo as any);
    // this.i18nRepo = repo.locale("fr");
    // this.i18nRepo.locale("fr");
  }
}
