import { GithubService } from './github.service';
import { GithubAppInstallDTO, GithubOAuthDTO } from './dto';
export declare class GitHubController {
    private readonly _githubService;
    constructor(_githubService: GithubService);
    /**
     *
     * @param body
     * @returns
     */
    addGithubAppInstallation(input: GithubAppInstallDTO): Promise<import("../../../plugins/contracts").IIntegrationTenant>;
    /**
     *
     * @param body
     * @returns
     */
    oAuthEndpointAuthorization(input: GithubOAuthDTO): Promise<import("../../../plugins/contracts").IIntegrationTenant>;
}
