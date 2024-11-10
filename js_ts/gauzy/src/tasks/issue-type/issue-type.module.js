"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var IssueTypeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueTypeModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../../role-permission/role-permission.module");
const issue_type_controller_1 = require("./issue-type.controller");
const issue_type_entity_1 = require("./issue-type.entity");
const issue_type_service_1 = require("./issue-type.service");
const handlers_1 = require("./commands/handlers");
const type_orm_issue_type_repository_1 = require("./repository/type-orm-issue-type.repository");
let IssueTypeModule = exports.IssueTypeModule = IssueTypeModule_1 = class IssueTypeModule {
};
exports.IssueTypeModule = IssueTypeModule = IssueTypeModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/issue-types', module: IssueTypeModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([issue_type_entity_1.IssueType]),
            nestjs_1.MikroOrmModule.forFeature([issue_type_entity_1.IssueType]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [issue_type_controller_1.IssueTypeController],
        providers: [issue_type_service_1.IssueTypeService, type_orm_issue_type_repository_1.TypeOrmIssueTypeRepository, ...handlers_1.CommandHandlers],
        exports: []
    })
], IssueTypeModule);
//# sourceMappingURL=issue-type.module.js.map