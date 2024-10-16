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
exports.EmployeeRecurringExpenseController = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
const employee_recurring_expense_query_dto_1 = require("./dto/employee-recurring-expense-query.dto");
const employee_recurring_expense_entity_1 = require("./employee-recurring-expense.entity");
const employee_recurring_expense_service_1 = require("./employee-recurring-expense.service");
const queries_1 = require("./queries");
let EmployeeRecurringExpenseController = exports.EmployeeRecurringExpenseController = class EmployeeRecurringExpenseController extends crud_1.CrudController {
    employeeRecurringExpenseService;
    queryBus;
    commandBus;
    constructor(employeeRecurringExpenseService, queryBus, commandBus) {
        super(employeeRecurringExpenseService);
        this.employeeRecurringExpenseService = employeeRecurringExpenseService;
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    async findAllByMonth(options) {
        return await this.queryBus.execute(new queries_1.EmployeeRecurringExpenseByMonthQuery(options, options.relations));
    }
    async findStartDateUpdateType(data) {
        const { findInput } = data;
        return this.queryBus.execute(new queries_1.EmployeeRecurringExpenseStartDateUpdateTypeQuery(findInput));
    }
    async findAll(params) {
        try {
            return this.employeeRecurringExpenseService.findAll({
                ...((params && params.relations) ? {
                    relations: params.relations
                } : {}),
                ...((params && params.where) ? {
                    where: params.where
                } : {}),
                ...((params && params.order) ? {
                    order: params.order
                } : {}),
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async create(entity) {
        return await this.commandBus.execute(new commands_1.EmployeeRecurringExpenseCreateCommand(entity));
    }
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.EmployeeRecurringExpenseEditCommand(id, entity));
    }
    async delete(id, data) {
        const { deleteInput } = data;
        return await this.commandBus.execute(new commands_1.EmployeeRecurringExpenseDeleteCommand(id, deleteInput));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all employee recurring expense by month.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found employee recurring expense by month',
        type: employee_recurring_expense_entity_1.EmployeeRecurringExpense
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EMPLOYEE_EXPENSES_VIEW),
    (0, common_1.Get)('month'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employee_recurring_expense_query_dto_1.EmployeeRecurringExpenseQueryDTO]),
    __metadata("design:returntype", Promise)
], EmployeeRecurringExpenseController.prototype, "findAllByMonth", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find the start date update type for a recurring expense.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found start date update type'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EMPLOYEE_EXPENSES_VIEW),
    (0, common_1.Get)('date-update-type'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeRecurringExpenseController.prototype, "findStartDateUpdateType", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all employee recurring expenses.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found employee recurring expense',
        type: employee_recurring_expense_entity_1.EmployeeRecurringExpense
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EMPLOYEE_EXPENSES_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], EmployeeRecurringExpenseController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new expense' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The expense has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({
        transform: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateEmployeeRecurringExpenseDTO]),
    __metadata("design:returntype", Promise)
], EmployeeRecurringExpenseController.prototype, "create", null);
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
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({
        transform: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateEmployeeRecurringExpenseDTO]),
    __metadata("design:returntype", Promise)
], EmployeeRecurringExpenseController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete record' }),
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
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeRecurringExpenseController.prototype, "delete", null);
exports.EmployeeRecurringExpenseController = EmployeeRecurringExpenseController = __decorate([
    (0, swagger_1.ApiTags)('EmployeeRecurringExpense'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.EMPLOYEE_EXPENSES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [employee_recurring_expense_service_1.EmployeeRecurringExpenseService,
        cqrs_1.QueryBus,
        cqrs_1.CommandBus])
], EmployeeRecurringExpenseController);
//# sourceMappingURL=employee-recurring-expense.controller.js.map