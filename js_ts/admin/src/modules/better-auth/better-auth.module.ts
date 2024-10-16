import { Module } from '@nestjs/common';
import { BetterAuthService } from './better-auth.service';
import { BetterAuthController } from './better-auth.controller';

@Module({
  imports: [],
  controllers: [BetterAuthController],
  providers: [BetterAuthService],
  exports: [BetterAuthService],
})
export class BetterAuthModule {}
