"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const pipeline_stage_entity_1 = require("./pipeline-stage.entity");
const pipeline_stage_service_1 = require("./pipeline-stage.service");
let StageModule = exports.StageModule = class StageModule {
};
exports.StageModule = StageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([pipeline_stage_entity_1.PipelineStage]),
            nestjs_1.MikroOrmModule.forFeature([pipeline_stage_entity_1.PipelineStage])
        ],
        providers: [pipeline_stage_service_1.StageService],
        exports: [pipeline_stage_service_1.StageService]
    })
], StageModule);
//# sourceMappingURL=pipeline-stage.module.js.map