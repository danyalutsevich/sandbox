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
exports.TimeLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const context_1 = require("../../core/context");
const contracts_1 = require("../../../plugins/contracts");
const cqrs_1 = require("@nestjs/cqrs");
const underscore_1 = require("underscore");
const index_1 = require("../../../plugins/common/dist/index");
const crud_1 = require("./../../core/crud");
const commands_1 = require("./commands");
const utils_1 = require("./../../core/utils");
const moment_extend_1 = require("./../../core/moment-extend");
const time_log_utils_1 = require("./time-log.utils");
const database_helper_1 = require("./../../database/database.helper");
const type_orm_time_log_repository_1 = require("./repository/type-orm-time-log.repository");
const mikro_orm_time_log_repository_1 = require("./repository/mikro-orm-time-log.repository");
const type_orm_employee_repository_1 = require("../../employee/repository/type-orm-employee.repository");
const mikro_orm_employee_repository_1 = require("../../employee/repository/mikro-orm-employee.repository");
const type_orm_organization_project_repository_1 = require("../../organization-project/repository/type-orm-organization-project.repository");
const mikro_orm_organization_project_repository_1 = require("../../organization-project/repository/mikro-orm-organization-project.repository");
const type_orm_organization_contact_repository_1 = require("../../organization-contact/repository/type-orm-organization-contact.repository");
const mikro_orm_organization_contact_repository_1 = require("../../organization-contact/repository/mikro-orm-organization-contact.repository");
let TimeLogService = exports.TimeLogService = class TimeLogService extends crud_1.TenantAwareCrudService {
    typeOrmTimeLogRepository;
    mikroOrmTimeLogRepository;
    typeOrmEmployeeRepository;
    mikroOrmEmployeeRepository;
    typeOrmOrganizationProjectRepository;
    mikroOrmOrganizationProjectRepository;
    typeOrmOrganizationContactRepository;
    mikroOrmOrganizationContactRepository;
    commandBus;
    constructor(typeOrmTimeLogRepository, mikroOrmTimeLogRepository, typeOrmEmployeeRepository, mikroOrmEmployeeRepository, typeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository, typeOrmOrganizationContactRepository, mikroOrmOrganizationContactRepository, commandBus) {
        super(typeOrmTimeLogRepository, mikroOrmTimeLogRepository);
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.mikroOrmTimeLogRepository = mikroOrmTimeLogRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.mikroOrmEmployeeRepository = mikroOrmEmployeeRepository;
        this.typeOrmOrganizationProjectRepository = typeOrmOrganizationProjectRepository;
        this.mikroOrmOrganizationProjectRepository = mikroOrmOrganizationProjectRepository;
        this.typeOrmOrganizationContactRepository = typeOrmOrganizationContactRepository;
        this.mikroOrmOrganizationContactRepository = mikroOrmOrganizationContactRepository;
        this.commandBus = commandBus;
    }
    /**
     * Retrieves time logs based on the provided input.
     * @param request The input parameters for fetching time logs.
     * @returns A Promise that resolves to an array of time logs.
     */
    async getTimeLogs(request) {
        // Create a query builder for the TimeLog entity
        const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
        // Inner join with related entities (employee, timeSlots)
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlots`, 'timeSlots');
        // Set up the find options for the query
        query.setFindOptions({
            select: {
                project: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    membersCount: true
                },
                task: {
                    id: true,
                    title: true,
                    estimate: true
                },
                organizationContact: {
                    id: true,
                    name: true,
                    imageUrl: true
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
            relations: [...(request.relations ? request.relations : [])],
            order: {
                // Order results by the 'startedAt' field in ascending order
                startedAt: 'ASC'
            }
        });
        // Set up the where clause using the provided filter function
        query.where((qb) => {
            this.getFilterTimeLogQuery(qb, request);
        });
        const timeLogs = await query.getMany();
        // Set up the where clause using the provided filter function
        return timeLogs;
    }
    /**
     * Fetches time logs for a weekly report based on the provided input.
     * @param request The input parameters for fetching time logs.
     * @returns A Promise that resolves to an array of weekly report data.
     */
    async getWeeklyReport(request) {
        // Create a query builder for the TimeLog entity
        const query = this.typeOrmRepository.createQueryBuilder('time_log');
        // Inner join with related entities (employee, timeSlots)
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlots`, 'timeSlots');
        // Set find options for the query
        query.setFindOptions({
            select: {
                // Selected fields for the result
                id: true,
                employeeId: true,
                startedAt: true,
                stoppedAt: true,
                employee: {
                    id: true,
                    userId: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true
                    }
                },
                timeSlots: {
                    id: true,
                    overall: true,
                    duration: true
                }
            },
            relations: {
                // Related entities to be included in the result
                timeSlots: true,
                employee: {
                    user: true
                }
            },
            order: {
                // Order results by the 'startedAt' field in ascending order
                startedAt: 'ASC'
            }
        });
        // Apply additional conditions to the query based on request filters
        query.where((qb) => {
            this.getFilterTimeLogQuery(qb, request);
        });
        // Execute the query and retrieve time logs
        const logs = await query.getMany();
        // Gets an array of days between the given start date, end date and timezone.
        const { startDate, endDate, timeZone } = request;
        const days = (0, utils_1.getDaysBetweenDates)(startDate, endDate, timeZone);
        // Process weekly logs using lodash and Moment.js
        const weeklyLogs = (0, underscore_1.chain)(logs)
            .groupBy('employeeId')
            .map((logs) => {
            // Calculate average duration for specific employee.
            const weeklyDuration = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(logs, 'duration'));
            // Calculate average weekly activity for specific employee.
            const weeklyActivity = (0, time_log_utils_1.calculateAverageActivity)((0, underscore_1.chain)(logs).pluck('timeSlots').flatten(true).value());
            const byDate = (0, underscore_1.chain)(logs)
                .groupBy((log) => moment_extend_1.moment.utc(log.startedAt).tz(timeZone).format('YYYY-MM-DD'))
                .mapObject((logs) => {
                // Calculate average duration of the employee for specific date range.
                const sum = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(logs, 'duration'));
                return { sum, logs };
            })
                .value();
            // Retrieve employee details
            const employee = logs.length > 0 ? logs[0].employee : null;
            const dates = {};
            days.forEach((date) => {
                dates[date] = byDate[date] || 0;
            });
            // Return the processed weekly logs data
            return {
                employee,
                dates,
                sum: weeklyDuration || null,
                activity: parseFloat(parseFloat(weeklyActivity + '').toFixed(2))
            };
        })
            .value();
        return weeklyLogs;
    }
    /**
     * Fetches daily time logs for chart reports based on the provided input.
     * @param request The input parameters for fetching daily time logs.
     * @returns An array of daily time log chart reports.
     */
    async getDailyReportCharts(request) {
        // Create a query builder for the TimeLog entity
        const query = this.typeOrmRepository.createQueryBuilder('time_log');
        // Inner join with related entities (employee, timeSlots)
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlots`, 'timeSlots');
        // Set find options for the query
        query.setFindOptions({
            order: {
                // Order results by the 'startedAt' field in ascending order
                startedAt: 'ASC'
            }
        });
        // Apply additional conditions to the query based on request filters
        query.where((qb) => {
            this.getFilterTimeLogQuery(qb, request);
        });
        // Execute the query and retrieve time logs
        const logs = await query.getMany();
        // Gets an array of days between the given start date, end date and timezone.
        const { startDate, endDate, timeZone } = request;
        const days = (0, utils_1.getDaysBetweenDates)(startDate, endDate, timeZone);
        // Group time logs by date and calculate tracked, manual, idle, and resumed durations
        const byDate = (0, underscore_1.chain)(logs)
            .groupBy((log) => moment_extend_1.moment.utc(log.startedAt).tz(timeZone).format('YYYY-MM-DD'))
            .mapObject((logs, date) => {
            const tracked = (0, time_log_utils_1.calculateDuration)(logs, contracts_1.TimeLogType.TRACKED); //
            const manual = (0, time_log_utils_1.calculateDuration)(logs, contracts_1.TimeLogType.MANUAL); //
            const ideal = (0, time_log_utils_1.calculateDuration)(logs, contracts_1.TimeLogType.IDLE); //
            const resumed = (0, time_log_utils_1.calculateDuration)(logs, contracts_1.TimeLogType.RESUMED); //
            return {
                date,
                value: {
                    [contracts_1.TimeLogType.TRACKED]: parseFloat((tracked / 3600).toFixed(1)),
                    [contracts_1.TimeLogType.MANUAL]: parseFloat((manual / 3600).toFixed(1)),
                    [contracts_1.TimeLogType.IDLE]: parseFloat((ideal / 3600).toFixed(1)),
                    [contracts_1.TimeLogType.RESUMED]: parseFloat((resumed / 3600).toFixed(1))
                }
            };
        })
            .value();
        // Map the calculated values to each date, ensuring no missing dates
        const dates = days.map((date) => {
            return (byDate[date] || {
                date,
                value: {
                    [contracts_1.TimeLogType.TRACKED]: 0,
                    [contracts_1.TimeLogType.MANUAL]: 0,
                    [contracts_1.TimeLogType.IDLE]: 0,
                    [contracts_1.TimeLogType.RESUMED]: 0
                }
            });
        });
        // Return the array of daily time log chart reports
        return dates;
    }
    /**
     * Retrieves a daily time logs report based on the provided input parameters.
     * @param request - Input parameters for querying the daily time logs report.
     * @returns A report containing time logs grouped by specified filters.
     */
    async getDailyReport(request) {
        // Extract timezone from the request
        const { timeZone } = request;
        // Create a query builder for the TimeLog entity
        const query = this.typeOrmRepository.createQueryBuilder('time_log');
        // Inner join with related entities (employee, timeSlots)
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlots`, 'timeSlots');
        // Set find options for the query
        query.setFindOptions({
            select: {
                // Selected fields for the result
                id: true,
                employeeId: true,
                startedAt: true,
                stoppedAt: true,
                description: true,
                projectId: true,
                taskId: true,
                organizationContactId: true,
                project: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    membersCount: true,
                    organizationContact: {
                        id: true,
                        name: true,
                        imageUrl: true
                    }
                },
                task: {
                    id: true,
                    title: true
                },
                timeSlots: {
                    id: true,
                    overall: true,
                    duration: true
                },
                organizationContact: {
                    id: true,
                    name: true,
                    imageUrl: true
                },
                employee: {
                    id: true,
                    userId: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true
                    }
                }
            },
            relations: {
                // Related entities to be included in the result
                project: {
                    organizationContact: true
                },
                task: true,
                timeSlots: true,
                organizationContact: true,
                employee: {
                    user: true
                }
            },
            order: {
                // Order results by the 'startedAt' field in ascending order
                startedAt: 'ASC'
            }
        });
        // Apply additional conditions to the query based on request filters
        query.where((qb) => {
            this.getFilterTimeLogQuery(qb, request);
        });
        // Execute the query and retrieve time logs
        const logs = await query.getMany();
        // Group time logs based on the specified 'groupBy' filter
        let dailyLogs;
        switch (request.groupBy) {
            case contracts_1.ReportGroupFilterEnum.employee:
                dailyLogs = await this.commandBus.execute(new commands_1.GetTimeLogGroupByEmployeeCommand(logs, timeZone));
                break;
            case contracts_1.ReportGroupFilterEnum.project:
                dailyLogs = await this.commandBus.execute(new commands_1.GetTimeLogGroupByProjectCommand(logs, timeZone));
                break;
            case contracts_1.ReportGroupFilterEnum.client:
                dailyLogs = await this.commandBus.execute(new commands_1.GetTimeLogGroupByClientCommand(logs, timeZone));
                break;
            default:
                dailyLogs = await this.commandBus.execute(new commands_1.GetTimeLogGroupByDateCommand(logs, timeZone));
                break;
        }
        // Return the generated daily time logs report
        return dailyLogs;
    }
    /**
     * Fetches an owed amount report based on the provided input.
     * @param request The input parameters for fetching the owed amount report.
     * @returns A Promise that resolves to an array of owed amount report data.
     */
    async getOwedAmountReport(request) {
        // Extract timezone from the request
        const { timeZone } = request;
        // Create a query builder for the TimeLog entity
        const query = this.typeOrmRepository.createQueryBuilder('time_log');
        // Inner join with related entities (employee, timeSlots)
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlots`, 'timeSlots');
        // Set up the find options for the query
        query.setFindOptions({
            select: {
                employee: {
                    id: true,
                    userId: true,
                    billRateValue: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true
                    }
                }
            },
            relations: {
                // Related entities to be included in the result
                employee: {
                    user: true
                }
            },
            order: {
                // Order results by the 'startedAt' field in ascending order
                startedAt: 'ASC'
            }
        });
        // Apply additional conditions to the query based on request filters
        query.where((qb) => {
            this.getFilterTimeLogQuery(qb, request);
        });
        // Execute the query and retrieve time logs
        const timeLogs = await query.getMany();
        const dailyLogs = (0, underscore_1.chain)(timeLogs)
            .groupBy((log) => moment_extend_1.moment.utc(log.startedAt).tz(timeZone).format('YYYY-MM-DD'))
            .map((byDateLogs, date) => {
            const byEmployee = (0, underscore_1.chain)(byDateLogs)
                .groupBy('employeeId')
                .map((byEmployeeLogs) => {
                // Calculate average duration for specific employee.
                const durationSum = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(byEmployeeLogs, 'duration'));
                // Retrieve employee details
                const employee = byEmployeeLogs.length > 0 ? byEmployeeLogs[0].employee : null;
                const amount = employee?.billRateValue * (durationSum / 3600);
                return {
                    employee,
                    amount: parseFloat(amount.toFixed(1)),
                    duration: durationSum
                };
            })
                .value();
            return {
                date,
                employees: byEmployee
            };
        })
            .value();
        return dailyLogs;
    }
    /**
     * Fetches owed amount report data for charts based on the provided input.
     * @param request The input parameters for fetching owed amount report charts.
     * @returns An array of owed amount report chart data.
     */
    async getOwedAmountReportCharts(request) {
        // Step 1: Create a query builder for the TimeLog entity
        const query = this.typeOrmRepository.createQueryBuilder('time_log');
        // Inner join with related entities (employee, timeSlots)
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlots`, 'timeSlots');
        // Set find options for the query
        query.setFindOptions({
            select: {
                // Selected fields for the result
                employee: {
                    id: true,
                    billRateValue: true,
                    userId: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true
                    }
                }
            },
            relations: {
                employee: {
                    user: true
                }
            },
            order: {
                // Order results by the 'startedAt' field in ascending order
                startedAt: 'ASC'
            }
        });
        // Apply additional conditions to the query based on request filters
        query.where((qb) => {
            this.getFilterTimeLogQuery(qb, request);
        });
        // Execute the query and retrieve time logs
        const timeLogs = await query.getMany();
        // Gets an array of days between the given start date, end date and timezone.
        const { startDate, endDate, timeZone } = request;
        const days = (0, utils_1.getDaysBetweenDates)(startDate, endDate, timeZone);
        const byDate = (0, underscore_1.chain)(timeLogs)
            .groupBy((log) => moment_extend_1.moment.utc(log.startedAt).tz(timeZone).format('YYYY-MM-DD'))
            .mapObject((byDateLogs, date) => {
            const byEmployee = (0, underscore_1.chain)(byDateLogs)
                .groupBy('employeeId')
                .map((byEmployeeLogs) => {
                // Calculate average duration for specific employee.
                const durationSum = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(byEmployeeLogs, 'duration'));
                // Retrieve employee details
                const employee = byEmployeeLogs.length > 0 ? byEmployeeLogs[0].employee : null;
                // Calculate the owed amount based on the employee's bill rate and duration
                const amount = employee?.billRateValue * (durationSum / 3600);
                return {
                    employee,
                    amount: parseFloat(amount.toFixed(1)),
                    duration: durationSum
                };
            })
                .value();
            // Calculate the total owed amount for all employees on a specific date
            const value = byEmployee.reduce((iteratee, item) => {
                return iteratee + item.amount;
            }, 0);
            return { date, value };
        })
            .value();
        // Map the result to an array of owed amount report chart data
        const dates = days.map((date) => ({
            date,
            value: byDate[date]?.value || 0
        }));
        // Return the array of owed amount report chart data
        return dates;
    }
    /**
     * It retrieves time log data, processes it, and calculates time limits for each employee based on the specified duration (day, month, etc.).
     * @param request - An object containing input parameters for the time limit report.
     * @returns An array of ITimeLimitReport containing information about time limits and durations for each date and employee.
     */
    async getTimeLimit(request) {
        // Set a default duration ('day') if not provided in the request.
        if (!request.duration) {
            request.duration = 'day';
        }
        // Create a query builder for the TimeLog entity
        const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
        // Inner join with related entities (employee, timeSlots)
        query.innerJoin(`${query.alias}.employee`, 'employee');
        query.innerJoin(`${query.alias}.timeSlots`, 'timeSlots');
        // Set find options for the query
        query.setFindOptions({
            select: {
                // Specify the fields to be selected in the query result.
                employee: {
                    id: true,
                    reWeeklyLimit: true,
                    userId: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        imageUrl: true
                    }
                }
            },
            relations: {
                employee: {
                    user: true
                }
            },
            order: {
                // Order results by the 'startedAt' field in ascending order
                startedAt: 'ASC'
            }
        });
        // Apply additional conditions to the query based on request filters
        query.where((qb) => {
            this.getFilterTimeLogQuery(qb, request);
        });
        // Execute the query and retrieve time logs
        const timeLogs = await query.getMany();
        // Gets an array of days between the given start date, end date and timezone.
        const { startDate, endDate, timeZone } = request;
        const days = (0, utils_1.getDaysBetweenDates)(startDate, endDate, timeZone);
        // Process time log data and calculate time limits for each employee and date
        const byDate = (0, underscore_1.chain)(timeLogs)
            .groupBy((log) => moment_extend_1.moment.utc(log.startedAt).tz(timeZone).startOf(request.duration).format('YYYY-MM-DD'))
            .mapObject((byDateLogs, date) => {
            const byEmployee = (0, underscore_1.chain)(byDateLogs)
                .groupBy('employeeId')
                .map((byEmployeeLogs) => {
                // Calculate average duration for specific employee.
                const durationSum = (0, time_log_utils_1.calculateAverage)((0, underscore_1.pluck)(byEmployeeLogs, 'duration'));
                // Retrieve employee details
                const employee = byEmployeeLogs.length > 0 ? byEmployeeLogs[0].employee : null;
                let limit = employee ? employee.reWeeklyLimit * 60 * 60 : 0;
                // Define a mapping object for duration multipliers
                const multipliers = {
                    day: 1 / 5,
                    month: 4
                };
                // Check if the requested duration is in the mapping object
                if (request.duration in multipliers) {
                    const durationMultiplier = multipliers[request.duration];
                    // Update the limit using the corresponding multiplier
                    limit *= durationMultiplier;
                }
                // Calculate duration percentage, handling the case where limit is 0
                const durationPercentage = limit !== 0 ? (durationSum * 100) / limit : 0;
                return {
                    employee,
                    duration: durationSum,
                    durationPercentage: Number.isFinite(durationPercentage) ? durationPercentage.toFixed(2) : 0,
                    limit
                };
            })
                .value();
            return { date, employees: byEmployee };
        })
            .value();
        // Create an array of ITimeLimitReport for each date.
        const dates = days.map((date) => (byDate[date] ? byDate[date] : { date, employees: [] }));
        // Return the final result as an array of ITimeLimitReport.
        return dates;
    }
    /**
     * Fetches project budget limit report data based on the provided input.
     * @param request The input parameters for fetching project budget limit report data.
     * @returns An array of project budget limit report data.
     */
    async getProjectBudgetLimit(request) {
        const { organizationId, employeeIds = [], projectIds = [], startDate, endDate } = request;
        const tenantId = context_1.RequestContext.currentTenantId() || request.tenantId;
        // Step 1: Create a query builder for the OrganizationProject entity
        const query = this.typeOrmOrganizationProjectRepository.createQueryBuilder('organization_project');
        // Inner join with related entities (employee, timeLogs)
        query.innerJoin(`${query.alias}.timeLogs`, 'timeLogs');
        query.innerJoin(`timeLogs.employee`, 'employee');
        // Set find options for the query
        query.setFindOptions({
            select: {
                id: true,
                name: true,
                budget: true,
                budgetType: true,
                imageUrl: true,
                membersCount: true
            },
            relations: {
                timeLogs: {
                    employee: true
                }
            }
        });
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" =:organizationId`), {
                organizationId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" =:tenantId`), {
                tenantId
            });
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employee"."organizationId" =:organizationId`), {
                organizationId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employee"."tenantId" =:tenantId`), {
                tenantId
            });
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employee"."id" IN (:...employeeIds)`), {
                    employeeIds
                });
            }
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationId" =:organizationId`), {
                organizationId
            });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."tenantId" =:tenantId`), { tenantId });
            // Date range condition
            const { start, end } = (0, utils_1.getDateRangeFormat)(moment_extend_1.moment.utc(startDate), moment_extend_1.moment.utc(endDate));
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."startedAt" >= :startDate AND "timeLogs"."startedAt" < :endDate`), {
                startDate: start,
                endDate: end
            });
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."employeeId" IN (:...employeeIds)`), {
                    employeeIds
                });
            }
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."projectId" IN (:...projectIds)`), {
                    projectIds
                });
            }
        }));
        // Execute the query and retrieve organization projects
        const organizationProjects = await query.getMany();
        const projects = organizationProjects.map((organizationProject) => {
            const { budgetType, timeLogs = [] } = organizationProject;
            const budget = organizationProject.budget || 0;
            let spent = 0;
            let spentPercentage = 0;
            let remainingBudget = 0;
            if (budgetType == contracts_1.OrganizationProjectBudgetTypeEnum.HOURS) {
                spent = timeLogs.reduce((totalDuration, log) => totalDuration + log.duration / 3600, 0);
            }
            else {
                spent = timeLogs.reduce((totalAmount, log) => {
                    const logAmount = log.employee ? (log.duration / 3600) * log.employee.billRateValue : 0;
                    return totalAmount + logAmount;
                }, 0);
            }
            spentPercentage = (spent * 100) / budget;
            remainingBudget = Math.max(budget - spent, 0);
            // Remove timeLogs property from the organizationProject object
            const { timeLogs: _, ...projectWithoutTimeLogs } = organizationProject;
            return {
                project: projectWithoutTimeLogs,
                budgetType,
                budget,
                spent: parseFloat(spent.toFixed(2)),
                remainingBudget: Number.isFinite(remainingBudget) ? parseFloat(remainingBudget.toFixed(2)) : 0,
                spentPercentage: Number.isFinite(spentPercentage) ? parseFloat(spentPercentage.toFixed(2)) : 0
            };
        });
        return projects;
    }
    /**
     * Calculate client budget limit report for a given organization contact.
     * @param organizationContact The organization contact for which to calculate the budget limit report.
     * @returns The client budget limit report.
     */
    async getClientBudgetLimit(request) {
        const { organizationId, employeeIds = [], projectIds = [], startDate, endDate } = request;
        const tenantId = context_1.RequestContext.currentTenantId();
        // Step 1: Create a query builder for the OrganizationClient entity
        const query = this.typeOrmOrganizationContactRepository.createQueryBuilder('organization_contact');
        // Inner join with related entities (employee, timeLogs)
        query.innerJoin(`${query.alias}.timeLogs`, 'timeLogs');
        query.innerJoin(`timeLogs.employee`, 'employee');
        // Set find options for the query
        query.setFindOptions({
            select: {
                id: true,
                name: true,
                budget: true,
                budgetType: true
            },
            relations: {
                timeLogs: {
                    employee: true
                }
            }
        });
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" =:organizationId`), { organizationId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" =:tenantId`), { tenantId });
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employee"."organizationId" =:organizationId`), { organizationId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employee"."tenantId" =:tenantId`), { tenantId });
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"employee"."id" IN (:...employeeIds)`), { employeeIds });
            }
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."organizationId" =:organizationId`), { organizationId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."tenantId" =:tenantId`), { tenantId });
            const { start, end } = (0, utils_1.getDateRangeFormat)(moment_extend_1.moment.utc(startDate), moment_extend_1.moment.utc(endDate));
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."startedAt" >= :startDate AND "timeLogs"."startedAt" < :endDate`), {
                startDate: start,
                endDate: end
            });
            if ((0, index_1.isNotEmpty)(employeeIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."employeeId" IN (:...employeeIds)`), {
                    employeeIds
                });
            }
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeLogs"."projectId" IN (:...projectIds)`), {
                    projectIds
                });
            }
        }));
        // Execute the query and retrieve organization contacts
        const organizationContacts = await query.getMany();
        const clients = organizationContacts.map((organizationContact) => {
            const { budgetType, timeLogs = [], ...contactWithoutTimeLogs } = organizationContact;
            const budget = organizationContact.budget || 0;
            const spent = timeLogs.reduce((total, log) => {
                const amount = budgetType === contracts_1.OrganizationContactBudgetTypeEnum.HOURS
                    ? total + log.duration / 3600
                    : total + (log.duration / 3600) * (log.employee?.billRateValue || 0);
                return amount;
            }, 0);
            const spentPercentage = (spent * 100) / budget;
            const remainingBudget = Math.max(budget - spent, 0);
            return {
                organizationContact: { ...contactWithoutTimeLogs },
                budgetType,
                budget,
                spent: parseFloat(spent.toFixed(2)),
                remainingBudget: Number.isFinite(remainingBudget) ? parseFloat(remainingBudget.toFixed(2)) : 0,
                spentPercentage: Number.isFinite(spentPercentage) ? parseFloat(spentPercentage.toFixed(2)) : 0
            };
        });
        return clients;
    }
    /**
     * Modifies the provided query to filter TimeLogs based on the given criteria.
     * @param query - The query to be modified.
     * @param request - The criteria for filtering TimeLogs.
     * @returns The modified query.
     */
    getFilterTimeLogQuery(query, request) {
        const { organizationId, projectIds = [], teamIds = [] } = request;
        let { employeeIds = [] } = request;
        const tenantId = context_1.RequestContext.currentTenantId();
        const user = context_1.RequestContext.currentUser();
        // Check if the current user has the permission to change the selected employee
        const hasChangeSelectedEmployeePermission = context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE);
        // Determine if the request specifies to retrieve data for the current user only
        const isOnlyMeSelected = request.onlyMe;
        // Set employeeIds based on permissions and request
        if ((user.employeeId && isOnlyMeSelected) || (!hasChangeSelectedEmployeePermission && user.employeeId)) {
            employeeIds = [user.employeeId];
        }
        // Filters records based on the timesheetId.
        if ((0, index_1.isNotEmpty)(request.timesheetId)) {
            const { timesheetId } = request;
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."timesheetId" = :timesheetId`), { timesheetId });
        }
        // Filters records based on the date range.
        if ((0, index_1.isNotEmpty)(request.startDate) && (0, index_1.isNotEmpty)(request.endDate)) {
            const { start: startDate, end: endDate } = (0, utils_1.getDateRangeFormat)(moment_extend_1.moment.utc(request.startDate || (0, moment_extend_1.moment)().startOf('day')), moment_extend_1.moment.utc(request.endDate || (0, moment_extend_1.moment)().endOf('day')));
            query.andWhere(new typeorm_1.Brackets((qb) => {
                qb.where((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."startedAt" >= :startDate`), { startDate });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."startedAt" < :endDate`), { endDate });
            }));
        }
        // Filter by organization employee IDs if used in the request
        if ((0, index_1.isNotEmpty)(employeeIds)) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."employeeId" IN (:...employeeIds)`), { employeeIds });
        }
        // Filter by organization project IDs if used in the request
        if ((0, index_1.isNotEmpty)(projectIds)) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IN (:...projectIds)`), { projectIds });
        }
        // Filter by organization team IDs if used in the request
        if ((0, index_1.isNotEmpty)(teamIds)) {
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationTeamId" IN (:...teamIds)`), { teamIds });
        }
        // Filters records based on the overall column, representing the activity level.
        if ((0, index_1.isNotEmpty)(request.activityLevel)) {
            /**
             * Activity Level should be 0-100%
             * Convert it into a 10-minute time slot by multiplying by 6
             */
            const { activityLevel } = request;
            query.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeSlots"."overall" BETWEEN :start AND :end`), {
                start: activityLevel.start * 6,
                end: activityLevel.end * 6
            });
        }
        // Filters records based on the source column.
        if ((0, index_1.isNotEmpty)(request.source)) {
            const { source } = request;
            const condition = source instanceof Array
                ? (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."source" IN (:...source)`)
                : (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."source" = :source`);
            query.andWhere(condition, { source });
        }
        // Filters records based on the logType column.
        if ((0, index_1.isNotEmpty)(request.logType)) {
            const { logType } = request;
            const condition = logType instanceof Array
                ? (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."logType" IN (:...logType)`)
                : (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."logType" = :logType`);
            query.andWhere(condition, { logType });
        }
        /**
         * Apply a condition to the TypeORM query based on the 'isEdited' property in the request.
         * If 'isEdited' is true, filter rows where the 'editedAt' column is not null.
         * If 'isEdited' is false, filter rows where the 'editedAt' column is null.
         */
        if ('isEdited' in request) {
            if (request.isEdited) {
                query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."editedAt" IS NOT NULL`));
            }
            else {
                query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."editedAt" IS NULL`));
            }
        }
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeSlots"."tenantId" = :tenantId`), { tenantId });
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"timeSlots"."organizationId" = :organizationId`), { organizationId });
        return query;
    }
    /**
     * Adds a manual time log entry.
     *
     * @param request The input data for the manual time log.
     * @returns The created time log entry.
     */
    async addManualTime(request) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { employeeId, startedAt, stoppedAt, organizationId } = request;
            // Validate input
            if (!startedAt || !stoppedAt) {
                throw new common_1.BadRequestException('Please select valid Date, start time and end time');
            }
            // Retrieve employee information
            const employee = await this.typeOrmEmployeeRepository.findOne({
                where: { id: employeeId },
                relations: { organization: true }
            });
            //
            const futureDateAllowed = employee.organization.futureDateAllowed;
            // Check if the selected date and time range is allowed for the organization
            const isDateAllow = this.allowDate(startedAt, stoppedAt, futureDateAllowed);
            if (!isDateAllow) {
                throw new common_1.BadRequestException('Please select valid Date, start time and end time');
            }
            // Check for conflicts with existing time logs
            const conflicts = await this.commandBus.execute(new commands_1.IGetConflictTimeLogCommand({
                startDate: startedAt,
                endDate: stoppedAt,
                employeeId,
                organizationId,
                tenantId,
                ...(request.id ? { ignoreId: request.id } : {})
            }));
            // Resolve conflicts by deleting conflicting time slots
            if (conflicts && conflicts.length > 0) {
                const times = {
                    start: new Date(startedAt),
                    end: new Date(stoppedAt)
                };
                for await (const timeLog of conflicts) {
                    const { timeSlots = [] } = timeLog;
                    for await (const timeSlot of timeSlots) {
                        await this.commandBus.execute(new commands_1.DeleteTimeSpanCommand(times, timeLog, timeSlot));
                    }
                }
            }
            // Create the new time log entry
            return await this.commandBus.execute(new commands_1.TimeLogCreateCommand(request));
        }
        catch (error) {
            // Handle exceptions appropriately
            throw new common_1.BadRequestException('Failed to add manual time log');
        }
    }
    /**
     * Updates a manual time log entry.
     *
     * @param id The ID of the time log entry to be updated.
     * @param request The updated data for the manual time log.
     * @returns The updated time log entry.
     */
    async updateManualTime(id, request) {
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const { startedAt, stoppedAt, employeeId, organizationId } = request;
            // Validate input
            if (!startedAt || !stoppedAt) {
                throw new common_1.BadRequestException('Please select valid Date start and end time');
            }
            // Retrieve employee information
            const employee = await this.typeOrmEmployeeRepository.findOne({
                where: { id: employeeId },
                relations: { organization: true }
            });
            //
            const futureDateAllowed = employee.organization.futureDateAllowed;
            // Check if the selected date and time range is allowed for the organization
            const isDateAllow = this.allowDate(startedAt, stoppedAt, futureDateAllowed);
            if (!isDateAllow) {
                throw new common_1.BadRequestException('Please select valid Date, start time and end time');
            }
            // Check for conflicts with existing time logs
            const timeLog = await this.typeOrmRepository.findOneBy({
                id: id
            });
            // Check for conflicts with existing time logs
            const conflicts = await this.commandBus.execute(new commands_1.IGetConflictTimeLogCommand({
                startDate: startedAt,
                endDate: stoppedAt,
                employeeId,
                organizationId,
                tenantId,
                ...(id ? { ignoreId: id } : {})
            }));
            // Resolve conflicts by deleting conflicting time slots
            if ((0, index_1.isNotEmpty)(conflicts)) {
                const times = {
                    start: new Date(startedAt),
                    end: new Date(stoppedAt)
                };
                for await (const timeLog of conflicts) {
                    const { timeSlots = [] } = timeLog;
                    for await (const timeSlot of timeSlots) {
                        await this.commandBus.execute(new commands_1.DeleteTimeSpanCommand(times, timeLog, timeSlot));
                    }
                }
            }
            // Update the last edited date for the manual time log
            request.editedAt = new Date();
            // Execute the command to update the time log
            await this.commandBus.execute(new commands_1.TimeLogUpdateCommand(request, timeLog));
            // Retrieve the updated time log entry
            return await this.typeOrmRepository.findOneBy({ id: request.id });
        }
        catch (error) {
            // Handle exceptions appropriately
            throw new common_1.BadRequestException('Failed to update manual time log');
        }
    }
    /**
     *
     * @param params
     * @returns
     */
    async deleteTimeLogs(params) {
        let logIds = params.logIds;
        if ((0, index_1.isEmpty)(logIds)) {
            throw new common_1.NotAcceptableException('You can not delete time logs');
        }
        if (typeof logIds === 'string') {
            logIds = [logIds];
        }
        const tenantId = context_1.RequestContext.currentTenantId();
        const user = context_1.RequestContext.currentUser();
        const { organizationId, forceDelete } = params;
        const query = this.typeOrmRepository.createQueryBuilder('time_log');
        query.setFindOptions({
            relations: {
                timeSlots: true
            }
        });
        query.where((db) => {
            db.andWhere({
                ...(context_1.RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)
                    ? {}
                    : {
                        employeeId: user.employeeId
                    })
            });
            db.andWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${db.alias}"."tenantId" = :tenantId`), {
                    tenantId
                });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${db.alias}"."organizationId" = :organizationId`), { organizationId });
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${db.alias}"."id" IN (:...logIds)`), {
                    logIds
                });
            }));
        });
        const timeLogs = await query.getMany();
        return await this.commandBus.execute(new commands_1.TimeLogDeleteCommand(timeLogs, forceDelete));
    }
    /**
     * Check if the provided date range is allowed.
     *
     * @param start - Start date
     * @param end - End date
     * @param organization - Organization object
     * @returns {boolean} - Returns true if the date range is allowed, otherwise false.
     */
    allowDate(start, end, futureDateAllowed) {
        // Check if the start date is before the end date
        if (!moment_extend_1.moment.utc(start).isBefore(moment_extend_1.moment.utc(end))) {
            return false;
        }
        // Check if future dates are allowed for the organization
        if (futureDateAllowed) {
            return true;
        }
        // Check if the end date is on or before the current date
        return (0, moment_extend_1.moment)(end).isSameOrBefore((0, moment_extend_1.moment)());
    }
};
exports.TimeLogService = TimeLogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        mikro_orm_time_log_repository_1.MikroOrmTimeLogRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        mikro_orm_employee_repository_1.MikroOrmEmployeeRepository,
        type_orm_organization_project_repository_1.TypeOrmOrganizationProjectRepository,
        mikro_orm_organization_project_repository_1.MikroOrmOrganizationProjectRepository,
        type_orm_organization_contact_repository_1.TypeOrmOrganizationContactRepository,
        mikro_orm_organization_contact_repository_1.MikroOrmOrganizationContactRepository,
        cqrs_1.CommandBus])
], TimeLogService);
//# sourceMappingURL=time-log.service.js.map