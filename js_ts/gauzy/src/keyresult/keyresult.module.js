"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KeyResultModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyResultModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const keyresult_entity_1 = require("./keyresult.entity");
const keyresult_service_1 = require("./keyresult.service");
const keyresult_controller_1 = require("./keyresult.controller");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let KeyResultModule = exports.KeyResultModule = KeyResultModule_1 = class KeyResultModule {
};
exports.KeyResultModule = KeyResultModule = KeyResultModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/key-results', module: KeyResultModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([keyresult_entity_1.KeyResult]),
            nestjs_1.MikroOrmModule.forFeature([keyresult_entity_1.KeyResult]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [keyresult_controller_1.KeyResultController],
        providers: [keyresult_service_1.KeyResultService],
        exports: [keyresult_service_1.KeyResultService]
    })
], KeyResultModule);
//# sourceMappingURL=keyresult.module.js.map