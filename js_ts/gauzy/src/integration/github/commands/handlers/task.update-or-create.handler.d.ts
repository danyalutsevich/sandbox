import { ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { OrganizationProjectService } from 'organization-project/organization-project.service';
import { IntegrationMapService } from 'integration-map/integration-map.service';
import { GithubRepositoryIssueService } from './../../repository/issue/github-repository-issue.service';
import { GithubSyncService } from '../../github-sync.service';
import { GithubTaskUpdateOrCreateCommand } from '../task.update-or-create.command';
export declare class GithubTaskUpdateOrCreateCommandHandler implements ICommandHandler<GithubTaskUpdateOrCreateCommand> {
    private readonly _commandBus;
    private readonly _githubSyncService;
    private readonly _organizationProjectService;
    private readonly _integrationMapService;
    private readonly _githubRepositoryIssueService;
    constructor(_commandBus: CommandBus, _githubSyncService: GithubSyncService, _organizationProjectService: OrganizationProjectService, _integrationMapService: IntegrationMapService, _githubRepositoryIssueService: GithubRepositoryIssueService);
    /**
     * Command handler for the `GithubTaskUpdateOrCreateCommand`, responsible for processing actions when a task is opened in Gauzy.
     *
     * @param command - The `GithubTaskUpdateOrCreateCommand` containing the task data to be processed.
     */
    execute(command: GithubTaskUpdateOrCreateCommand): Promise<any>;
    /**
     * Determines whether an issue should be synchronized based on project settings.
     *
     * @param project - The project configuration.
     * @param issue - The GitHub issue to be synchronized.
     * @returns A boolean indicating whether the issue should be synchronized.
     */
    private shouldSyncIssue;
    /**
     * Map an array of tags to a simplified structure.
     *
     * @param tags - An array of ITag objects to be mapped.
     * @returns An array of objects with 'name', 'color', and 'description' properties.
     */
    private _mapIssueLabelPayload;
}
