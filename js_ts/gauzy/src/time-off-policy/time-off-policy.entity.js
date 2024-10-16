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
exports.TimeOffPolicy = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_time_off_policy_repository_1 = require("./repository/mikro-orm-time-off-policy.repository");
let TimeOffPolicy = exports.TimeOffPolicy = class TimeOffPolicy extends internal_1.TenantOrganizationBaseEntity {
    name;
    requiresApproval;
    paid;
    /**
     * TimeOffRequest
     */
    timeOffRequests;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    employees;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], TimeOffPolicy.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Boolean)
], TimeOffPolicy.prototype, "requiresApproval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Boolean)
], TimeOffPolicy.prototype, "paid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.TimeOffRequest, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.TimeOffRequest, (it) => it.policy, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Array)
], TimeOffPolicy.prototype, "timeOffRequests", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Employee, (employee) => employee.timeOffPolicies, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], TimeOffPolicy.prototype, "employees", void 0);
exports.TimeOffPolicy = TimeOffPolicy = __decorate([
    (0, entity_1.MultiORMEntity)('time_off_policy', { mikroOrmRepository: () => mikro_orm_time_off_policy_repository_1.MikroOrmTimeOffPolicyRepository })
], TimeOffPolicy);
//# sourceMappingURL=time-off-policy.entity.js.map