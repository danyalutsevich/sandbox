import { ICommandHandler } from "@nestjs/cqrs";
import { OctokitService } from '../../../../../plugins/plugins/integration-github/dist/index';
import { GithubInstallationDeleteCommand } from "../github-installation.delete.command";
export declare class GithubInstallationDeleteCommandHandler implements ICommandHandler<GithubInstallationDeleteCommand> {
    private readonly _octokitService;
    constructor(_octokitService: OctokitService);
    /**
     * Execute the GitHub installation deletion command.
     * @param command - The GithubInstallationDeleteCommand instance.
     */
    execute(command: GithubInstallationDeleteCommand): Promise<import("../../../../../plugins/plugins/integration-github/dist/octokit.service").OctokitResponse<any>>;
}
