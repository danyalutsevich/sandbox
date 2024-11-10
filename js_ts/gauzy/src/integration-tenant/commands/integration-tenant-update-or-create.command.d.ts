import { ICommand } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';
import { IIntegrationTenant } from '../../../plugins/contracts';
import { IntegrationTenant } from '../integration-tenant.entity';
export declare class IntegrationTenantUpdateOrCreateCommand implements ICommand {
    readonly options: FindOptionsWhere<IntegrationTenant>;
    readonly input: IIntegrationTenant;
    static readonly type = "[Integration Tenant] Update Or Create";
    constructor(options: FindOptionsWhere<IntegrationTenant>, input: IIntegrationTenant);
}
