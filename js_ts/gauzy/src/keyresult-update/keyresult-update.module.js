"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KeyResultUpdateModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyResultUpdateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const keyresult_update_service_1 = require("./keyresult-update.service");
const keyresult_update_controller_1 = require("./keyresult-update.controller");
const keyresult_update_entity_1 = require("./keyresult-update.entity");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let KeyResultUpdateModule = exports.KeyResultUpdateModule = KeyResultUpdateModule_1 = class KeyResultUpdateModule {
};
exports.KeyResultUpdateModule = KeyResultUpdateModule = KeyResultUpdateModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/key-result-updates', module: KeyResultUpdateModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([keyresult_update_entity_1.KeyResultUpdate]),
            nestjs_1.MikroOrmModule.forFeature([keyresult_update_entity_1.KeyResultUpdate]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [keyresult_update_controller_1.KeyResultUpdateController],
        providers: [keyresult_update_service_1.KeyResultUpdateService, ...handlers_1.CommandHandlers],
        exports: [keyresult_update_service_1.KeyResultUpdateService]
    })
], KeyResultUpdateModule);
//# sourceMappingURL=keyresult-update.module.js.map