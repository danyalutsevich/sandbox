import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Entities from './utils/entities';
import { GlobalModule } from './modules/global/global.module';
import { AuthModule } from './modules/auth/auth.module';
import { TrainModule } from './modules/train/train.module';
import { ConfigModule } from '@nestjs/config';
import { StationModule } from './modules/station/station.module';
import { RouteModule } from './modules/route/route.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: Object.values(Entities),
      logging: false,
    }),
    GlobalModule,
    AuthModule,
    UserModule,
    TrainModule,
    StationModule,
    RouteModule,
  ],
})
export class AppModule { }
