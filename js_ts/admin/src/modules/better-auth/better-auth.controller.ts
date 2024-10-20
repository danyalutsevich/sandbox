import {
  All,
  Controller,
  Get,
  Next,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { BetterAuthService } from './better-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { BetterAuthInterceptor } from './better-auth.interceptor';

@ApiTags('better-auth')
@Controller('api/auth/')
@UseInterceptors(BetterAuthInterceptor)
export class BetterAuthController {
  constructor(public readonly auth: BetterAuthService) {}

  @All('*')
  async handleAuth(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    if (!this.auth.betterAuth) {
      throw new Error('BetterAuth is not ready');
    }
    const { toNodeHandler } = await import('better-auth/node');

    try {
      const authHandler = toNodeHandler(this.auth.betterAuth);
      return await authHandler(req as any, res as any);
    } catch (error) {
      console.error('Error in handleAuth:', error);
      throw new Error('Authentication handler failed');
    }
  }
}
