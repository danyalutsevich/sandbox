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
exports.OrganizationRecurringExpenseController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const organization_recurring_expense_entity_1 = require("./organization-recurring-expense.entity");
const organization_recurring_expense_service_1 = require("./organization-recurring-expense.service");
const commands_1 = require("./commands");
const queries_1 = require("./queries");
let OrganizationRecurringExpenseController = exports.OrganizationRecurringExpenseController = class OrganizationRecurringExpenseController extends crud_1.CrudController {
    commandBus;
    queryBus;
    organizationRecurringExpenseService;
    constructor(commandBus, queryBus, organizationRecurringExpenseService) {
        super(organizationRecurringExpenseService);
        this.commandBus = commandBus;
        this.queryBus = queryBus;
        this.organizationRecurringExpenseService = organizationRecurringExpenseService;
    }
    /**
     * GET organization recurring expense by month
     *
     * @param data
     * @returns
     */
    async findAllExpenses(data) {
        const { findInput } = data;
        return this.queryBus.execute(new queries_1.OrganizationRecurringExpenseByMonthQuery(findInput));
    }
    /**
     * GET date update type & conflicting expenses
     *
     * @param data
     * @returns
     */
    async findStartDateUpdateType(data) {
        const { findInput } = data;
        return this.queryBus.execute(new queries_1.OrganizationRecurringExpenseStartDateUpdateTypeQuery(findInput));
    }
    /**
     * GET organization recurring expenses/split expense for employee
     *
     * @param data
     * @param orgId
     * @returns
     */
    async getSplitExpensesForEmployee(data, organizationId) {
        const { findInput } = data;
        return this.queryBus.execute(new queries_1.OrganizationRecurringExpenseFindSplitExpenseQuery(organizationId, findInput));
    }
    /**
     * GET all organization recurring expenses
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { findInput, order = {} } = data;
        return this.organizationRecurringExpenseService.findAll({
            where: findInput,
            order: order
        });
    }
    /**
     * CREATE organization recurring expense
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return this.commandBus.execute(new commands_1.OrganizationRecurringExpenseCreateCommand(entity));
    }
    /**
     * UPDATE organization recurring expense by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return this.commandBus.execute(new commands_1.OrganizationRecurringExpenseEditCommand(id, entity));
    }
    /**
     * DELETE organization recurring expense by id
     *
     * @param id
     * @param data
     * @returns
     */
    async delete(id, data) {
        const { deleteInput } = data;
        return this.commandBus.execute(new commands_1.OrganizationRecurringExpenseDeleteCommand(id, deleteInput));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization recurring expense by month.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization recurring expense',
        type: organization_recurring_expense_entity_1.OrganizationRecurringExpense
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('/month'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationRecurringExpenseController.prototype, "findAllExpenses", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find start date update type & conflicting expenses for the update'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found start date update type'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('/date-update-type'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationRecurringExpenseController.prototype, "findStartDateUpdateType", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization recurring expenses for given employee, also known as split recurring expenses.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization recurring expense'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('/employee/:organizationId'),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __param(1, (0, common_1.Param)('organizationId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrganizationRecurringExpenseController.prototype, "getSplitExpensesForEmployee", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all organization recurring expenses.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found organization recurring expense',
        type: organization_recurring_expense_entity_1.OrganizationRecurringExpense
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationRecurringExpenseController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new organization recurring expense' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The organization recurring expense has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_recurring_expense_entity_1.OrganizationRecurringExpense]),
    __metadata("design:returntype", Promise)
], OrganizationRecurringExpenseController.prototype, "create", null);
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
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrganizationRecurringExpenseController.prototype, "update", null);
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
], OrganizationRecurringExpenseController.prototype, "delete", null);
exports.OrganizationRecurringExpenseController = OrganizationRecurringExpenseController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationRecurringExpense'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus,
        organization_recurring_expense_service_1.OrganizationRecurringExpenseService])
], OrganizationRecurringExpenseController);
//# sourceMappingURL=organization-recurring-expense.controller.js.map