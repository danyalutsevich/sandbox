import { Global, Module } from '@nestjs/common';
import * as Entities from '../../db/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Entities)),
    JwtModule.register({
      global: true,
      secret: 'abcdefg',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [],
  exports: [TypeOrmModule],
  providers: [],
})
export class GlobalModule {}
