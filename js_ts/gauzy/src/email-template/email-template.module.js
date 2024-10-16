"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmailTemplateModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const email_template_entity_1 = require("./email-template.entity");
const email_template_service_1 = require("./email-template.service");
const email_template_reader_service_1 = require("./email-template-reader.service");
const email_template_controller_1 = require("./email-template.controller");
const handlers_1 = require("./queries/handlers");
const handlers_2 = require("./commands/handlers");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const type_orm_email_template_repository_1 = require("./repository/type-orm-email-template.repository");
let EmailTemplateModule = exports.EmailTemplateModule = EmailTemplateModule_1 = class EmailTemplateModule {
};
exports.EmailTemplateModule = EmailTemplateModule = EmailTemplateModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/email-template', module: EmailTemplateModule_1 }]),
            (0, common_1.forwardRef)(() => typeorm_1.TypeOrmModule.forFeature([email_template_entity_1.EmailTemplate])),
            (0, common_1.forwardRef)(() => nestjs_1.MikroOrmModule.forFeature([email_template_entity_1.EmailTemplate])),
            (0, common_1.forwardRef)(() => role_permission_module_1.RolePermissionModule),
            cqrs_1.CqrsModule
        ],
        controllers: [email_template_controller_1.EmailTemplateController],
        providers: [
            email_template_service_1.EmailTemplateService,
            email_template_reader_service_1.EmailTemplateReaderService,
            type_orm_email_template_repository_1.TypeOrmEmailTemplateRepository,
            ...handlers_1.QueryHandlers,
            ...handlers_2.CommandHandlers
        ],
        exports: [typeorm_1.TypeOrmModule, nestjs_1.MikroOrmModule, email_template_service_1.EmailTemplateService, type_orm_email_template_repository_1.TypeOrmEmailTemplateRepository]
    })
], EmailTemplateModule);
//# sourceMappingURL=email-template.module.js.map