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
exports.ExpenseCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const expense_categories_service_1 = require("./expense-categories.service");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const dto_1 = require("./dto");
const commands_1 = require("./commands");
let ExpenseCategoriesController = exports.ExpenseCategoriesController = class ExpenseCategoriesController extends crud_1.CrudController {
    _expenseCategoriesService;
    _commandBus;
    constructor(_expenseCategoriesService, _commandBus) {
        super(_expenseCategoriesService);
        this._expenseCategoriesService = _expenseCategoriesService;
        this._commandBus = _commandBus;
    }
    /**
     * GET all expense categories by pagination
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        return this._expenseCategoriesService.paginate(options);
    }
    /**
     * GET all expense categories
     *
     *
     * @param data
     * @returns
     */
    async findAll(options) {
        return await this._expenseCategoriesService.findAll(options);
    }
    /**
     * CREATE expense category
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this._commandBus.execute(new commands_1.ExpenseCategoryCreateCommand(entity));
    }
    /**
     * UPDATE expense category by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this._commandBus.execute(new commands_1.ExpenseCategoryUpdateCommand(id, entity));
    }
};
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_EXPENSES_VIEW),
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "pagination", null);
__decorate([
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_EXPENSES_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateExpenseCategoryDTO]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateExpenseCategoryDTO]),
    __metadata("design:returntype", Promise)
], ExpenseCategoriesController.prototype, "update", null);
exports.ExpenseCategoriesController = ExpenseCategoriesController = __decorate([
    (0, swagger_1.ApiTags)('ExpenseCategories'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_EXPENSES_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [expense_categories_service_1.ExpenseCategoriesService,
        cqrs_1.CommandBus])
], ExpenseCategoriesController);
//# sourceMappingURL=expense-categories.controller.js.map