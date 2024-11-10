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
exports.ExpenseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
const underscore_1 = require("underscore");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const expense_entity_1 = require("./expense.entity");
const crud_1 = require("./../core/crud");
const context_1 = require("../core/context");
const utils_1 = require("./../core/utils");
const database_helper_1 = require("./../database/database.helper");
const type_orm_expense_repository_1 = require("./repository/type-orm-expense.repository");
const mikro_orm_expense_repository_1 = require("./repository/mikro-orm-expense.repository");
let ExpenseService = exports.ExpenseService = class ExpenseService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmExpenseRepository, mikroOrmExpenseRepository) {
        super(typeOrmExpenseRepository, mikroOrmExpenseRepository);
    }
    /**
     *
     * @param filter
     * @param filterDate
     * @returns
     */
    async findAllExpenses(filter, filterDate) {
        if (filterDate) {
            const startOfMonth = (0, moment_1.default)((0, moment_1.default)(filterDate).startOf('month').format('YYYY-MM-DD hh:mm:ss')).toDate();
            const endOfMonth = (0, moment_1.default)((0, moment_1.default)(filterDate).endOf('month').format('YYYY-MM-DD hh:mm:ss')).toDate();
            return filter
                ? await this.findAll({
                    where: {
                        valueDate: (0, typeorm_2.Between)(startOfMonth, endOfMonth),
                        ...filter.where
                    },
                    relations: filter.relations
                })
                : await this.findAll({
                    where: {
                        valueDate: (0, typeorm_2.Between)(startOfMonth, endOfMonth)
                    }
                });
        }
        return await this.findAll(filter || {});
    }
    /**
     *
     * @param data
     * @returns
     */
    countStatistic(data) {
        return data.filter(Number).reduce((a, b) => a + b, 0) !== 0
            ? data.filter(Number).reduce((a, b) => a + b, 0) / data.filter(Number).length
            : 0;
    }
    /**
     *
     * @param request
     * @returns
     */
    async getExpense(request) {
        const query = this.filterQuery(request);
        query.orderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."valueDate"`), 'ASC');
        if (context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            query.leftJoinAndSelect(`${query.alias}.employee`, 'activityEmployee');
            query.leftJoinAndSelect(`activityEmployee.user`, 'activityUser', (0, database_helper_1.prepareSQLQuery)('"employee"."userId" = activityUser.id'));
        }
        query.leftJoinAndSelect(`${query.alias}.category`, 'category');
        query.leftJoinAndSelect(`${query.alias}.project`, 'project');
        return await query.getMany();
    }
    /**
     *
     * @param request
     * @returns
     */
    async getDailyReportChartData(request) {
        const query = this.filterQuery(request);
        query.orderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."valueDate"`), 'ASC');
        const { startDate, endDate } = request;
        const days = (0, utils_1.getDaysBetweenDates)(startDate, endDate);
        const expenses = await query.getMany();
        const byDate = (0, underscore_1.chain)(expenses)
            .groupBy((expense) => (0, moment_1.default)(expense.valueDate).format('YYYY-MM-DD'))
            .mapObject((expenses, date) => {
            const sum = expenses.reduce((iteratee, expense) => {
                return iteratee + parseFloat(expense.amount);
            }, 0);
            return {
                date,
                value: {
                    expense: sum.toFixed(1)
                }
            };
        })
            .value();
        const dates = days.map((date) => {
            if (byDate[date]) {
                return byDate[date];
            }
            else {
                return {
                    date: date,
                    value: {
                        expense: 0
                    }
                };
            }
        });
        return dates;
    }
    /**
     *
     * @param request
     * @returns
     */
    filterQuery(request) {
        const { organizationId, startDate, endDate, categoryId, projectIds = [] } = request;
        let { employeeIds = [] } = request;
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        const user = context_1.RequestContext.currentUser();
        // Calculate start and end dates using a utility function
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('week')), moment_1.default.utc(endDate || (0, moment_1.default)().endOf('week')));
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Determine if the request specifies to retrieve data for the current user only
        const isOnlyMeSelected = request.onlyMe;
        // Set employeeIds based on permissions and request
        if ((user.employeeId && isOnlyMeSelected) || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        const query = this.typeOrmRepository.createQueryBuilder();
        if (request.limit > 0) {
            query.take(request.limit);
            query.skip((request.page || 0) * request.limit);
        }
        query.leftJoin(`${query.alias}.employee`, 'employee');
        query.andWhere(new typeorm_2.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
        }));
        query.andWhere(new typeorm_2.Brackets((qb) => {
            qb.where({
                valueDate: (0, typeorm_2.Between)(start, end)
            });
        }));
        query.andWhere(new typeorm_2.Brackets((qb) => {
            if ((0, index_2.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" IN (:...employeeIds)`), {
                    employeeIds
                });
            }
            if ((0, index_2.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IN (:...projectIds)`), {
                    projectIds
                });
            }
            if (categoryId) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."categoryId" = :categoryId`), {
                    categoryId
                });
            }
        }));
        return query;
    }
    /**
     *
     * @param filter
     * @returns
     */
    pagination(filter) {
        if ('where' in filter) {
            const { where } = filter;
            if ('notes' in where) {
                filter['where']['notes'] = (0, typeorm_2.ILike)(`%${where.notes}%`);
            }
            if ('purpose' in where) {
                filter['where']['purpose'] = (0, typeorm_2.ILike)(`%${where.purpose}%`);
            }
            if ('valueDate' in where) {
                const { valueDate } = where;
                const { startDate, endDate } = valueDate;
                if (startDate && endDate) {
                    filter['where']['valueDate'] = (0, typeorm_2.Between)(moment_1.default.utc(startDate).format('YYYY-MM-DD HH:mm:ss'), moment_1.default.utc(endDate).format('YYYY-MM-DD HH:mm:ss'));
                }
                else {
                    filter['where']['valueDate'] = (0, typeorm_2.Between)((0, moment_1.default)().startOf('month').utc().format('YYYY-MM-DD HH:mm:ss'), (0, moment_1.default)().endOf('month').utc().format('YYYY-MM-DD HH:mm:ss'));
                }
            }
            if ('tags' in where) {
                filter['where']['tags'] = {
                    id: (0, typeorm_2.In)(where.tags)
                };
            }
        }
        return super.paginate(filter);
    }
};
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_1.Expense)),
    __metadata("design:paramtypes", [type_orm_expense_repository_1.TypeOrmExpenseRepository,
        mikro_orm_expense_repository_1.MikroOrmExpenseRepository])
], ExpenseService);
//# sourceMappingURL=expense.service.js.map