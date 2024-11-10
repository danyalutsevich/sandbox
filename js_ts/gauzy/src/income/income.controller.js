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
exports.IncomeController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const context_1 = require("../core/context");
const crud_1 = require("./../core/crud");
const employee_service_1 = require("../employee/employee.service");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
const income_entity_1 = require("./income.entity");
const income_service_1 = require("./income.service");
const dto_1 = require("./dto");
let IncomeController = exports.IncomeController = class IncomeController extends crud_1.CrudController {
    incomeService;
    employeeService;
    commandBus;
    constructor(incomeService, employeeService, commandBus) {
        super(incomeService);
        this.incomeService = incomeService;
        this.employeeService = employeeService;
        this.commandBus = commandBus;
    }
    async findMyIncome(data) {
        const { relations, findInput, filterDate } = data;
        //If user is not an employee, then this will return 404
        const employee = await this.employeeService.findOneByWhereOptions({
            userId: context_1.RequestContext.currentUserId()
        });
        return this.incomeService.findAllIncomes({ where: { ...findInput, employeeId: employee.id }, relations }, filterDate);
    }
    /**
     * GET income count
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.incomeService.countBy(options);
    }
    async pagination(params) {
        return await this.incomeService.pagination(params);
    }
    async findAll(data) {
        const { relations, findInput, filterDate } = data;
        return this.incomeService.findAllIncomes({ where: findInput, relations }, filterDate);
    }
    /**
     * Find income by primary ID
     *
     * @param id
     * @returns
     */
    async findById(id) {
        return await this.incomeService.findOneByIdString(id);
    }
    async create(entity) {
        return await this.commandBus.execute(new commands_1.IncomeCreateCommand(entity));
    }
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.IncomeUpdateCommand(id, entity));
    }
    async delete(incomeId, options) {
        return await this.commandBus.execute(new commands_1.IncomeDeleteCommand(options.employeeId, incomeId));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all income.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found income',
        type: income_entity_1.Income
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INCOMES_VIEW),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "findMyIncome", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INCOMES_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "getCount", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INCOMES_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all income.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found income',
        type: income_entity_1.Income
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INCOMES_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INCOMES_VIEW),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.' /*, type: T*/
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateIncomeDTO]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateIncomeDTO]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete record'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.DeleteIncomeDTO]),
    __metadata("design:returntype", Promise)
], IncomeController.prototype, "delete", null);
exports.IncomeController = IncomeController = __decorate([
    (0, swagger_1.ApiTags)('Income'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_INCOMES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [income_service_1.IncomeService,
        employee_service_1.EmployeeService,
        cqrs_1.CommandBus])
], IncomeController);
//# sourceMappingURL=income.controller.js.map