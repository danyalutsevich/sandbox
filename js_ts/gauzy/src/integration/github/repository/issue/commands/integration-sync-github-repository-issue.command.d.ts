import { ICommand } from '@nestjs/cqrs';
import { IGithubIssue, IIntegrationMapSyncBase, IOrganizationGithubRepository } from '../../../../../../plugins/contracts/dist/index';
export declare class IntegrationSyncGithubRepositoryIssueCommand implements ICommand {
    readonly input: IIntegrationMapSyncBase;
    readonly repositoryId: IOrganizationGithubRepository['repositoryId'];
    readonly issue: IGithubIssue;
    static readonly type = "[Integration] Sync Github Repository Issue";
    constructor(input: IIntegrationMapSyncBase, repositoryId: IOrganizationGithubRepository['repositoryId'], issue: IGithubIssue);
}
