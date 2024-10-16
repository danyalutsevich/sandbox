import { All, Controller, Get, Next, Req, Res } from '@nestjs/common';
import { NextFunction } from 'express';
import { BetterAuthService } from './better-auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('better-auth')
@Controller('api/auth/')
export class BetterAuthController {
  constructor(public readonly auth: BetterAuthService) {}

  @All('*')
  async handleAuth(
    @Next() next: NextFunction,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    if (!this.auth.betterAuth) {
      throw new Error('BetterAuth is not ready');
    }

    const { toNodeHandler } = await import('better-auth/node');

    try {
      const authHandler: any = toNodeHandler(
        this.auth.betterAuth as any,
      ) as any;

      return await authHandler(req, res, next);
    } catch (error) {
      console.error('Error in handleAuth:', error);
      throw new Error('Authentication handler failed');
    }
  }
}
