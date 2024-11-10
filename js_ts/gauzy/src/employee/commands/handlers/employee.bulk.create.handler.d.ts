import { CommandBus, ICommandHandler } from '@nestjs/cqrs';
import { IEmployee } from '../../../../plugins/contracts/dist/index';
import { EmployeeBulkCreateCommand } from '../employee.bulk.create.command';
export declare class EmployeeBulkCreateHandler implements ICommandHandler<EmployeeBulkCreateCommand> {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    execute(command: EmployeeBulkCreateCommand): Promise<IEmployee[]>;
}
