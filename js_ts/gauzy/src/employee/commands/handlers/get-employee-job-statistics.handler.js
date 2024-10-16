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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEmployeeJobStatisticsHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/plugins/integration-ai/dist/index");
const employee_service_1 = require("../../employee.service");
const get_employee_job_statistics_command_1 = require("../get-employee-job-statistics.command");
let GetEmployeeJobStatisticsHandler = exports.GetEmployeeJobStatisticsHandler = class GetEmployeeJobStatisticsHandler {
    employeeService;
    gauzyAIService;
    /**
     *
     * @param employeeService
     * @param gauzyAIService
     */
    constructor(employeeService, gauzyAIService) {
        this.employeeService = employeeService;
        this.gauzyAIService = gauzyAIService;
    }
    /**
     * Executes the GetEmployeeJobStatisticsCommand to fetch paginated employee data
     * and augment it with additional statistics.
     *
     * @param command - The command containing options for pagination.
     * @returns A Promise resolving to an IPagination<IEmployee> with augmented data.
     */
    async execute(command) {
        const { options } = command;
        // Use Promise.all for concurrent requests
        const [paginationResult, employeesStatistics] = await Promise.all([
            this.employeeService.paginate(options),
            this.gauzyAIService.getEmployeesStatistics()
        ]);
        let { items, total } = paginationResult;
        // Create a map for faster lookup
        const employeesStatisticsById = new Map(employeesStatistics.map((statistic) => [statistic.employeeId, statistic]));
        // Combine mappings into a single map function
        items = items.map((employee) => ({
            ...employee,
            ...employeesStatisticsById.get(employee.id) || {} // Use empty object if not found
        }));
        return { items, total };
    }
};
exports.GetEmployeeJobStatisticsHandler = GetEmployeeJobStatisticsHandler = __decorate([
    (0, cqrs_1.CommandHandler)(get_employee_job_statistics_command_1.GetEmployeeJobStatisticsCommand),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService, typeof (_a = typeof index_1.GauzyAIService !== "undefined" && index_1.GauzyAIService) === "function" ? _a : Object])
], GetEmployeeJobStatisticsHandler);
//# sourceMappingURL=get-employee-job-statistics.handler.js.map