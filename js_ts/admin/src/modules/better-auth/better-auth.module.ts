import { Module } from '@nestjs/common';
import { BetterAuthService } from './better-auth.service';
import { BetterAuthController } from './better-auth.controller';
import { BetterAuthInterceptor } from './better-auth.interceptor';

@Module({
  imports: [],
  controllers: [BetterAuthController],
  providers: [BetterAuthService, BetterAuthInterceptor],
  exports: [BetterAuthService],
})
export class BetterAuthModule {}
