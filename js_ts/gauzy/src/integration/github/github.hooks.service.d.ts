import { CommandBus } from '@nestjs/cqrs';
import { Context } from 'probot';
import { GithubSyncService } from './github-sync.service';
export declare class GithubHooksService {
    private readonly _commandBus;
    private readonly _githubSyncService;
    private readonly logger;
    constructor(_commandBus: CommandBus, _githubSyncService: GithubSyncService);
    /**
     * Handles the 'installation.deleted' event by deleting a GitHub installation,
     * its associated repositories, and the integration setting.
     *
     * @param context - The context object containing event information.
     */
    installationDeleted(context: Context): Promise<any[]>;
    /**
     * Handles the 'issues.opened' event from GitHub, syncs automation issues and labels.
     *
     * @param context - The GitHub webhook event context.
     */
    issuesOpened(context: Context): Promise<void>;
    /**
     * Handles the 'issues.edited' event from GitHub, syncs automation issues and labels.
     *
     * @param context - The GitHub webhook event context.
     */
    issuesEdited(context: Context): Promise<void>;
    /**
     * Handles the 'issuesLabeled' event from GitHub.
     *
     * @param context - The GitHub webhook event context.
     */
    issuesLabeled(context: Context): Promise<void>;
    /**
     * Handles the 'issuesUnlabeled' event from GitHub.
     *
     * @param context - The GitHub webhook event context.
     */
    issuesUnlabeled(context: Context): Promise<void>;
    /**
     * Synchronizes automation issues for a GitHub installation.
     *
     * @param param0 - An object containing installation, issue, and repository information.
     */
    private syncAutomationIssue;
    /**
     * Retrieves integration settings associated with a specific GitHub installation.
     *
     * @param installation - The GitHub installation for which to retrieve settings.
     * @returns A promise that resolves to the integration setting or rejects with an error.
     */
    private getInstallationSetting;
}
