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
exports.Integration = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const pipes_1 = require("./../shared/pipes");
const internal_1 = require("../core/entities/internal");
const integration_type_entity_1 = require("./integration-type.entity");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_integration_repository_1 = require("./repository/mikro-orm-integration.repository");
let Integration = exports.Integration = class Integration extends internal_1.BaseEntity {
    name;
    provider;
    redirectUrl;
    imgSrc;
    isComingSoon;
    isPaid;
    version;
    docUrl;
    isFreeTrial;
    freeTrialPeriod;
    order;
    /** Additional virtual columns */
    fullImgUrl;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     *
     */
    integrationTypes;
    /**
     *
     */
    tags;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)() // Define a unique constraint on the "name" column
    ,
    __metadata("design:type", String)
], Integration.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }) // Define a unique constraint on the "provider" column (E.g github, jira, hubstaff)
    ,
    __metadata("design:type", String)
], Integration.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Integration.prototype, "redirectUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Integration.prototype, "imgSrc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Integration.prototype, "isComingSoon", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Integration.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Integration.prototype, "version", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Integration.prototype, "docUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], Integration.prototype, "isFreeTrial", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        default: 0,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Integration.prototype, "freeTrialPeriod", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Number }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], Integration.prototype, "order", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", String)
], Integration.prototype, "fullImgUrl", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => integration_type_entity_1.IntegrationType, (it) => it.integrations, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'integration_integration_type',
        joinColumn: 'integrationId',
        inverseJoinColumn: 'integrationTypeId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'integration_integration_type'
    }),
    __metadata("design:type", Array)
], Integration.prototype, "integrationTypes", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.integrations, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_integration',
        joinColumn: 'integrationId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'tag_integration'
    }),
    __metadata("design:type", Array)
], Integration.prototype, "tags", void 0);
exports.Integration = Integration = __decorate([
    (0, entity_1.MultiORMEntity)('integration', { mikroOrmRepository: () => mikro_orm_integration_repository_1.MikroOrmIntegrationRepository }),
    (0, typeorm_1.Unique)(['name'])
], Integration);
//# sourceMappingURL=integration.entity.js.map