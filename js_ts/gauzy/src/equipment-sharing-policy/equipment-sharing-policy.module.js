"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EquipmentSharingPolicyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentSharingPolicyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const equipment_sharing_policy_controller_1 = require("./equipment-sharing-policy.controller");
const equipment_sharing_policy_service_1 = require("./equipment-sharing-policy.service");
const equipment_sharing_policy_entity_1 = require("./equipment-sharing-policy.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let EquipmentSharingPolicyModule = exports.EquipmentSharingPolicyModule = EquipmentSharingPolicyModule_1 = class EquipmentSharingPolicyModule {
};
exports.EquipmentSharingPolicyModule = EquipmentSharingPolicyModule = EquipmentSharingPolicyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/equipment-sharing-policy',
                    module: EquipmentSharingPolicyModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([equipment_sharing_policy_entity_1.EquipmentSharingPolicy]),
            nestjs_1.MikroOrmModule.forFeature([equipment_sharing_policy_entity_1.EquipmentSharingPolicy]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [equipment_sharing_policy_controller_1.EquipmentSharingPolicyController],
        providers: [equipment_sharing_policy_service_1.EquipmentSharingPolicyService],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, equipment_sharing_policy_service_1.EquipmentSharingPolicyService]
    })
], EquipmentSharingPolicyModule);
//# sourceMappingURL=equipment-sharing-policy.module.js.map