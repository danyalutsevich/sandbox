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
exports.AccountingTemplateController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("../core/crud");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const decorators_1 = require("./../shared/decorators");
const queries_1 = require("./queries");
const accounting_template_entity_1 = require("./accounting-template.entity");
const accounting_template_service_1 = require("./accounting-template.service");
const dto_1 = require("./dto");
let AccountingTemplateController = exports.AccountingTemplateController = class AccountingTemplateController extends crud_1.CrudController {
    accountingTemplateService;
    queryBus;
    constructor(accountingTemplateService, queryBus) {
        super(accountingTemplateService);
        this.accountingTemplateService = accountingTemplateService;
        this.queryBus = queryBus;
    }
    /**
     * GET count for accounting template
     *
     * @param options
     * @returns
     */
    async getCount(options) {
        return await this.accountingTemplateService.countBy(options);
    }
    /**
     * GET accounting templates using pagination params
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        return await this.accountingTemplateService.paginate(options);
    }
    /**
     * GET accounting template
     *
     * @param options
     * @param themeLanguage
     * @returns
     */
    async getAccountingTemplate(options, themeLanguage) {
        return await this.accountingTemplateService.getAccountTemplate(options, themeLanguage);
    }
    async generatePreview(input) {
        return this.accountingTemplateService.generatePreview(input);
    }
    /**
     * Save accounting template to the organization
     *
     * @param entity
     * @returns
     */
    async saveTemplate(entity) {
        try {
            return await this.accountingTemplateService.saveTemplate(entity);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async findAll(options) {
        return await this.queryBus.execute(new queries_1.AccountingTemplateQuery(options));
    }
    async findById(id) {
        try {
            return await this.accountingTemplateService.findOneByIdString(id);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async update(id, input) {
        try {
            await this.accountingTemplateService.create({
                id,
                ...input
            });
            return await this.findById(id);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
    async delete(id) {
        try {
            return await this.accountingTemplateService.delete(id);
        }
        catch (error) {
            throw new common_1.BadRequestException();
        }
    }
};
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountingTemplateController.prototype, "getCount", null);
__decorate([
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], AccountingTemplateController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find template by name and language code for organization'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found template',
        type: accounting_template_entity_1.AccountingTemplate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('template'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }))),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.AccountingTemplateQueryDTO, String]),
    __metadata("design:returntype", Promise)
], AccountingTemplateController.prototype, "getAccountingTemplate", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Converts mjml or handlebar text to html for template preview'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'text converted to html',
        type: accounting_template_entity_1.AccountingTemplate
    }),
    (0, common_1.Post)('template/preview'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AccountingTemplateController.prototype, "generatePreview", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Converts mjml or handlebar text to html for template preview'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'text converted to html',
        type: accounting_template_entity_1.AccountingTemplate
    }),
    (0, common_1.Post)('template/save'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SaveAccountingTemplateDTO]),
    __metadata("design:returntype", Promise)
], AccountingTemplateController.prototype, "saveTemplate", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], AccountingTemplateController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Gets template by id'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'template found',
        type: accounting_template_entity_1.AccountingTemplate
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountingTemplateController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Updates template'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'template updated',
        type: accounting_template_entity_1.AccountingTemplate
    }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AccountingTemplateController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete accounting template'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Accounting template deleted',
        type: accounting_template_entity_1.AccountingTemplate
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Accounting template not found'
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AccountingTemplateController.prototype, "delete", null);
exports.AccountingTemplateController = AccountingTemplateController = __decorate([
    (0, swagger_1.ApiTags)('Accounting Template'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.VIEW_ALL_ACCOUNTING_TEMPLATES),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [accounting_template_service_1.AccountingTemplateService,
        cqrs_1.QueryBus])
], AccountingTemplateController);
//# sourceMappingURL=accounting-template.controller.js.map