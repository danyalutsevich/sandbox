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
exports.TimeOffRequest = void 0;
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_time_off_request_repository_1 = require("./repository/mikro-orm-time-off-request.repository");
let TimeOffRequest = exports.TimeOffRequest = class TimeOffRequest extends internal_1.TenantOrganizationBaseEntity {
    documentUrl;
    description;
    start;
    end;
    requestDate;
    status;
    isHoliday;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    // TimeOff Policy
    policy;
    policyId;
    /**
     * Document Asset
     */
    document;
    documentId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    employees;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "documentUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], TimeOffRequest.prototype, "start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], TimeOffRequest.prototype, "end", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, class_validator_1.IsDate)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], TimeOffRequest.prototype, "requestDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.StatusTypesEnum }),
    (0, class_validator_1.IsEnum)(index_1.StatusTypesEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], TimeOffRequest.prototype, "isHoliday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.TimeOffPolicy }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.TimeOffPolicy, (policy) => policy.timeOffRequests, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TimeOffRequest.prototype, "policy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.policy),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], TimeOffRequest.prototype, "policyId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL',
        /** Eager relations are always loaded automatically when relation's owner entity is loaded using find* methods. */
        eager: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], TimeOffRequest.prototype, "document", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.document),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], TimeOffRequest.prototype, "documentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Employee, (employee) => employee.timeOffRequests, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], TimeOffRequest.prototype, "employees", void 0);
exports.TimeOffRequest = TimeOffRequest = __decorate([
    (0, entity_1.MultiORMEntity)('time_off_request', { mikroOrmRepository: () => mikro_orm_time_off_request_repository_1.MikroOrmTimeOffRequestRepository })
], TimeOffRequest);
//# sourceMappingURL=time-off-request.entity.js.map