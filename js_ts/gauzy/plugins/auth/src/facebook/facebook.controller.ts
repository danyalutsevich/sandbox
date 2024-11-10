import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeatureFlagEnabledGuard, FeatureFlag, Public } from '../../../common/dist/index';
import { FeatureEnum } from '../../../contracts/dist/index';
import { SocialAuthService } from '../social-auth.service';
import * as requestContextDecorator from '../request-context.decorator';

@Controller()
@UseGuards(FeatureFlagEnabledGuard, AuthGuard('facebook'))
@FeatureFlag(FeatureEnum.FEATURE_FACEBOOK_LOGIN)
@Public()
export class FacebookController {

	constructor(
		public readonly service: SocialAuthService
	) { }

	/**
	 * Initiates Facebook login.
	 *
	 * @param req
	 */
	@Get('facebook')
	facebookLogin(@Req() req: any) { }

	/**
	 * Facebook login callback endpoint.
	 *
	 * @param requestCtx - The context of the incoming request.
	 * @param res - The response object.
	 * @returns The result of the Facebook login callback.
	 */
	@Get('facebook/callback')
	async facebookLoginCallback(
		@requestContextDecorator.RequestCtx() requestCtx: requestContextDecorator.IIncomingRequest,
		@Res() res
	) {
		const { user } = requestCtx;
		const { success, authData } = await this.service.validateOAuthLoginEmail(user.emails);
		return this.service.routeRedirect(success, authData, res);
	}
}
