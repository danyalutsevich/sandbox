"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var KeyresultTemplateModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyresultTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const keyresult_template_controller_1 = require("./keyresult-template.controller");
const keyresult_template_service_1 = require("./keyresult-template.service");
const keyresult_template_entity_1 = require("./keyresult-template.entity");
const role_permission_module_1 = require("../role-permission/role-permission.module");
let KeyresultTemplateModule = exports.KeyresultTemplateModule = KeyresultTemplateModule_1 = class KeyresultTemplateModule {
};
exports.KeyresultTemplateModule = KeyresultTemplateModule = KeyresultTemplateModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/key-result-templates', module: KeyresultTemplateModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([keyresult_template_entity_1.KeyResultTemplate]),
            nestjs_1.MikroOrmModule.forFeature([keyresult_template_entity_1.KeyResultTemplate]),
            role_permission_module_1.RolePermissionModule
        ],
        controllers: [keyresult_template_controller_1.KeyresultTemplateController],
        providers: [keyresult_template_service_1.KeyresultTemplateService],
        exports: [keyresult_template_service_1.KeyresultTemplateService]
    })
], KeyresultTemplateModule);
//# sourceMappingURL=keyresult-template.module.js.map