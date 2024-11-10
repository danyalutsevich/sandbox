import { IIntegrationTenant } from '../../../../plugins/contracts/dist/index';

export class GithubInstallationDeleteCommand {

    constructor(
        public readonly integration: IIntegrationTenant
    ) { }
}
