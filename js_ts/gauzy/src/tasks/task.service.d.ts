import { IEmployee, IGetTaskOptions, IPagination, ITask } from '../../plugins/contracts/dist/index';
import { PaginationParams, TenantAwareCrudService } from './../core/crud';
import { Task } from './task.entity';
import { GetTaskByIdDTO } from './dto';
import { TypeOrmTaskRepository } from './repository/type-orm-task.repository';
import { MikroOrmTaskRepository } from './repository/mikro-orm-task.repository';
export declare class TaskService extends TenantAwareCrudService<Task> {
    readonly typeOrmTaskRepository: TypeOrmTaskRepository;
    readonly mikroOrmTaskRepository: MikroOrmTaskRepository;
    constructor(typeOrmTaskRepository: TypeOrmTaskRepository, mikroOrmTaskRepository: MikroOrmTaskRepository);
    /**
     *
     * @param id
     * @param relations
     * @returns
     */
    findById(id: ITask['id'], params: GetTaskByIdDTO): Promise<ITask>;
    findParentUntilEpic(issueId: string): Promise<Task>;
    /**
     * GET my tasks
     *
     * @param options
     * @returns
     */
    getMyTasks(options: PaginationParams<Task>): Promise<{
        items: Task[];
        total: number;
    }>;
    /**
     * Find employee tasks
     *
     * @param options
     * @returns
     */
    getEmployeeTasks(options: PaginationParams<Task>): Promise<{
        items: Task[];
        total: number;
    }>;
    /**
     * GET all tasks by employee
     *
     * @param employeeId
     * @param filter
     * @returns
     */
    getAllTasksByEmployee(employeeId: IEmployee['id'], options: PaginationParams<Task>): Promise<Task[]>;
    /**
     * GET team tasks
     *
     * @param options
     * @returns
     */
    findTeamTasks(options: PaginationParams<Task>): Promise<IPagination<ITask>>;
    /**
     * GET tasks by pagination
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<Task>): Promise<IPagination<ITask>>;
    /**
     * GET maximum task number by project filter
     *
     * @param options
     */
    getMaxTaskNumberByProject(options: IGetTaskOptions): Promise<any>;
    /**
     * Unassign employee from team task
     * @param employeeId
     * @param organizationTeamId
     */
    unassignEmployeeFromTeamTasks(employeeId: string, organizationTeamId?: string): Promise<void>;
}
