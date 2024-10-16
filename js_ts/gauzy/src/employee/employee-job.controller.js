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
exports.EmployeeJobController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const decorators_1 = require("../shared/decorators");
const guards_1 = require("../shared/guards");
const pipes_1 = require("../shared/pipes");
const crud_1 = require("../core/crud");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
let EmployeeJobController = exports.EmployeeJobController = class EmployeeJobController {
    _commandBus;
    constructor(_commandBus) {
        this._commandBus = _commandBus;
    }
    /**
     * GET employee job statistics.
     *
     * This endpoint retrieves statistics related to employee jobs,
     * providing details about job distribution, assignments, or other related data.
     *
     * @param options Pagination parameters for retrieving the data.
     * @returns A paginated list of employee job statistics.
     */
    async getEmployeeJobsStatistics(options) {
        return await this._commandBus.execute(new commands_1.GetEmployeeJobStatisticsCommand(options));
    }
    /**
     * UPDATE employee's job search status by their IDs
     *
     * This endpoint allows updating the job search status of an employee, given their ID.
     *
     * @param employeeId The unique identifier of the employee whose job search status is being updated.
     * @param entity The updated job search status information.
     * @returns A promise resolving to the updated employee record or an update result.
     */
    async updateJobSearchStatus(employeeId, data) {
        return await this._commandBus.execute(new commands_1.UpdateEmployeeJobSearchStatusCommand(employeeId, data));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve employee job statistics' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Employee job statistics found',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues about what went wrong.',
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_JOB_EMPLOYEE_VIEW),
    (0, common_1.Get)('job-statistics'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], EmployeeJobController.prototype, "getEmployeeJobsStatistics", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update Job Search Status' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Job search status has been successfully updated.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input. The response body may contain clues as to what went wrong.',
    }),
    (0, common_1.Put)(':id/job-search-status'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.EmployeeJobStatisticDTO]),
    __metadata("design:returntype", Promise)
], EmployeeJobController.prototype, "updateJobSearchStatus", null);
exports.EmployeeJobController = EmployeeJobController = __decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_EMPLOYEES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], EmployeeJobController);
//# sourceMappingURL=employee-job.controller.js.map