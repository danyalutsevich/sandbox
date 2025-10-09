import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';
import * as Entities from '../../utils/entities';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Entities)),
    JwtModule.register({
      global: true,
      secret: 'dev-secret',
      signOptions: { expiresIn: '7d', algorithm: 'HS256' },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule, JwtModule],
})
export class GlobalModule {}
