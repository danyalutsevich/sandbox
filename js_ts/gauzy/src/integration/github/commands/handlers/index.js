"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const github_installation_delete_handler_1 = require("./github-installation.delete.handler");
const task_update_or_create_handler_1 = require("./task.update-or-create.handler");
const integration_sync_github_repository_handler_1 = require("./integration-sync-github-repository.handler");
const handlers_1 = require("./../../repository/issue/commands/handlers");
exports.CommandHandlers = [
    github_installation_delete_handler_1.GithubInstallationDeleteCommandHandler,
    task_update_or_create_handler_1.GithubTaskUpdateOrCreateCommandHandler,
    integration_sync_github_repository_handler_1.IntegrationSyncGithubRepositoryCommandHandler,
    handlers_1.IntegrationSyncGithubRepositoryIssueCommandHandler,
];
//# sourceMappingURL=index.js.map