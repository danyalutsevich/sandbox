import { CommandBus } from '@nestjs/cqrs';
import { HttpService } from '@nestjs/axios';
import { IGithubAppInstallInput, IIntegrationTenant, IOAuthAppInstallInput } from '../../../plugins/contracts';
import { IntegrationService } from 'integration/integration.service';
export declare class GithubService {
    private readonly _http;
    private readonly _commandBus;
    private readonly _integrationService;
    private readonly logger;
    constructor(_http: HttpService, _commandBus: CommandBus, _integrationService: IntegrationService);
    /**
     * Adds a GitHub App installation by validating input data, fetching an access token, and creating integration tenant settings.
     *
     * @param input - The input data for adding a GitHub App installation.
     * @returns A promise that resolves to the access token data.
     * @throws Error if any step of the process fails.
     */
    addGithubAppInstallation(input: IGithubAppInstallInput): Promise<IIntegrationTenant>;
    /**
     * Authorizes a GitHub App installation by validating input data, fetching an access token, and creating integration tenant settings.
     *
     * @param input - The input data required for OAuth authorization.
     * @returns A promise that resolves with the integration tenant data.
     * @throws {HttpException} If input data is invalid or if any step of the process fails.
     */
    oAuthEndpointAuthorization(input: IOAuthAppInstallInput): Promise<IIntegrationTenant>;
}
