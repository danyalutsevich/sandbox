"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GauzyCloudModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GauzyCloudModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const axios_1 = require("@nestjs/axios");
const core_1 = require("@nestjs/core");
const index_1 = require("../../plugins/config/dist/index");
const role_module_1 = require("./../role/role.module");
const role_permission_module_1 = require("./../role-permission/role-permission.module");
const gauzy_cloud_controller_1 = require("./gauzy-cloud.controller");
const gauzy_cloud_service_1 = require("./gauzy-cloud.service");
const handlers_1 = require("./commands/handlers");
let GauzyCloudModule = exports.GauzyCloudModule = GauzyCloudModule_1 = class GauzyCloudModule {
};
exports.GauzyCloudModule = GauzyCloudModule = GauzyCloudModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/cloud/migrate', module: GauzyCloudModule_1 }]),
            axios_1.HttpModule.registerAsync({
                imports: [index_1.ConfigModule],
                useFactory: async (configService) => ({
                    baseURL: configService.get('gauzyCloudEndpoint'),
                    timeout: 60 * 5 * 1000,
                    maxRedirects: 5,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }),
                inject: [index_1.ConfigService]
            }),
            cqrs_1.CqrsModule,
            role_module_1.RoleModule,
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [gauzy_cloud_controller_1.GauzyCloudController],
        providers: [gauzy_cloud_service_1.GauzyCloudService, ...handlers_1.CommandHandlers],
        exports: []
    })
], GauzyCloudModule);
//# sourceMappingURL=gauzy-cloud.module.js.map