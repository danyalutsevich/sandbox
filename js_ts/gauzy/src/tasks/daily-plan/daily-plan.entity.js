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
exports.DailyPlan = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const knex_1 = require("@mikro-orm/knex");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const contracts_1 = require("../../../plugins/contracts");
const entity_1 = require("../../core/decorators/entity");
const internal_1 = require("../../core/entities/internal");
const repository_1 = require("./repository");
let DailyPlan = exports.DailyPlan = class DailyPlan extends internal_1.TenantOrganizationBaseEntity {
    [knex_1.EntityRepositoryType];
    date;
    workTimePlanned;
    status;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Employee
     */
    employee;
    employeeId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Daily Planned Tasks
     */
    tasks;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], DailyPlan.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ type: 'decimal' }),
    __metadata("design:type", Number)
], DailyPlan.prototype, "workTimePlanned", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], DailyPlan.prototype, "status", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], DailyPlan.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], DailyPlan.prototype, "employeeId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Task, (dailyPlan) => dailyPlan.dailyPlans, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        pivotTable: 'daily_plan_task',
        owner: true,
        joinColumn: 'taskId',
        inverseJoinColumn: 'dailyPlanId'
    }),
    (0, typeorm_1.JoinTable)({ name: 'daily_plan_task' }),
    __metadata("design:type", Array)
], DailyPlan.prototype, "tasks", void 0);
exports.DailyPlan = DailyPlan = __decorate([
    (0, entity_1.MultiORMEntity)('daily_plan', { mikroOrmRepository: () => repository_1.MikroOrmDailyPlanRepository })
], DailyPlan);
//# sourceMappingURL=daily-plan.entity.js.map