import { ICommand } from '@nestjs/cqrs';
import { IOrganizationCreateInput } from '../../../plugins/contracts';
export declare class GauzyCloudOrganizationMigrateCommand implements ICommand {
    readonly input: IOrganizationCreateInput;
    readonly token: string;
    static readonly type = "[Gauzy Cloud] Organization Migrate";
    constructor(input: IOrganizationCreateInput, token: string);
}
