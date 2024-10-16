import { ICommand } from '@nestjs/cqrs';
import { IIntegrationMapSyncRepository } from '../../../../plugins/contracts/dist/index';

export class IntegrationSyncGithubRepositoryCommand implements ICommand {
	static readonly type = '[Integration] Sync Github Repository';

	constructor(
		public readonly input: IIntegrationMapSyncRepository
	) { }
}
