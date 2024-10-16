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
exports.PipelineStage = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_pipeline_stage_repository_1 = require("./repository/mikro-orm-pipeline-stage.repository");
let PipelineStage = exports.PipelineStage = class PipelineStage extends internal_1.TenantOrganizationBaseEntity {
    description;
    index;
    name;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Pipeline
     */
    pipeline;
    pipelineId;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PipelineStage.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, entity_1.MultiORMColumn)({ type: 'int' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PipelineStage.prototype, "index", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], PipelineStage.prototype, "name", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Pipeline, (it) => it.stages, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], PipelineStage.prototype, "pipeline", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typeorm_1.RelationId)((it) => it.pipeline),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], PipelineStage.prototype, "pipelineId", void 0);
exports.PipelineStage = PipelineStage = __decorate([
    (0, entity_1.MultiORMEntity)('pipeline_stage', { mikroOrmRepository: () => mikro_orm_pipeline_stage_repository_1.MikroOrmPipelineStageRepository })
], PipelineStage);
//# sourceMappingURL=pipeline-stage.entity.js.map