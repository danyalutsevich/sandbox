import { ICommandHandler } from '@nestjs/cqrs';
import { IIntegrationType } from '../../../../plugins/contracts/dist/index';
import { IntegrationTypeGetCommand } from '../integration-type.get.command';
import { TypeOrmIntegrationTypeRepository } from '../../repository/type-orm-integration-type.repository';
export declare class IntegrationTypeGetHandler implements ICommandHandler<IntegrationTypeGetCommand> {
    readonly typeOrmIntegrationTypeRepository: TypeOrmIntegrationTypeRepository;
    constructor(typeOrmIntegrationTypeRepository: TypeOrmIntegrationTypeRepository);
    /**
     *
     * @param command
     * @returns
     */
    execute(command: IntegrationTypeGetCommand): Promise<IIntegrationType[]>;
}
