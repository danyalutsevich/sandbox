"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PipelineModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const pipeline_controller_1 = require("./pipeline.controller");
const pipeline_service_1 = require("./pipeline.service");
const typeorm_1 = require("@nestjs/typeorm");
const pipeline_entity_1 = require("./pipeline.entity");
const pipeline_stage_module_1 = require("../pipeline-stage/pipeline-stage.module");
const deal_module_1 = require("../deal/deal.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const user_module_1 = require("./../user/user.module");
const repository_1 = require("./repository");
let PipelineModule = exports.PipelineModule = PipelineModule_1 = class PipelineModule {
};
exports.PipelineModule = PipelineModule = PipelineModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/pipelines', module: PipelineModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([pipeline_entity_1.Pipeline]),
            nestjs_1.MikroOrmModule.forFeature([pipeline_entity_1.Pipeline]),
            pipeline_stage_module_1.StageModule,
            deal_module_1.DealModule,
            role_permission_module_1.RolePermissionModule,
            user_module_1.UserModule
        ],
        controllers: [pipeline_controller_1.PipelineController],
        providers: [pipeline_service_1.PipelineService, repository_1.TypeOrmPipelineRepository],
        exports: [pipeline_service_1.PipelineService, repository_1.TypeOrmPipelineRepository]
    })
], PipelineModule);
//# sourceMappingURL=pipeline.module.js.map