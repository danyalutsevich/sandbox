"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
const import_history_entity_1 = require("./import-history.entity");
const import_history_service_1 = require("./import-history.service");
const import_history_controller_1 = require("./import-history.controller");
let ImportHistoryModule = exports.ImportHistoryModule = class ImportHistoryModule {
};
exports.ImportHistoryModule = ImportHistoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            import_history_controller_1.ImportHistoryController
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([import_history_entity_1.ImportHistory]),
            nestjs_1.MikroOrmModule.forFeature([import_history_entity_1.ImportHistory]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        providers: [
            import_history_service_1.ImportHistoryService,
            ...handlers_1.CommandHandlers
        ],
        exports: [
            import_history_service_1.ImportHistoryService
        ]
    })
], ImportHistoryModule);
//# sourceMappingURL=import-history.module.js.map