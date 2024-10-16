import { ICommandHandler } from '@nestjs/cqrs';
import { UpdateEmployeeTotalWorkedHoursCommand } from '../update-employee-total-worked-hours.command';
import { EmployeeService } from '../../employee.service';
import { TypeOrmTimeLogRepository } from '../../../time-tracking/time-log/repository/type-orm-time-log.repository';
import { MikroOrmTimeLogRepository } from '../../../time-tracking/time-log/repository/mikro-orm-time-log.repository';
export declare class UpdateEmployeeTotalWorkedHoursHandler implements ICommandHandler<UpdateEmployeeTotalWorkedHoursCommand> {
    private readonly employeeService;
    readonly typeOrmTimeLogRepository: TypeOrmTimeLogRepository;
    readonly mikroOrmTimeLogRepository: MikroOrmTimeLogRepository;
    constructor(employeeService: EmployeeService, typeOrmTimeLogRepository: TypeOrmTimeLogRepository, mikroOrmTimeLogRepository: MikroOrmTimeLogRepository);
    /**
     *
     * @param command
     */
    execute(command: UpdateEmployeeTotalWorkedHoursCommand): Promise<void>;
    /**
     * Get the database-specific sum query for calculating time duration between "startedAt" and "stoppedAt".
     * @returns The database-specific sum query.
     */
    private getSumQuery;
}
