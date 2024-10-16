import { IEmployee, ITask, ITaskEstimation } from '../../../plugins/contracts';
import { TenantOrganizationBaseEntity } from './../../core/entities/internal';
export declare class TaskEstimation extends TenantOrganizationBaseEntity implements ITaskEstimation {
    estimate: number;
    employeeId: IEmployee['id'];
    taskId: ITask['id'];
    employee?: IEmployee;
    task?: ITask;
}
