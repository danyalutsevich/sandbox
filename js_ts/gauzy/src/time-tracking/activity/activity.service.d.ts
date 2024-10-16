import { TenantAwareCrudService } from './../../core/crud';
import { Activity } from './activity.entity';
import { IGetActivitiesInput, IDailyActivity, IBulkActivitiesInput, IActivity } from '../../../plugins/contracts';
import { CommandBus } from '@nestjs/cqrs';
import { TypeOrmActivityRepository } from './repository/type-orm-activity.repository';
import { MikroOrmActivityRepository } from './repository/mikro-orm-activity.repository';
import { TypeOrmEmployeeRepository } from '../../employee/repository/type-orm-employee.repository';
import { MikroOrmEmployeeRepository } from '../../employee/repository/mikro-orm-employee.repository';
import { TypeOrmOrganizationProjectRepository } from '../../organization-project/repository/type-orm-organization-project.repository';
import { MikroOrmOrganizationProjectRepository } from '../../organization-project/repository/mikro-orm-organization-project.repository';
export declare class ActivityService extends TenantAwareCrudService<Activity> {
    private typeOrmEmployeeRepository;
    private typeOrmOrganizationProjectRepository;
    private readonly commandBus;
    constructor(typeOrmActivityRepository: TypeOrmActivityRepository, mikroOrmActivityRepository: MikroOrmActivityRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, mikroOrmEmployeeRepository: MikroOrmEmployeeRepository, typeOrmOrganizationProjectRepository: TypeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository: MikroOrmOrganizationProjectRepository, commandBus: CommandBus);
    getDailyActivities(request: IGetActivitiesInput): Promise<IDailyActivity[]>;
    getDailyActivitiesReport(request: IGetActivitiesInput): Promise<IActivity[]>;
    getActivities(request: IGetActivitiesInput): Promise<IActivity[]>;
    bulkSave(input: IBulkActivitiesInput): Promise<any>;
    private filterQuery;
}
