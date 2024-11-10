"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EquipmentSharingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentSharingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const equipment_sharing_entity_1 = require("./equipment-sharing.entity");
const equipment_sharing_controller_1 = require("./equipment-sharing.controller");
const equipment_sharing_service_1 = require("./equipment-sharing.service");
const request_approval_entity_1 = require("../request-approval/request-approval.entity");
const handlers_1 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let EquipmentSharingModule = exports.EquipmentSharingModule = EquipmentSharingModule_1 = class EquipmentSharingModule {
};
exports.EquipmentSharingModule = EquipmentSharingModule = EquipmentSharingModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/equipment-sharing', module: EquipmentSharingModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([request_approval_entity_1.RequestApproval, equipment_sharing_entity_1.EquipmentSharing]),
            nestjs_1.MikroOrmModule.forFeature([request_approval_entity_1.RequestApproval, equipment_sharing_entity_1.EquipmentSharing]),
            cqrs_1.CqrsModule,
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [equipment_sharing_controller_1.EquipmentSharingController],
        providers: [equipment_sharing_service_1.EquipmentSharingService, ...handlers_1.CommandHandlers],
        exports: [equipment_sharing_service_1.EquipmentSharingService]
    })
], EquipmentSharingModule);
//# sourceMappingURL=equipment-sharing.module.js.map