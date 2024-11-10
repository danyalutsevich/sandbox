import { ICommand } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';
import { IntegrationTenant } from './../integration-tenant.entity';
export declare class IntegrationTenantGetCommand implements ICommand {
    readonly input: FindOneOptions<IntegrationTenant>;
    static readonly type = "[Integration] Get Integration";
    constructor(input: FindOneOptions<IntegrationTenant>);
}
