import { ICommandHandler } from '@nestjs/cqrs';
import { IActivity } from '../../../../../plugins/contracts/dist/index';
import { BulkActivitiesSaveCommand } from '../bulk-activities-save.command';
import { TypeOrmActivityRepository } from '../../repository/type-orm-activity.repository';
import { TypeOrmEmployeeRepository } from '../../../../employee/repository/type-orm-employee.repository';
export declare class BulkActivitiesSaveHandler implements ICommandHandler<BulkActivitiesSaveCommand> {
    private readonly typeOrmActivityRepository;
    private readonly typeOrmEmployeeRepository;
    constructor(typeOrmActivityRepository: TypeOrmActivityRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository);
    /**
     *
     * @param command
     * @returns
     */
    execute(command: BulkActivitiesSaveCommand): Promise<IActivity[]>;
}
