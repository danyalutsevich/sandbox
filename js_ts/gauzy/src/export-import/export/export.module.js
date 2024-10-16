"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExportModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../plugins/plugin/dist/index");
const index_2 = require("../../../plugins/config/dist/index");
const entities_1 = require("../../core/entities");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const export_controller_1 = require("./export.controller");
const export_service_1 = require("./export.service");
let ExportModule = exports.ExportModule = ExportModule_1 = class ExportModule {
};
exports.ExportModule = ExportModule = ExportModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                { path: '/export', module: ExportModule_1 }
            ]),
            typeorm_1.TypeOrmModule.forFeature([
                ...entities_1.coreEntities,
                ...(0, index_1.getEntitiesFromPlugins)((0, index_2.getConfig)().plugins)
            ]),
            nestjs_1.MikroOrmModule.forFeature([
                ...entities_1.coreEntities,
                ...(0, index_1.getEntitiesFromPlugins)((0, index_2.getConfig)().plugins)
            ]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [export_controller_1.ExportController],
        providers: [export_service_1.ExportService],
        exports: []
    })
], ExportModule);
//# sourceMappingURL=export.module.js.map