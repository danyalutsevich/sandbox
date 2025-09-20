import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';

@Module({
  imports: [],
  controllers: [TrainController],
  providers: [TrainService],
  exports: [TrainService],
})
export class TrainModule { }
