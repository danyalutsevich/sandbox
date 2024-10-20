"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExpenseCategoriesModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const expense_category_entity_1 = require("./expense-category.entity");
const expense_categories_service_1 = require("./expense-categories.service");
const expense_categories_controller_1 = require("./expense-categories.controller");
const handlers_1 = require("./commands/handlers");
const repository_1 = require("./repository");
let ExpenseCategoriesModule = exports.ExpenseCategoriesModule = ExpenseCategoriesModule_1 = class ExpenseCategoriesModule {
};
exports.ExpenseCategoriesModule = ExpenseCategoriesModule = ExpenseCategoriesModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/expense-categories', module: ExpenseCategoriesModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([expense_category_entity_1.ExpenseCategory]),
            nestjs_1.MikroOrmModule.forFeature([expense_category_entity_1.ExpenseCategory]),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            cqrs_1.CqrsModule
        ],
        controllers: [expense_categories_controller_1.ExpenseCategoriesController],
        providers: [expense_categories_service_1.ExpenseCategoriesService, repository_1.TypeOrmExpenseCategoryRepository, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, expense_categories_service_1.ExpenseCategoriesService, repository_1.TypeOrmExpenseCategoryRepository]
    })
], ExpenseCategoriesModule);
//# sourceMappingURL=expense-categories.module.js.map