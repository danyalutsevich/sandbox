"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApprovalPolicyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalPolicyModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const approval_policy_entity_1 = require("./approval-policy.entity");
const approval_policy_controller_1 = require("./approval-policy.controller");
const approval_policy_service_1 = require("./approval-policy.service");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
let ApprovalPolicyModule = exports.ApprovalPolicyModule = ApprovalPolicyModule_1 = class ApprovalPolicyModule {
};
exports.ApprovalPolicyModule = ApprovalPolicyModule = ApprovalPolicyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/approval-policy', module: ApprovalPolicyModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([approval_policy_entity_1.ApprovalPolicy]),
            nestjs_1.MikroOrmModule.forFeature([approval_policy_entity_1.ApprovalPolicy]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [approval_policy_controller_1.ApprovalPolicyController],
        providers: [approval_policy_service_1.ApprovalPolicyService, ...handlers_1.CommandHandlers],
        exports: [approval_policy_service_1.ApprovalPolicyService]
    })
], ApprovalPolicyModule);
//# sourceMappingURL=approval-policy.module.js.map