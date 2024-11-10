"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyPlanService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../plugins/common/dist/index");
const database_helper_1 = require("../../database/database.helper");
const crud_1 = require("../../core/crud");
const context_1 = require("../../core/context");
const employee_service_1 = require("../../employee/employee.service");
const task_service_1 = require("../task.service");
const repository_1 = require("./repository");
const daily_plan_entity_1 = require("./daily-plan.entity");
let DailyPlanService = exports.DailyPlanService = class DailyPlanService extends crud_1.TenantAwareCrudService {
    typeOrmDailyPlanRepository;
    mikroOrmDailyPlanRepository;
    employeeService;
    taskService;
    constructor(typeOrmDailyPlanRepository, mikroOrmDailyPlanRepository, employeeService, taskService) {
        super(typeOrmDailyPlanRepository, mikroOrmDailyPlanRepository);
        this.typeOrmDailyPlanRepository = typeOrmDailyPlanRepository;
        this.mikroOrmDailyPlanRepository = mikroOrmDailyPlanRepository;
        this.employeeService = employeeService;
        this.taskService = taskService;
    }
    /**
     * Create or update a DailyPlan. If the given day already has a DailyPlan,
     * update it with the provided task. Otherwise, create a new DailyPlan.
     *
     * @param partialEntity - Data to create or update the DailyPlan
     * @returns The created or updated DailyPlan
     */
    async createDailyPlan(partialEntity) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { employeeId, organizationId, taskId } = partialEntity;
            const dailyPlanDate = new Date(partialEntity.date).toISOString().split('T')[0];
            // Validate employee existence
            const employee = await this.employeeService.findOneByIdString(employeeId);
            if (!employee) {
                throw new common_1.NotFoundException('Employee not found');
            }
            // Check for existing DailyPlan
            const query = this.typeOrmRepository.createQueryBuilder('dailyPlan');
            query.setFindOptions({ relations: { tasks: true } });
            query.where('"dailyPlan"."tenantId" = :tenantId', { tenantId });
            query.andWhere('"dailyPlan"."organizationId" = :organizationId', { organizationId });
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`DATE("dailyPlan"."date") = :dailyPlanDate`), { dailyPlanDate: `${dailyPlanDate}` });
            query.andWhere('"dailyPlan"."employeeId" = :employeeId', { employeeId });
            let dailyPlan = await query.getOne();
            // Create or update DailyPlan
            if (!dailyPlan) {
                dailyPlan = new daily_plan_entity_1.DailyPlan({
                    ...partialEntity,
                    employeeId: employee.id,
                    employee: { id: employee.id },
                    tasks: []
                });
            }
            // If a taskId is provided, add the task to the DailyPlan
            if (taskId) {
                const task = await this.taskService.findOneByIdString(taskId);
                if (!task) {
                    throw new common_1.BadRequestException('Cannot found the task');
                }
                dailyPlan.tasks.push(task);
                await this.save(dailyPlan); // Save changes
            }
            return dailyPlan; // Return the created/updated DailyPlan
        }
        catch (error) {
            console.error(error); // Improved logging
            throw new common_1.BadRequestException(error.message); // Clearer error messaging
        }
    }
    /**
     * Retrieves daily plans with pagination and additional query options.
     *
     * @param options - Pagination and additional query options for filtering and retrieving daily plans.
     * @returns A promise that resolves to an object containing the list of daily plans and the total count.
     * @throws BadRequestException - If there's an error during the query.
     */
    async getAllPlans(options, employeeId) {
        try {
            const { where } = options;
            const { organizationId } = where;
            const tenantId = context_1.RequestContext.currentTenantId();
            // Create the initial query
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            // Join related entities
            query.leftJoin(`${query.alias}.employee`, 'employee');
            query.leftJoin(`${query.alias}.tasks`, 'tasks');
            // Apply optional find options if provided
            query.setFindOptions({
                ...((0, index_1.isNotEmpty)(options) &&
                    (0, index_1.isNotEmpty)(options.where) && {
                    where: options.where
                }),
                ...((0, index_1.isNotEmpty)(options) &&
                    (0, index_1.isNotEmpty)(options.relations) && {
                    relations: options.relations
                })
            });
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
            if (employeeId) {
                query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" = :employeeId`), { employeeId });
            }
            // Retrieve results and total count
            const [items, total] = await query.getManyAndCount();
            // Return the pagination result
            return { items, total };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Retrieves daily plans for a specific employee with pagination and additional query options.
     *
     * @param employeeId - The ID of the employee for whom to retrieve daily plans.
     * @param options - Pagination and additional query options for filtering and retrieving daily plans.
     * @returns A promise that resolves to an object containing the list of daily plans and the total count.
     * @throws BadRequestException - If there's an error during the query.
     */
    async getDailyPlansByEmployee(options, employeeId) {
        try {
            // Fetch all daily plans for specific employee
            return await this.getAllPlans(options, employeeId);
        }
        catch (error) {
            console.log('Error fetching all daily plans');
        }
    }
    /**
     * Retrieves daily plans for the current employee based on given pagination options.
     *
     * @param options Pagination options for fetching daily plans.
     * @returns A promise resolving to daily plans for the current employee.
     */
    async getMyPlans(options) {
        try {
            // Get the current employee ID from the request context
            const currentEmployeeId = context_1.RequestContext.currentEmployeeId();
            // Fetch daily plans for the current employee
            return await this.getAllPlans(options, currentEmployeeId);
        }
        catch (error) {
            console.error('Error fetching daily plans for me:', error); // Log the error for debugging
        }
    }
    /**
     * Add a task to a specified daily plan.
     *
     * @param planId - The unique identifier of the daily plan to which the task will be added.
     * @param input - An object containing details about the task to add, including task ID, employee ID, and organization ID.
     * @returns The updated daily plan with the newly added task.
     */
    async addTaskToPlan(planId, input) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { employeeId, taskId, organizationId } = input;
            // Fetch the daily plan with the given conditions
            const dailyPlan = await this.findOneByIdString(planId, {
                where: {
                    employeeId,
                    tenantId,
                    organizationId
                },
                relations: { tasks: true } // Ensure we get the existing tasks
            });
            if (!dailyPlan) {
                throw new common_1.BadRequestException('Daily plan not found');
            }
            // Fetch the task to be added
            const taskToAdd = await this.taskService.findOneByIdString(taskId, {
                where: { organizationId, tenantId }
            });
            // Add the new task to the daily plan's tasks array
            dailyPlan.tasks.push(taskToAdd);
            // Save the updated daily plan
            return await this.save(dailyPlan);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    /**
     * Delete task from a given daily plan
     *
     * @param  planId The unique identifier of the daily plan to which the task will be removed.
     * @param input - An object containing details about the task to remove, including task ID, employee ID, and organization ID.
     * @returns The updated daily plan without the deleted task.
     */
    async removeTaskFromPlan(planId, input) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { employeeId, taskId, organizationId } = input;
            const dailyPlan = await this.findOneByIdString(planId, {
                where: {
                    employeeId,
                    tenantId,
                    organizationId
                },
                relations: { tasks: true } // Include the existings tasks for the daily plan
            });
            if (!dailyPlan) {
                throw new common_1.BadRequestException('Daily plan not found');
            }
            // Get task to be removed
            const taskToRemove = await this.taskService.findOneByIdString(taskId, {
                where: { organizationId, tenantId }
            });
            if (!taskToRemove) {
                throw new common_1.BadRequestException('The task to remove not found');
            }
            // Remove the task form the daily plan's tasks array
            const { tasks } = dailyPlan;
            dailyPlan.tasks = tasks.filter((task) => task.id !== taskId);
            // Save and return the updated daily plan
            return await this.save(dailyPlan);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * UPDATE Daily plan
     *
     * @param id - The unique identifier of the daily plan to be updated.
     * @param partialEntity - An object with data to update, including organization ID and employee ID.
     * @returns The updated daily plan including related tasks.
     * @memberof DailyPlanService
     */
    async updateDailyPlan(id, partialEntity) {
        try {
            const { employeeId, organizationId } = partialEntity;
            // Get the tenant ID from the current Request
            const currentTenantId = context_1.RequestContext.currentTenantId();
            // Fetch the daily plan to update
            const dailyPlan = await this.findOneByIdString(id, {
                where: {
                    employeeId,
                    tenantId: currentTenantId,
                    organizationId
                },
                relations: { tasks: true }
            });
            if (!dailyPlan) {
                throw new common_1.BadRequestException('Daily plan not found');
            }
            // Return the updated daily plan
            const updatedDailyPlan = await this.typeOrmRepository.preload({
                id,
                ...partialEntity,
                tasks: dailyPlan.tasks
            });
            return await this.save(updatedDailyPlan);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * DELETE daily plan
     *
     * @param {IDailyPlan['id']} planId
     * @returns
     * @memberof DailyPlanService
     */
    async deletePlan(planId) {
        return await super.delete(planId);
    }
    /**
     * Retrieves daily plans for a specific task including employee
     * @param options pagination and additional query options
     * @param taskId - The ID of the task for whom to retrieve daily plans.
     * @returns A promise that resolves to an object containing the list of plans and total count
     */
    async getDailyPlansByTask(options, taskId) {
        try {
            const { where } = options;
            const { organizationId } = where;
            const tenantId = context_1.RequestContext.currentTenantId();
            // Initial query
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            // Joins
            query.leftJoinAndSelect(`${query.alias}.employee`, 'employee');
            query.leftJoinAndSelect(`${query.alias}.tasks`, 'tasks');
            query.leftJoinAndSelect('employee.user', 'user');
            // Conditions
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
            query.andWhere((qb) => {
                const subQuery = qb.subQuery();
                subQuery.select((0, database_helper_1.prepareSQLQuery)('"daily_plan_task"."dailyPlanId"')).from((0, database_helper_1.prepareSQLQuery)('daily_plan_task'), (0, database_helper_1.prepareSQLQuery)('daily_plan_task'));
                subQuery.andWhere((0, database_helper_1.prepareSQLQuery)('"daily_plan_task"."taskId" = :taskId'), { taskId });
                return (0, database_helper_1.prepareSQLQuery)(`${query.alias}.id IN `) + subQuery.distinct(true).getQuery();
            });
            // Retrieves results and total count
            const [items, total] = await query.getManyAndCount();
            return { items, total };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.DailyPlanService = DailyPlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(daily_plan_entity_1.DailyPlan)),
    __metadata("design:paramtypes", [repository_1.TypeOrmDailyPlanRepository,
        repository_1.MikroOrmDailyPlanRepository,
        employee_service_1.EmployeeService,
        task_service_1.TaskService])
], DailyPlanService);
//# sourceMappingURL=daily-plan.service.js.map