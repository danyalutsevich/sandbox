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
exports.ExpenseCategoryAlreadyExistConstraint = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const context_1 = require("../../../core/context");
const utils_1 = require("../../../core/utils");
const repository_1 = require("../../../expense-categories/repository");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
/**
 * Expense category already existed validation constraint
 *
 * @param validationOptions
 * @returns
 */
let ExpenseCategoryAlreadyExistConstraint = exports.ExpenseCategoryAlreadyExistConstraint = class ExpenseCategoryAlreadyExistConstraint {
    typeOrmExpenseCategoryRepository;
    mikroOrmExpenseCategoryRepository;
    constructor(typeOrmExpenseCategoryRepository, mikroOrmExpenseCategoryRepository) {
        this.typeOrmExpenseCategoryRepository = typeOrmExpenseCategoryRepository;
        this.mikroOrmExpenseCategoryRepository = mikroOrmExpenseCategoryRepository;
    }
    /**
     * Validates if a given name for an expense category is unique within the specified organization.
     *
     * @param name - The name of the expense category to validate.
     * @param args - Validation arguments containing additional contextual information.
     * @returns True if the name is unique (or in the case of an update, not matching any other than itself), otherwise false.
     */
    async validate(name, args) {
        const object = args.object;
        const organizationId = object.organizationId || object.organization?.id;
        if (!organizationId)
            return true; // Validation passes if there's no organization context
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            const queryConditions = { name, organizationId, tenantId };
            if (args.targetName === 'UpdateExpenseCategoryDTO' && object.id) {
                queryConditions['id'] = (0, typeorm_1.Not)(object.id); // Exclude current category from the check
            }
            switch (ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    return !await this.mikroOrmExpenseCategoryRepository.findOneOrFail(queryConditions);
                case utils_1.MultiORMEnum.TypeORM:
                    return !await this.typeOrmExpenseCategoryRepository.findOneByOrFail(queryConditions);
                default:
                    throw new Error(`Not implemented for ${ormType}`);
            }
        }
        catch (error) {
            // Consider logging or handling different types of errors explicitly
            return true; // Name doesn't exist, validation passes
        }
    }
    /**
     * Gets default message when validation for this constraint fail.
     */
    defaultMessage(validationArguments) {
        const { value } = validationArguments;
        return `The category '${value}' already exists. Please choose a different name for the new category.`;
    }
};
exports.ExpenseCategoryAlreadyExistConstraint = ExpenseCategoryAlreadyExistConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsExpenseCategoryAlreadyExist", async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmExpenseCategoryRepository,
        repository_1.MikroOrmExpenseCategoryRepository])
], ExpenseCategoryAlreadyExistConstraint);
//# sourceMappingURL=expense-category-already-exist.constraint.js.map