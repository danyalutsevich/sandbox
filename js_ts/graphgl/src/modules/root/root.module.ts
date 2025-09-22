import { Module } from '@nestjs/common';
import { RootResolver } from './root.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [RootResolver],
  exports: [RootResolver],
})
export class RootModule { }
