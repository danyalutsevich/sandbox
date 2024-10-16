import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateResult } from 'typeorm';
import { IEmployee } from '../../../../plugins/contracts/dist/index';
import { GauzyAIService } from '../../../../plugins/plugins/integration-ai/dist/index';
import { EmployeeService } from '../../employee.service';
import { UpdateEmployeeJobSearchStatusCommand } from '../update-employee-job-search-status.command';
export declare class UpdateEmployeeJobSearchStatusHandler implements ICommandHandler<UpdateEmployeeJobSearchStatusCommand> {
    private readonly employeeService;
    private readonly gauzyAIService;
    constructor(employeeService: EmployeeService, gauzyAIService: GauzyAIService);
    execute(command: UpdateEmployeeJobSearchStatusCommand): Promise<IEmployee | UpdateResult>;
}
