"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const candidate_controller_1 = require("./candidate.controller");
const candidate_service_1 = require("./candidate.service");
const email_send_module_1 = require("./../email-send/email-send.module");
const auth_module_1 = require("./../auth/auth.module");
const candidate_entity_1 = require("./candidate.entity");
const user_organization_module_1 = require("../user-organization/user-organization.module");
const handlers_1 = require("./commands/handlers");
const user_module_1 = require("./../user/user.module");
const employee_module_1 = require("./../employee/employee.module");
const role_module_1 = require("./../role/role.module");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let CandidateModule = exports.CandidateModule = CandidateModule_1 = class CandidateModule {
};
exports.CandidateModule = CandidateModule = CandidateModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/candidate', module: CandidateModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([candidate_entity_1.Candidate]),
            nestjs_1.MikroOrmModule.forFeature([candidate_entity_1.Candidate]),
            email_send_module_1.EmailSendModule,
            cqrs_1.CqrsModule,
            user_organization_module_1.UserOrganizationModule,
            user_module_1.UserModule,
            employee_module_1.EmployeeModule,
            role_module_1.RoleModule,
            role_permission_module_1.RolePermissionModule,
            auth_module_1.AuthModule
        ],
        controllers: [candidate_controller_1.CandidateController],
        providers: [candidate_service_1.CandidateService, ...handlers_1.CommandHandlers],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, candidate_service_1.CandidateService]
    })
], CandidateModule);
//# sourceMappingURL=candidate.module.js.map