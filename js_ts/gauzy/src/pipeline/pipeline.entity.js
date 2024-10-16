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
exports.Pipeline = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_pipeline_repository_1 = require("./repository/mikro-orm-pipeline.repository");
let Pipeline = exports.Pipeline = class Pipeline extends internal_1.TenantOrganizationBaseEntity {
    description;
    name;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    stages;
    /*
    |--------------------------------------------------------------------------
    | EventSubscriber
    |--------------------------------------------------------------------------
    */
    __before_persist() {
        const pipelineId = this.id ? { pipelineId: this.id } : {};
        let index = 0;
        this.stages?.forEach((stage) => {
            Object.assign(stage, pipelineId, { index: ++index });
        });
        console.log(this.stages);
    }
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Pipeline.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Pipeline.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.PipelineStage }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.PipelineStage, (it) => it.pipeline, {
        cascade: ['insert']
    }),
    __metadata("design:type", Array)
], Pipeline.prototype, "stages", void 0);
exports.Pipeline = Pipeline = __decorate([
    (0, entity_1.MultiORMEntity)('pipeline', { mikroOrmRepository: () => mikro_orm_pipeline_repository_1.MikroOrmPipelineRepository })
], Pipeline);
//# sourceMappingURL=pipeline.entity.js.map