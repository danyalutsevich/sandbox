import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { ServiceEntity } from 'src/db/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  controllers: [ServiceController],
  exports: [ServiceService],
  providers: [ServiceService],
})
export class ServiceModule {}
