import { Request } from 'express';
import { IIntegrationTenant } from '../../../plugins/contracts';
import { GithubSyncService } from './github-sync.service';
import { ProcessGithubIssueSyncDTO } from './dto';
export declare class GitHubSyncController {
    private readonly _githubSyncService;
    private readonly logger;
    constructor(_githubSyncService: GithubSyncService);
    /**
     * Handle an HTTP POST request to manually synchronize GitHub issues and labels.
     *
     * @param body - The request body containing data for synchronization.
     * @returns An HTTP response with the result of the synchronization.
     */
    syncGithubIssuesAndLabels(integrationId: IIntegrationTenant['id'], request: Request, input: ProcessGithubIssueSyncDTO): Promise<boolean>;
    /**
     * Handle an HTTP POST request to automatically synchronize GitHub issues.
     *
     * @param body - The request body containing data for synchronization.
     * @returns An HTTP response with the result of the synchronization.
     */
    autoSyncGithubIssues(integrationId: IIntegrationTenant['id'], request: Request, input: ProcessGithubIssueSyncDTO): Promise<boolean>;
}
