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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSheetService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const contracts_1 = require("../../../plugins/contracts");
const context_1 = require("./../../core/context");
const crud_1 = require("./../../core/crud");
const utils_1 = require("./../../core/utils");
const timesheet_entity_1 = require("./timesheet.entity");
const database_helper_1 = require("./../../database/database.helper");
const type_orm_timesheet_repository_1 = require("./repository/type-orm-timesheet.repository");
const mikro_orm_timesheet_repository_1 = require("./repository/mikro-orm-timesheet.repository");
let TimeSheetService = exports.TimeSheetService = class TimeSheetService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmTimesheetRepository, mikroOrmTimesheetRepository) {
        super(typeOrmTimesheetRepository, mikroOrmTimesheetRepository);
    }
    /**
     * GET timesheets count in date range for same tenant
     *
     * @param request
     * @returns
     */
    async getTimeSheetCount(request) {
        const query = this.typeOrmRepository.createQueryBuilder('timesheet');
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.where((query) => {
            this.getFilterTimesheetQuery(query, request);
        });
        return await query.getCount();
    }
    /**
     * GET timesheets in date range for same tenant
     *
     * @param request
     * @returns
     */
    async getTimeSheets(request) {
        const query = this.typeOrmRepository.createQueryBuilder('timesheet');
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.setFindOptions({
            select: {
                employee: {
                    id: true,
                    user: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                organization: {
                    name: true,
                    brandColor: true
                }
            },
            ...(request && request.relations
                ? {
                    relations: request.relations
                }
                : {})
        });
        query.where((query) => {
            this.getFilterTimesheetQuery(query, request);
        });
        return await query.getMany();
    }
    /**
     * GET timesheet QueryBuilder
     *
     * @param qb
     * @param request
     * @returns
     */
    async getFilterTimesheetQuery(qb, request) {
        const { organizationId, startDate, endDate } = request;
        let { employeeIds = [] } = request;
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const user = context_1.RequestContext.currentUser();
        // Calculate start and end dates using a utility function
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('month')), // use current start of the month if startDate not found
        moment_1.default.utc(endDate || (0, moment_1.default)().endOf('month')) // use current end of the month if endDate not found
        );
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Determine if the request specifies to retrieve data for the current user only
        const isOnlyMeSelected = request.onlyMe;
        if ((user.employeeId && isOnlyMeSelected) || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        qb.andWhere(new typeorm_2.Brackets((qb) => {
            qb.where({
                startedAt: (0, typeorm_2.Between)(start, end),
                ...(employeeIds.length > 0 ? { employeeId: (0, typeorm_2.In)(employeeIds) } : {})
            });
        }));
        // Additional conditions for filtering by tenantId and organizationId
        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), { tenantId });
        qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), { organizationId });
        return qb;
    }
};
exports.TimeSheetService = TimeSheetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(timesheet_entity_1.Timesheet)),
    __metadata("design:paramtypes", [type_orm_timesheet_repository_1.TypeOrmTimesheetRepository,
        mikro_orm_timesheet_repository_1.MikroOrmTimesheetRepository])
], TimeSheetService);
//# sourceMappingURL=timesheet.service.js.map