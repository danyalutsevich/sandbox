import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FeatureFlagEnabledGuard, FeatureFlag, Public } from '../../../common/dist/index';
import { FeatureEnum } from '../../../contracts/dist/index';
import { SocialAuthService } from '../social-auth.service';
import * as requestContextDecorator from '../request-context.decorator';

@Controller()
@UseGuards(FeatureFlagEnabledGuard, AuthGuard('microsoft'))
@FeatureFlag(FeatureEnum.FEATURE_MICROSOFT_LOGIN)
@Public()
export class MicrosoftController {

	constructor(
		public readonly service: SocialAuthService
	) { }

	/**
	 * Initiates Microsoft login.
	 *
	 * @param req
	 */
	@Get('microsoft')
	microsoftLogin(@Req() req: any) { }

	/**
	 * Microsoft login callback endpoint.
	 *
	 * @param requestCtx - The context of the incoming request.
	 * @param res - The response object.
	 * @returns The result of the Microsoft login callback.
	 */
	@Get('microsoft/callback')
	async microsoftLoginCallback(
		@requestContextDecorator.RequestCtx() requestCtx: requestContextDecorator.IIncomingRequest,
		@Res() res
	) {
		const { user } = requestCtx;
		const { success, authData } = await this.service.validateOAuthLoginEmail(user.emails);
		return this.service.routeRedirect(success, authData, res);
	}
}
