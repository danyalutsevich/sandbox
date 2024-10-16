"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IntegrationMapModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationMapModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const task_module_1 = require("../tasks/task.module");
const tag_module_1 = require("../tags/tag.module");
const handlers_1 = require("./commands/handlers");
const integration_map_controller_1 = require("./integration-map.controller");
const integration_map_service_1 = require("./integration-map.service");
const integration_map_entity_1 = require("./integration-map.entity");
let IntegrationMapModule = exports.IntegrationMapModule = IntegrationMapModule_1 = class IntegrationMapModule {
};
exports.IntegrationMapModule = IntegrationMapModule = IntegrationMapModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/integration-map',
                    module: IntegrationMapModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([integration_map_entity_1.IntegrationMap]),
            nestjs_1.MikroOrmModule.forFeature([integration_map_entity_1.IntegrationMap]),
            role_permission_module_1.RolePermissionModule,
            task_module_1.TaskModule,
            tag_module_1.TagModule,
            cqrs_1.CqrsModule
        ],
        controllers: [integration_map_controller_1.IntegrationMapController],
        providers: [integration_map_service_1.IntegrationMapService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, integration_map_service_1.IntegrationMapService]
    })
], IntegrationMapModule);
//# sourceMappingURL=integration-map.module.js.map