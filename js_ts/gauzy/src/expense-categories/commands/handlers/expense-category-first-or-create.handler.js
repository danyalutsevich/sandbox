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
exports.ExpenseCategoryFirstOrCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const expense_category_first_or_create_command_1 = require("./../expense-category-first-or-create.command");
const expense_categories_service_1 = require("./../../expense-categories.service");
const context_1 = require("../../../core/context");
const expense_category_create_command_1 = require("../expense-category-create.command");
let ExpenseCategoryFirstOrCreateHandler = exports.ExpenseCategoryFirstOrCreateHandler = class ExpenseCategoryFirstOrCreateHandler {
    _expenseCategoryService;
    _commandBus;
    constructor(_expenseCategoryService, _commandBus) {
        this._expenseCategoryService = _expenseCategoryService;
        this._commandBus = _commandBus;
    }
    async execute(command) {
        const { input } = command;
        try {
            const { organizationId, name } = input;
            const tenantId = context_1.RequestContext.currentTenantId();
            return await this._expenseCategoryService.findOneByWhereOptions({
                tenantId,
                organizationId,
                name
            });
        }
        catch (error) {
            return await this._commandBus.execute(new expense_category_create_command_1.ExpenseCategoryCreateCommand(input));
        }
    }
};
exports.ExpenseCategoryFirstOrCreateHandler = ExpenseCategoryFirstOrCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(expense_category_first_or_create_command_1.ExpenseCategoryFirstOrCreateCommand),
    __metadata("design:paramtypes", [expense_categories_service_1.ExpenseCategoriesService,
        cqrs_1.CommandBus])
], ExpenseCategoryFirstOrCreateHandler);
//# sourceMappingURL=expense-category-first-or-create.handler.js.map