import { Response } from 'express';
import { ConfigService } from '../../../plugins/config/dist/index';
import { IGithubAppInstallInput } from '../../../plugins/contracts';
export declare class GitHubAuthorizationController {
    private readonly _config;
    constructor(_config: ConfigService);
    /**
     *
     * @param query
     * @param response
     */
    githubIntegrationPostInstallCallback(query: IGithubAppInstallInput, response: Response): Promise<void>;
}
