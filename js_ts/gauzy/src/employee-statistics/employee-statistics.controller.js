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
exports.EmployeeStatisticsController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const employee_statistics_service_1 = require("./employee-statistics.service");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const queries_1 = require("./queries");
const dto_1 = require("./dto");
let EmployeeStatisticsController = exports.EmployeeStatisticsController = class EmployeeStatisticsController {
    employeeStatisticsService;
    queryBus;
    constructor(employeeStatisticsService, queryBus) {
        this.employeeStatisticsService = employeeStatisticsService;
        this.queryBus = queryBus;
    }
    async findAggregatedByOrganizationId(data) {
        const { findInput } = data;
        return this.queryBus.execute(new queries_1.AggregatedEmployeeStatisticQuery(findInput));
    }
    async findAllByEmloyeeId(id, data) {
        const { findInput } = data;
        return this.employeeStatisticsService.getStatisticsByEmployeeId(id, findInput);
    }
    async findAggregatedStatisticsByEmployeeId(options) {
        return await this.queryBus.execute(new queries_1.MonthAggregatedEmployeeStatisticsQuery(options));
    }
    async findEmployeeStatisticsHistory(data) {
        const { findInput } = data;
        return this.queryBus.execute(new queries_1.EmployeeStatisticsHistoryQuery(findInput));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find aggregate for all employees by organization id'
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Found records' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No records found'
    }),
    (0, common_1.Get)('/aggregate'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeStatisticsController.prototype, "findAggregatedByOrganizationId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find by id' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Found one record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('/months/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeStatisticsController.prototype, "findAllByEmloyeeId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find Aggregated Statistics by Employee id, valueDate and past N months'
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Found one record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('/months'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.EmployeeAggregatedStatisticByMonthQueryDTO]),
    __metadata("design:returntype", Promise)
], EmployeeStatisticsController.prototype, "findAggregatedStatisticsByEmployeeId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find Statistics History by Employee id, valueDate and past N months'
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Found one record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('/history'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeStatisticsController.prototype, "findEmployeeStatisticsHistory", null);
exports.EmployeeStatisticsController = EmployeeStatisticsController = __decorate([
    (0, swagger_1.ApiTags)('EmployeeStatistics'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [employee_statistics_service_1.EmployeeStatisticsService,
        cqrs_1.QueryBus])
], EmployeeStatisticsController);
//# sourceMappingURL=employee-statistics.controller.js.map