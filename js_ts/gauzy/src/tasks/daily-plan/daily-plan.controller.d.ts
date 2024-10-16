import { UpdateResult } from 'typeorm';
import { IDailyPlan, IDailyPlanTasksUpdateInput, IEmployee, IPagination, ITask } from '../../../plugins/contracts';
import { CrudController, PaginationParams } from '../../core/crud';
import { DailyPlan } from './daily-plan.entity';
import { DailyPlanService } from './daily-plan.service';
import { CreateDailyPlanDTO, UpdateDailyPlanDTO } from './dto';
export declare class DailyPlanController extends CrudController<DailyPlan> {
    private readonly dailyPlanService;
    constructor(dailyPlanService: DailyPlanService);
    /**
     * GET my daily plans
     *
     * @param options
     * @returns
     */
    getMyPlans(params: PaginationParams<DailyPlan>): Promise<IPagination<IDailyPlan>>;
    /**
     * GET daily plans for a given employee
     *
     * @param options
     * @param employeeId
     * @returns
     */
    getEmployeeDailyPlans(employeeId: IEmployee['id'], params: PaginationParams<DailyPlan>): Promise<IPagination<IDailyPlan>>;
    /**
     * GET daily plans for a given task
     *
     * @param options
     * @param taskId
     * @returns
     */
    getDailyPlansForTaskId(taskId: ITask['id'], params: PaginationParams<IDailyPlan>): Promise<IPagination<IDailyPlan>>;
    /**
     * Add a task to a specified daily plan.
     *
     * @param planId - The unique identifier of the daily plan to which the task will be added.
     * @param input - An object containing details about the task to add, including task ID, employee ID, and organization ID.
     * @returns The updated daily plan with the newly added task.
     */
    addTaskToDailyPlan(planId: IDailyPlan['id'], // Extract the plan ID from the URL parameter
    input: IDailyPlanTasksUpdateInput): Promise<IDailyPlan>;
    /**
     * Remove a task from a specified daily plan.
     *
     * @param planId - The ID of the daily plan from which a task will be removed.
     * @param taskId - The ID of the task to be removed from the daily plan.
     * @param params - Additional query parameters for pagination or filtering.
     * @returns The updated daily plan after the task is removed.
     */
    removeTaskFromDailyPlan(planId: IDailyPlan['id'], // Extract the daily plan ID from the URL parameter
    input: IDailyPlanTasksUpdateInput): Promise<IDailyPlan>;
    /**
     * GET daily plans
     *
     * @param options
     * @returns
     */
    get(params: PaginationParams<DailyPlan>): Promise<IPagination<IDailyPlan>>;
    /**
     * CREATE Daily Plan
     * @param entity Data to create or update the DailyPlan
     */
    create(entity: CreateDailyPlanDTO): Promise<IDailyPlan>;
    /**
     * UPDATE Daily Plan
     * @param entity - An object with data to update.
     * @param id - The ID of the daily plan from which a task will be removed.
     * @returns the updated daily plan or the update result from typeorm
     * @memberof DailyPlanController
     */
    update(id: IDailyPlan['id'], entity: UpdateDailyPlanDTO): Promise<IDailyPlan | UpdateResult>;
    /**
     * DELETE plan
     *
     * @param {IDailyPlan['id']} planId
     * @returns
     * @memberof DailyPlanController
     */
    delete(planId: IDailyPlan['id']): Promise<import("typeorm").DeleteResult>;
}
