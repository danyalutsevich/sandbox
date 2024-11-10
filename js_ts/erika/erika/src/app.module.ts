import { CRUDServices } from './services/index';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EICRUDModule } from '@eicrud/core';
import { CRUDEntities } from './services/index';
import { CRUD_CONFIG_KEY } from '@eicrud/core/config';
import { MyConfigService } from './eicrud.config.service';
import { ConfigModule } from '@nestjs/config';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      // autoLoadEntities: true,
      entities: [...CRUDEntities],
      driver: PostgreSqlDriver,
      clientUrl: 'postgresql://postgres:root@localhost:5432/erika-db',
    }),
    EICRUDModule.forRoot(),
  ],
  providers: [
    ...CRUDServices,
    {
      provide: CRUD_CONFIG_KEY,
      useClass: MyConfigService,
    },
  ],
})
export class AppModule {}
