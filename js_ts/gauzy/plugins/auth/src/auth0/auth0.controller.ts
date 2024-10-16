import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from '../../../common';
import { SocialAuthService } from '../social-auth.service';
import * as requestContextDecorator from '../request-context.decorator';
import type { Response } from 'express';
@Controller('auth0')
@Public()
export class Auth0Controller {
	constructor(public readonly service: SocialAuthService) {}

	@Get('')
	@UseGuards(AuthGuard('auth0'))
	auth0Login(@Req() req: any) {}

	@Get('callback')
	@UseGuards(AuthGuard('auth0'))
	async auth0LoginCallback(
		@requestContextDecorator.RequestCtx() requestCtx: requestContextDecorator.IIncomingRequest,
		@Res() res:Response
	) {
		const { user } = requestCtx;
		const {
			success,
			authData
		} = await this.service.validateOAuthLoginEmail(user.emails);
		return this.service.routeRedirect(success, authData, res);
	}
}
