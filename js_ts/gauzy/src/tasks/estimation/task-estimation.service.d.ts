import { TaskEstimation } from './task-estimation.entity';
import { TenantAwareCrudService } from '../../core/crud';
import { TypeOrmTaskEstimationRepository } from './repository/type-orm-estimation.repository';
import { MikroOrmTaskEstimationRepository } from './repository/mikro-orm-estimation.repository';
export declare class TaskEstimationService extends TenantAwareCrudService<TaskEstimation> {
    constructor(typeOrmTaskEstimationRepository: TypeOrmTaskEstimationRepository, mikroOrmTaskEstimationRepository: MikroOrmTaskEstimationRepository);
}
