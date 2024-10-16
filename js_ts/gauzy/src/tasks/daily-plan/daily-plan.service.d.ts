import { UpdateResult } from 'typeorm';
import { IDailyPlan, IDailyPlanCreateInput, IDailyPlanTasksUpdateInput, IDailyPlanUpdateInput, IEmployee, IPagination, ITask } from '../../../plugins/contracts';
import { PaginationParams, TenantAwareCrudService } from '../../core/crud';
import { EmployeeService } from '../../employee/employee.service';
import { TaskService } from '../task.service';
import { MikroOrmDailyPlanRepository, TypeOrmDailyPlanRepository } from './repository';
import { DailyPlan } from './daily-plan.entity';
export declare class DailyPlanService extends TenantAwareCrudService<DailyPlan> {
    readonly typeOrmDailyPlanRepository: TypeOrmDailyPlanRepository;
    readonly mikroOrmDailyPlanRepository: MikroOrmDailyPlanRepository;
    private readonly employeeService;
    private readonly taskService;
    constructor(typeOrmDailyPlanRepository: TypeOrmDailyPlanRepository, mikroOrmDailyPlanRepository: MikroOrmDailyPlanRepository, employeeService: EmployeeService, taskService: TaskService);
    /**
     * Create or update a DailyPlan. If the given day already has a DailyPlan,
     * update it with the provided task. Otherwise, create a new DailyPlan.
     *
     * @param partialEntity - Data to create or update the DailyPlan
     * @returns The created or updated DailyPlan
     */
    createDailyPlan(partialEntity: IDailyPlanCreateInput): Promise<IDailyPlan>;
    /**
     * Retrieves daily plans with pagination and additional query options.
     *
     * @param options - Pagination and additional query options for filtering and retrieving daily plans.
     * @returns A promise that resolves to an object containing the list of daily plans and the total count.
     * @throws BadRequestException - If there's an error during the query.
     */
    getAllPlans(options: PaginationParams<DailyPlan>, employeeId?: IEmployee['id']): Promise<IPagination<IDailyPlan>>;
    /**
     * Retrieves daily plans for a specific employee with pagination and additional query options.
     *
     * @param employeeId - The ID of the employee for whom to retrieve daily plans.
     * @param options - Pagination and additional query options for filtering and retrieving daily plans.
     * @returns A promise that resolves to an object containing the list of daily plans and the total count.
     * @throws BadRequestException - If there's an error during the query.
     */
    getDailyPlansByEmployee(options: PaginationParams, employeeId?: IEmployee['id']): Promise<IPagination<IDailyPlan>>;
    /**
     * Retrieves daily plans for the current employee based on given pagination options.
     *
     * @param options Pagination options for fetching daily plans.
     * @returns A promise resolving to daily plans for the current employee.
     */
    getMyPlans(options: PaginationParams<DailyPlan>): Promise<IPagination<IDailyPlan>>;
    /**
     * Add a task to a specified daily plan.
     *
     * @param planId - The unique identifier of the daily plan to which the task will be added.
     * @param input - An object containing details about the task to add, including task ID, employee ID, and organization ID.
     * @returns The updated daily plan with the newly added task.
     */
    addTaskToPlan(planId: IDailyPlan['id'], input: IDailyPlanTasksUpdateInput): Promise<IDailyPlan>;
    /**
     * Delete task from a given daily plan
     *
     * @param  planId The unique identifier of the daily plan to which the task will be removed.
     * @param input - An object containing details about the task to remove, including task ID, employee ID, and organization ID.
     * @returns The updated daily plan without the deleted task.
     */
    removeTaskFromPlan(planId: IDailyPlan['id'], input: IDailyPlanTasksUpdateInput): Promise<IDailyPlan>;
    /**
     * UPDATE Daily plan
     *
     * @param id - The unique identifier of the daily plan to be updated.
     * @param partialEntity - An object with data to update, including organization ID and employee ID.
     * @returns The updated daily plan including related tasks.
     * @memberof DailyPlanService
     */
    updateDailyPlan(id: IDailyPlan['id'], partialEntity: IDailyPlanUpdateInput): Promise<IDailyPlan | UpdateResult>;
    /**
     * DELETE daily plan
     *
     * @param {IDailyPlan['id']} planId
     * @returns
     * @memberof DailyPlanService
     */
    deletePlan(planId: IDailyPlan['id']): Promise<import("typeorm").DeleteResult>;
    /**
     * Retrieves daily plans for a specific task including employee
     * @param options pagination and additional query options
     * @param taskId - The ID of the task for whom to retrieve daily plans.
     * @returns A promise that resolves to an object containing the list of plans and total count
     */
    getDailyPlansByTask(options: PaginationParams, taskId: ITask['id']): Promise<IPagination<IDailyPlan>>;
}
