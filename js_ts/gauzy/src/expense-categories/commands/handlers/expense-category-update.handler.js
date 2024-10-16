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
exports.ExpenseCategoryUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const expense_category_update_command_1 = require("./../expense-category-update.command");
const expense_categories_service_1 = require("./../../expense-categories.service");
let ExpenseCategoryUpdateHandler = exports.ExpenseCategoryUpdateHandler = class ExpenseCategoryUpdateHandler {
    _expenseCategoryService;
    constructor(_expenseCategoryService) {
        this._expenseCategoryService = _expenseCategoryService;
    }
    async execute(command) {
        const { id, input } = command;
        try {
            return await this._expenseCategoryService.create({
                id,
                ...input
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.ExpenseCategoryUpdateHandler = ExpenseCategoryUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(expense_category_update_command_1.ExpenseCategoryUpdateCommand),
    __metadata("design:paramtypes", [expense_categories_service_1.ExpenseCategoriesService])
], ExpenseCategoryUpdateHandler);
//# sourceMappingURL=expense-category-update.handler.js.map