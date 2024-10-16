import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';
import { FeatureFlag, FeatureFlagEnabledGuard, Public } from '../../../common/dist/index';
import { FeatureEnum } from '../../../contracts/dist/index';
import { SocialAuthService } from '../social-auth.service';
import * as requestContextDecorator from '../request-context.decorator';

@Controller()
@FeatureFlag(FeatureEnum.FEATURE_GITHUB_LOGIN)
@Public()
export class GithubController {

	constructor(
		public readonly service: SocialAuthService
	) { }

	/**
	 * Initiates GitHub login.
	 *
	 * @param req
	 */
	@Get('github')
	@UseGuards(FeatureFlagEnabledGuard, AuthGuard('github'))
	githubLogin(@Req() _req: express.Request) {
		// This method is empty because AuthGuard('github') initiates the GitHub login
		// The user will be redirected to the GitHub login page by Passport
	}

	/**
	 * GitHub login callback endpoint.
	 *
	 * @param _req - The context of the incoming request.
	 * @param _res - The response object.
	 * @returns The result of the GitHub login callback.
	 */
	@Get('github/callback')
	@UseGuards(FeatureFlagEnabledGuard, AuthGuard('github'))
	async githubLoginCallback(
		@requestContextDecorator.RequestCtx() _req: requestContextDecorator.IIncomingRequest,
		@Res() _res: express.Response
	) {
		const { user } = _req;

		// To-DO: Determine the frontend URL based on the request

		const { success, authData } = await this.service.validateOAuthLoginEmail(user.emails);
		return this.service.routeRedirect(success, authData, _res);
	}
}
