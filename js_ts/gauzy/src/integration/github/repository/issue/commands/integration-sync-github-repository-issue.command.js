"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationSyncGithubRepositoryIssueCommand = void 0;
class IntegrationSyncGithubRepositoryIssueCommand {
    input;
    repositoryId;
    issue;
    static type = '[Integration] Sync Github Repository Issue';
    constructor(input, repositoryId, issue) {
        this.input = input;
        this.repositoryId = repositoryId;
        this.issue = issue;
    }
}
exports.IntegrationSyncGithubRepositoryIssueCommand = IntegrationSyncGithubRepositoryIssueCommand;
//# sourceMappingURL=integration-sync-github-repository-issue.command.js.map