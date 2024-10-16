"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateController = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const decorators_1 = require("./../shared/decorators");
const email_template_entity_1 = require("./email-template.entity");
const email_template_service_1 = require("./email-template.service");
const queries_1 = require("./queries");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
let EmailTemplateController = exports.EmailTemplateController = class EmailTemplateController extends crud_1.CrudController {
    emailTemplateService;
    queryBus;
    commandBus;
    constructor(emailTemplateService, queryBus, commandBus) {
        super(emailTemplateService);
        this.emailTemplateService = emailTemplateService;
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
    /**
     * GET count for email templates in the same tenant
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.emailTemplateService.countBy({
            ...options,
            tenantId: context_1.RequestContext.currentTenantId()
        });
    }
    /**
     * GET email templates using pagination params
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        return await this.emailTemplateService.paginate(options);
    }
    /**
     * GET specific email template by conditions
     *
     * @param themeLanguage
     * @param options
     * @returns
     */
    async findEmailTemplate(themeLanguage, options) {
        return await this.queryBus.execute(new queries_1.FindEmailTemplateQuery(options, themeLanguage));
    }
    /**
     * Generate email template preview
     *
     * @param data
     * @returns
     */
    async generatePreview(data) {
        return await this.queryBus.execute(new queries_1.EmailTemplateGeneratePreviewQuery(data));
    }
    /**
     * SAVE email template for specific language
     *
     * @param entity
     * @returns
     */
    async saveEmailTemplate(entity) {
        return await this.commandBus.execute(new commands_1.EmailTemplateSaveCommand(entity));
    }
    /**
     * GET email templates in the same tenant
     *
     * @param options
     * @returns
     */
    async findAll(options) {
        return await this.queryBus.execute(new queries_1.EmailTemplateQuery(options));
    }
    /**
     * FIND email template by id in the same tenant
     *
     * @param id
     * @returns
     */
    async findById(id) {
        try {
            return await this.emailTemplateService.findOneByIdString(id, {
                where: {
                    tenantId: context_1.RequestContext.currentTenantId()
                }
            });
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * UPDATE email template by id in the same tenant
     *
     * @param id
     * @param input
     * @returns
     */
    async update(id, input) {
        try {
            await this.findById(id);
            return await this.emailTemplateService.update({
                id,
                tenantId: context_1.RequestContext.currentTenantId()
            }, input);
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * DELETE email template by id in the same tenant
     *
     * @param id
     * @returns
     */
    async delete(id) {
        try {
            await this.findById(id);
            return await this.emailTemplateService.delete({
                id,
                tenantId: context_1.RequestContext.currentTenantId()
            });
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
};
__decorate([
    (0, common_1.Get)('count'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find email template by name and language code for organization'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found email template',
        type: email_template_entity_1.EmailTemplate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('template'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, decorators_1.LanguageDecorator)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.EmailTemplateQueryDTO]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "findEmailTemplate", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Converts mjml or handlebar text to html for email preview'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'text converted to html',
        type: email_template_entity_1.EmailTemplate
    }),
    (0, common_1.Post)('template/preview'),
    __param(0, (0, common_1.Body)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "generatePreview", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Convert mjml or handlebar text to html'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'mjml or handlebar text converted to html',
        type: email_template_entity_1.EmailTemplate
    }),
    (0, common_1.Post)('template/save'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SaveEmailTemplateDTO]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "saveEmailTemplate", null);
__decorate([
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Gets template by id'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'template found',
        type: email_template_entity_1.EmailTemplate
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Updates template'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'template updated',
        type: email_template_entity_1.EmailTemplate
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete email template'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Email template deleted',
        type: email_template_entity_1.EmailTemplate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Email template not found'
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailTemplateController.prototype, "delete", null);
exports.EmailTemplateController = EmailTemplateController = __decorate([
    (0, swagger_1.ApiTags)('EmailTemplate'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.VIEW_ALL_EMAIL_TEMPLATES),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [email_template_service_1.EmailTemplateService,
        cqrs_1.QueryBus,
        cqrs_1.CommandBus])
], EmailTemplateController);
//# sourceMappingURL=email-template.controller.js.map