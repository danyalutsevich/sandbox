import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult } from 'typeorm';
import { ITask, IPagination, IEmployee, IOrganizationTeam } from '../../plugins/contracts/dist/index';
import { CountQueryDTO } from './../shared/dto';
import { CrudController, PaginationParams } from './../core/crud';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { CreateTaskDTO, GetTaskByIdDTO, TaskMaxNumberQueryDTO, UpdateTaskDTO } from './dto';
export declare class TaskController extends CrudController<Task> {
    private readonly taskService;
    private readonly commandBus;
    constructor(taskService: TaskService, commandBus: CommandBus);
    /**
     * GET task count
     *
     * @param options
     * @returns
     */
    getCount(options: CountQueryDTO<Task>): Promise<number>;
    /**
     * GET tasks by pagination
     *
     * @param params
     * @returns
     */
    pagination(params: PaginationParams<Task>): Promise<IPagination<ITask>>;
    /**
     * GET maximum task number
     *
     * @param options
     * @returns
     */
    getMaxTaskNumberByProject(options: TaskMaxNumberQueryDTO): Promise<number>;
    /**
     * GET my tasks
     *
     * @param params
     * @returns
     */
    findMyTasks(params: PaginationParams<Task>): Promise<IPagination<ITask>>;
    /**
     * GET employee tasks
     *
     * @param params
     * @returns
     */
    findEmployeeTask(params: PaginationParams<Task>): Promise<IPagination<ITask>>;
    /**
     * GET my team tasks
     *
     * @param params
     * @returns
     */
    findTeamTasks(params: PaginationParams<Task>): Promise<IPagination<ITask>>;
    findById(id: Task['id'], params: GetTaskByIdDTO): Promise<Task>;
    /**
     * GET tasks by employee
     *
     * @param employeeId
     * @param findInput
     * @returns
     */
    getAllTasksByEmployee(employeeId: IEmployee['id'], params: PaginationParams<Task>): Promise<ITask[]>;
    findAll(params: PaginationParams<Task>): Promise<IPagination<ITask>>;
    create(entity: CreateTaskDTO): Promise<ITask>;
    update(id: ITask['id'], entity: UpdateTaskDTO): Promise<ITask>;
    delete(id: ITask['id']): Promise<DeleteResult>;
    deleteEmployeeFromTasks(employeeId: IEmployee['id'], organizationTeamId: IOrganizationTeam['id']): Promise<void>;
}
