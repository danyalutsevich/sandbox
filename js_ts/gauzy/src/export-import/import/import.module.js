"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ImportModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/plugin/dist/index");
const import_controller_1 = require("./import.controller");
const import_service_1 = require("./import.service");
const entities_1 = require("../../core/entities");
const handlers_1 = require("./commands/handlers");
const import_record_1 = require("../import-record");
const import_history_1 = require("../import-history");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const user_module_1 = require("../../user/user.module");
let ImportModule = exports.ImportModule = ImportModule_1 = class ImportModule {
};
exports.ImportModule = ImportModule = ImportModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/import',
                    module: ImportModule_1,
                    children: [{ path: '/history', module: import_history_1.ImportHistoryModule }]
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([
                ...entities_1.coreEntities,
                ...(0, index_2.getEntitiesFromPlugins)((0, index_1.getConfig)().plugins)
            ]),
            nestjs_1.MikroOrmModule.forFeature([
                ...entities_1.coreEntities,
                ...(0, index_2.getEntitiesFromPlugins)((0, index_1.getConfig)().plugins)
            ]),
            role_permission_module_1.RolePermissionModule,
            user_module_1.UserModule,
            import_record_1.ImportRecordModule,
            import_history_1.ImportHistoryModule,
            cqrs_1.CqrsModule
        ],
        controllers: [import_controller_1.ImportController],
        providers: [import_service_1.ImportService, ...handlers_1.CommandHandlers],
        exports: []
    })
], ImportModule);
//# sourceMappingURL=import.module.js.map