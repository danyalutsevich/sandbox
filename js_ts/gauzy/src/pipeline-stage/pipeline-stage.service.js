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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const crud_1 = require("./../core/crud");
const pipeline_stage_entity_1 = require("./pipeline-stage.entity");
const type_orm_pipeline_stage_repository_1 = require("./repository/type-orm-pipeline-stage.repository");
const mikro_orm_pipeline_stage_repository_1 = require("./repository/mikro-orm-pipeline-stage.repository");
let StageService = exports.StageService = class StageService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmPipelineStageRepository, mikroOrmPipelineStageRepository) {
        super(typeOrmPipelineStageRepository, mikroOrmPipelineStageRepository);
    }
};
exports.StageService = StageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pipeline_stage_entity_1.PipelineStage)),
    __metadata("design:paramtypes", [type_orm_pipeline_stage_repository_1.TypeOrmPipelineStageRepository,
        mikro_orm_pipeline_stage_repository_1.MikroOrmPipelineStageRepository])
], StageService);
//# sourceMappingURL=pipeline-stage.service.js.map