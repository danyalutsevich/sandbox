"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TagModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const internal_1 = require("core/entities/internal");
const tag_controller_1 = require("./tag.controller");
const tag_service_1 = require("./tag.service");
const tag_entity_1 = require("./tag.entity");
const handlers_1 = require("./commands/handlers");
const type_orm_tag_repository_1 = require("./repository/type-orm-tag.repository");
let TagModule = exports.TagModule = TagModule_1 = class TagModule {
};
exports.TagModule = TagModule = TagModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/tags', module: TagModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([tag_entity_1.Tag, internal_1.IntegrationMap]),
            nestjs_1.MikroOrmModule.forFeature([tag_entity_1.Tag, internal_1.IntegrationMap]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [tag_controller_1.TagController],
        providers: [tag_service_1.TagService, type_orm_tag_repository_1.TypeOrmTagRepository, ...handlers_1.CommandHandlers],
        exports: [tag_service_1.TagService, type_orm_tag_repository_1.TypeOrmTagRepository]
    })
], TagModule);
//# sourceMappingURL=tag.module.js.map