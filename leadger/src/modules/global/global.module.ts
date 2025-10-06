import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { JwtModule } from '@nestjs/jwt';
import * as Entities from '../../utils/entities';
import { SeederService } from './seeder.service';
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
  providers: [SeederService],
  exports: [TypeOrmModule, JwtModule],
})
export class GlobalModule {}
