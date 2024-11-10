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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotService = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("typeorm");
const contracts_1 = require("../../../plugins/contracts");
const index_1 = require("../../../plugins/common/dist/index");
const crud_1 = require("./../../core/crud");
const moment_extend_1 = require("../../core/moment-extend");
const context_1 = require("../../core/context");
const utils_1 = require("./../../core/utils");
const utils_2 = require("./utils");
const commands_1 = require("./commands");
const database_helper_1 = require("./../../database/database.helper");
const type_orm_time_slot_repository_1 = require("./repository/type-orm-time-slot.repository");
const mikro_orm_time_slot_repository_1 = require("./repository/mikro-orm-time-slot.repository");
let TimeSlotService = exports.TimeSlotService = class TimeSlotService extends crud_1.TenantAwareCrudService {
    typeOrmTimeSlotRepository;
    mikroOrmTimeSlotRepository;
    commandBus;
    constructor(typeOrmTimeSlotRepository, mikroOrmTimeSlotRepository, commandBus) {
        super(typeOrmTimeSlotRepository, mikroOrmTimeSlotRepository);
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.mikroOrmTimeSlotRepository = mikroOrmTimeSlotRepository;
        this.commandBus = commandBus;
    }
    /**
     * Retrieves time slots based on the provided input parameters.
     * @param request - Input parameters for querying time slots.
     * @returns A list of time slots matching the specified criteria.
     */
    async getTimeSlots(request) {
        // Extract parameters from the request object
        const { organizationId, startDate, endDate, syncSlots = false } = request;
        let { employeeIds = [] } = request;
        const tenantId = context_1.RequestContext.currentTenantId();
        const user = context_1.RequestContext.currentUser();
        // Calculate start and end dates using a utility function
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_extend_1.moment.utc(startDate || (0, moment_extend_1.moment)().startOf('day')), moment_extend_1.moment.utc(endDate || (0, moment_extend_1.moment)().endOf('day')));
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Determine if the request specifies to retrieve data for the current user only
        const isOnlyMeSelected = request.onlyMe;
        // Set employeeIds based on permissions and request
        if ((user.employeeId && isOnlyMeSelected) || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        // Create a query builder for the TimeSlot entity
        const query = this.typeOrmRepository.createQueryBuilder('time_slot');
        query.leftJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeLogs`, 'time_log');
        query.setFindOptions({
            // Define selected fields for the result
            select: {
                organization: {
                    id: true,
                    name: true
                },
                employee: {
                    id: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true
                    }
                }
            },
            relations: [...(request.relations ? request.relations : [])]
        });
        query.where((qb) => {
            qb.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."startedAt" BETWEEN :startDate AND :endDate`), {
                    startDate: start,
                    endDate: end
                });
                if ((0, index_1.isEmpty)(syncSlots)) {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."startedAt" BETWEEN :startDate AND :endDate`), {
                        startDate: start,
                        endDate: end
                    });
                }
            }));
            qb.andWhere(new typeorm_1.Brackets((web) => {
                if ((0, index_1.isNotEmpty)(employeeIds)) {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."employeeId" IN (:...employeeIds)`), {
                        employeeIds
                    });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."employeeId" IN (:...employeeIds)`), {
                        employeeIds
                    });
                }
                if ((0, index_1.isNotEmpty)(request.projectIds)) {
                    const { projectIds } = request;
                    web.andWhere((0, database_helper_1.prepareSQLQuery)('"time_log"."projectId" IN (:...projectIds)'), {
                        projectIds
                    });
                }
            }));
            qb.andWhere(new typeorm_1.Brackets((web) => {
                // Filters records based on the overall column, representing the activity level.
                if ((0, index_1.isNotEmpty)(request.activityLevel)) {
                    /**
                     * Activity Level should be 0-100%
                     * Convert it into a 10-minute time slot by multiplying by 6
                     */
                    const { activityLevel } = request;
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."overall" BETWEEN :start AND :end`), {
                        start: activityLevel.start * 6,
                        end: activityLevel.end * 6
                    });
                }
                // Filters records based on the source column.
                if ((0, index_1.isNotEmpty)(request.source)) {
                    const { source } = request;
                    const condition = source instanceof Array
                        ? (0, database_helper_1.prepareSQLQuery)(`"time_log"."source" IN (:...source)`)
                        : (0, database_helper_1.prepareSQLQuery)(`"time_log"."source" = :source`);
                    web.andWhere(condition, { source });
                }
                // Filters records based on the logType column.
                if ((0, index_1.isNotEmpty)(request.logType)) {
                    const { logType } = request;
                    const condition = logType instanceof Array
                        ? (0, database_helper_1.prepareSQLQuery)(`"time_log"."logType" IN (:...logType)`)
                        : (0, database_helper_1.prepareSQLQuery)(`"time_log"."logType" = :logType`);
                    web.andWhere(condition, { logType });
                }
            }));
            // Additional conditions for filtering by tenantId and organizationId
            qb.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."tenantId" = :tenantId`), { tenantId });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"time_log"."organizationId" = :organizationId`), { organizationId });
            }));
            // Additional conditions for filtering by tenantId and organizationId
            qb.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
            }));
            qb.addOrderBy((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."createdAt"`), 'ASC');
        });
        const slots = await query.getMany();
        return slots;
    }
    /**
     *
     * @param slots
     * @param employeeId
     * @param organizationId
     * @returns
     */
    async bulkCreateOrUpdate(slots, employeeId, organizationId) {
        return await this.commandBus.execute(new commands_1.TimeSlotBulkCreateOrUpdateCommand(slots, employeeId, organizationId));
    }
    /**
     *
     * @param slots
     * @param employeeId
     * @param organizationId
     * @returns
     */
    async bulkCreate(slots, employeeId, organizationId) {
        return await this.commandBus.execute(new commands_1.TimeSlotBulkCreateCommand(slots, employeeId, organizationId));
    }
    /**
     *
     * @param start
     * @param end
     * @returns
     */
    generateTimeSlots(start, end) {
        return (0, utils_2.generateTimeSlots)(start, end);
    }
    /*
     *create time slot minute activity for specific TimeSlot
     */
    async createTimeSlotMinute(request) {
        // const { keyboard, mouse, datetime, timeSlot } = request;
        return await this.commandBus.execute(new commands_1.CreateTimeSlotMinutesCommand(request));
    }
    /*
     * Update TimeSlot minute activity for specific TimeSlot
     */
    async updateTimeSlotMinute(id, request) {
        return await this.commandBus.execute(new commands_1.UpdateTimeSlotMinutesCommand(id, request));
    }
};
exports.TimeSlotService = TimeSlotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        mikro_orm_time_slot_repository_1.MikroOrmTimeSlotRepository,
        cqrs_1.CommandBus])
], TimeSlotService);
//# sourceMappingURL=time-slot.service.js.map