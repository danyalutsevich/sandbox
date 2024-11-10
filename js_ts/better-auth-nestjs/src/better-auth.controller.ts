import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { NextFunction } from 'express';
import { BetterAuthService } from './better-auth.service.js';
import { toNestJsController } from './lib/auth.js';

@Controller('/api/auth')
export class BetterAuthController {
  constructor(private readonly authService: BetterAuthService) {}

  @All('*')
  async handleAuth(
    @Req() request: Request,
    @Res() response: Response,
    @Next() next: NextFunction,
  ) {
    try {
      return await toNestJsController(this.authService, request, response);
    } catch (error) {
      next(error);
    }
  }
}
