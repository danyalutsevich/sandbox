import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeatureFlagEnabledGuard, FeatureFlag, Public } from '../../../common';
import { FeatureEnum } from '../../../contracts';
import { SocialAuthService } from '../social-auth.service';
import * as requestContextDecorator from '../request-context.decorator';

@Controller()
@UseGuards(FeatureFlagEnabledGuard, AuthGuard('twitter'))
@FeatureFlag(FeatureEnum.FEATURE_TWITTER_LOGIN)
@Public()
export class TwitterController {

	constructor(
		public readonly service: SocialAuthService
	) { }

	/**
	 * Initiates Twitter login.
	 *
	 * @param req
	 */
	@Get('twitter')
	twitterLogin(@Req() req: any) { }

	/**
	 * Twitter login callback endpoint.
	 *
	 * @param requestCtx - The context of the incoming request.
	 * @param res - The response object.
	 * @returns The result of the Twitter login callback.
	 */
	@Get('twitter/callback')
	async twitterLoginCallback(
		@requestContextDecorator.RequestCtx() requestCtx: requestContextDecorator.IIncomingRequest,
		@Res() res: any
	) {
		const { user } = requestCtx;
		const { success, authData } = await this.service.validateOAuthLoginEmail(user.emails);
		return this.service.routeRedirect(success, authData, res);
	}
}
