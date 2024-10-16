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
exports.TaskEstimation = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const internal_1 = require("./../../core/entities/internal");
const entity_1 = require("./../../core/decorators/entity");
const mikro_orm_estimation_repository_1 = require("./repository/mikro-orm-estimation.repository");
let TaskEstimation = exports.TaskEstimation = class TaskEstimation extends internal_1.TenantOrganizationBaseEntity {
    estimate;
    employeeId;
    taskId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    employee;
    task;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], TaskEstimation.prototype, "estimate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], TaskEstimation.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.task),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], TaskEstimation.prototype, "taskId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (employee) => employee.estimations, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], TaskEstimation.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Task }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Task, (task) => task.estimations, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], TaskEstimation.prototype, "task", void 0);
exports.TaskEstimation = TaskEstimation = __decorate([
    (0, entity_1.MultiORMEntity)('task_estimation', { mikroOrmRepository: () => mikro_orm_estimation_repository_1.MikroOrmTaskEstimationRepository })
], TaskEstimation);
//# sourceMappingURL=task-estimation.entity.js.map