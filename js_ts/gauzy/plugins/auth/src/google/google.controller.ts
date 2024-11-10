import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeatureFlagEnabledGuard, FeatureFlag, Public } from '../../../common/dist/index';
import { SocialAuthService } from '../social-auth.service';
import * as requestContextDecorator from '../request-context.decorator';
import { FeatureEnum } from'../../../contracts/dist/index';

@Controller()
@UseGuards(FeatureFlagEnabledGuard, AuthGuard('google'))
@FeatureFlag(FeatureEnum.FEATURE_GOOGLE_LOGIN)
@Public()
export class GoogleController {
	constructor(public readonly service: SocialAuthService) { }

	/**
	 * Initiates Google login.
	 *
	 * @param req
	 */
	@Get('google')
	googleLogin(@Req() req: any) { }

	/**
	 * Google login callback endpoint.
	 *
	 * @param requestCtx - The context of the incoming request.
	 * @param res - The response object.
	 * @returns The result of the Google login callback.
	 */
	@Get('google/callback')
	async googleLoginCallback(
		@requestContextDecorator.RequestCtx() requestCtx: requestContextDecorator.IIncomingRequest,
		@Res() res
	) {
		const { user } = requestCtx;
		const { success, authData } = await this.service.validateOAuthLoginEmail(user.emails);
		return this.service.routeRedirect(success, authData, res);
	}
}
