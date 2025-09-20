import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as Entities from '@utils/entities';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature(Object.values(Entities)),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  exports: [TypeOrmModule, JwtModule],
})
export class GlobalModule {}
