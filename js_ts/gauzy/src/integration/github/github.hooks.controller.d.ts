import { Context } from 'probot';
import { GithubHooksService } from './github.hooks.service';
export declare class GitHubHooksController {
    private readonly _githubHooksService;
    constructor(_githubHooksService: GithubHooksService);
    /**
     * Handles the 'installation.deleted' event.
     *
     * @param context - The context object containing information about the event.
     */
    installationDeleted(context: Context): Promise<void>;
    /**
     * Handles the 'issues.opened' event.
     *
     * @param context - The context object containing information about the event.
     */
    issuesOpened(context: Context): Promise<void>;
    /**
     * Handles the 'issues.edited' event.
     *
     * @param context - The context object containing information about the event.
     */
    issuesEdited(context: Context): Promise<void>;
    /**
     * Handles the 'issues.labeled' event.
     *
     * @param context - The context object containing information about the event.
     */
    issuesLabeled(context: Context): Promise<void>;
    /**
     * Handles the 'issues.labeled' event.
     *
     * @param context - The context object containing information about the event.
     */
    issuesUnlabeled(context: Context): Promise<void>;
}
