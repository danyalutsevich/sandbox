import { ICommandHandler } from '@nestjs/cqrs';
import { IIntegration } from '../../../../plugins/contracts/dist/index';
import { IntegrationGetCommand } from './../integration.get.command';
import { TypeOrmIntegrationRepository } from '../../repository/type-orm-integration.repository';
export declare class IntegrationGetHandler implements ICommandHandler<IntegrationGetCommand> {
    private readonly typeOrmIntegrationRepository;
    constructor(typeOrmIntegrationRepository: TypeOrmIntegrationRepository);
    /**
     *
     * @param command
     * @returns
     */
    execute(command: IntegrationGetCommand): Promise<IIntegration[]>;
}
