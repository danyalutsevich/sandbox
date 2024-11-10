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
exports.RequestApproval = void 0;
/*
  - Request Approval is a request which is made by the employee. The employee can ask the approver for approvals different things.
  E.g. business trips, job referral awards, etc.
  - Request Approval table has the many to one relationship to ApprovalPolicy table by approvalPolicyId
  - Request Approval table has the one to many relationships to RequestApprovalEmployee table
  - Request Approval table has the many to many relationships to the Employee table through the RequestApprovalEmployee table.
*/
const typeorm_1 = require("typeorm");
const contracts_1 = require("../../plugins/contracts");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_request_approval_repository_1 = require("./repository/mikro-orm-request-approval.repository");
let RequestApproval = exports.RequestApproval = class RequestApproval extends internal_1.TenantOrganizationBaseEntity {
    name;
    status;
    createdBy;
    createdByName;
    min_count;
    requestId;
    requestType;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
    *  ApprovalPolicy
    */
    approvalPolicy;
    approvalPolicyId;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * RequestApprovalEmployee
     */
    employeeApprovals;
    /**
     * RequestApprovalTeam
     */
    teamApprovals;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    tags;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], RequestApproval.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], RequestApproval.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], RequestApproval.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], RequestApproval.prototype, "createdByName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], RequestApproval.prototype, "min_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], RequestApproval.prototype, "requestId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: contracts_1.ApprovalPolicyTypesStringEnum }),
    (0, class_validator_1.IsEnum)(contracts_1.ApprovalPolicyTypesStringEnum),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], RequestApproval.prototype, "requestType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ApprovalPolicy }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ApprovalPolicy, {
        nullable: true,
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], RequestApproval.prototype, "approvalPolicy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.approvalPolicy),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], RequestApproval.prototype, "approvalPolicyId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.RequestApprovalEmployee, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.RequestApprovalEmployee, (employeeApprovals) => employeeApprovals.requestApproval, {
        cascade: true
    }),
    __metadata("design:type", Array)
], RequestApproval.prototype, "employeeApprovals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.RequestApprovalTeam, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.RequestApprovalTeam, (teamApprovals) => teamApprovals.requestApproval, {
        cascade: true
    }),
    __metadata("design:type", Array)
], RequestApproval.prototype, "teamApprovals", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => internal_1.RequestApprovalTeam, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.requestApprovals, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_request_approval',
        joinColumn: 'requestApprovalId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_request_approval'
    }),
    __metadata("design:type", Array)
], RequestApproval.prototype, "tags", void 0);
exports.RequestApproval = RequestApproval = __decorate([
    (0, entity_1.MultiORMEntity)('request_approval', { mikroOrmRepository: () => mikro_orm_request_approval_repository_1.MikroOrmRequestApprovalRepository })
], RequestApproval);
//# sourceMappingURL=request-approval.entity.js.map