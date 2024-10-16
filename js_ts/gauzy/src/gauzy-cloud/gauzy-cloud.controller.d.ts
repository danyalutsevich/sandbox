import { CommandBus } from '@nestjs/cqrs';
import { IOrganizationCreateInput, ITenantCreateInput, IUserRegistrationInput } from '../../plugins/contracts/dist/index';
export declare class GauzyCloudController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    migrateUserToGauzyCloud(body: IUserRegistrationInput): Promise<any>;
    migrateTenantToGauzyCloud(body: ITenantCreateInput, token: string): Promise<any>;
    migrateOrganizationToGauzyCloud(body: IOrganizationCreateInput, token: string): Promise<any>;
}
