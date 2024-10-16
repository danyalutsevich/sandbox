import { Module } from '@nestjs/common';
import { CqrsModule as CQRSModule } from '@nestjs/cqrs';
import { CqrsController } from './cqrs.controller';
import { CqrsService } from './cqrs.service';
import { CqrsHandler } from './cqrs.handler';

@Module({
  imports: [CQRSModule],
  controllers: [CqrsController],
  providers: [CqrsService, CqrsHandler],
})
export class CqrsModule {}
