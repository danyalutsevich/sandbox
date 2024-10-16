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
exports.Deal = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_deal_repository_1 = require("./repository/mikro-orm-deal.repository");
let Deal = exports.Deal = class Deal extends internal_1.TenantOrganizationBaseEntity {
    title;
    probability;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * User
     */
    createdBy;
    createdByUserId;
    /**
     * PipelineStage
     */
    stage;
    stageId;
    /*
    |--------------------------------------------------------------------------
    | @OneToOne
    |--------------------------------------------------------------------------
    */
    /**
     * OrganizationContact
     */
    client;
    clientId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Deal.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], Deal.prototype, "probability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.User }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, {
        joinColumn: 'createdByUserId',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'createdByUserId' }),
    __metadata("design:type", Object)
], Deal.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.createdBy),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], Deal.prototype, "createdByUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.PipelineStage }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.PipelineStage, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Deal.prototype, "stage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.stage),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], Deal.prototype, "stageId", void 0);
__decorate([
    (0, entity_1.MultiORMOneToOne)(() => internal_1.OrganizationContact, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        /** This column is a boolean flag indicating whether the current entity is the 'owning' side of a relationship.  */
        owner: true
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Deal.prototype, "client", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.client),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], Deal.prototype, "clientId", void 0);
exports.Deal = Deal = __decorate([
    (0, entity_1.MultiORMEntity)('deal', { mikroOrmRepository: () => mikro_orm_deal_repository_1.MikroOrmDealRepository })
], Deal);
//# sourceMappingURL=deal.entity.js.map