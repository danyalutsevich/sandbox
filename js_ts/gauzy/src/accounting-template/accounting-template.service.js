"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingTemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mjml_1 = __importDefault(require("mjml"));
const Handlebars = __importStar(require("handlebars"));
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const accounting_template_entity_1 = require("./accounting-template.entity");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const database_helper_1 = require("./../database/database.helper");
const type_orm_accounting_template_repository_1 = require("./repository/type-orm-accounting-template.repository");
const mikro_orm_accounting_template_repository_1 = require("./repository/mikro-orm-accounting-template.repository");
let AccountingTemplateService = exports.AccountingTemplateService = class AccountingTemplateService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmAccountingTemplateRepository, mikroOrmAccountingTemplateRepository) {
        super(typeOrmAccountingTemplateRepository, mikroOrmAccountingTemplateRepository);
    }
    generatePreview(input) {
        const { data, organization } = input.request;
        let textToHtml = data;
        try {
            const mjmlTohtml = (0, mjml_1.default)(data);
            textToHtml = mjmlTohtml.errors.length ? data : mjmlTohtml.html;
        }
        catch (error) { }
        const handlebarsTemplate = Handlebars.compile(textToHtml);
        Handlebars.registerHelper('if_eq', function (a, b, opts) {
            if (a == b) {
                return opts.fn(this);
            }
            else {
                return opts.inverse(this);
            }
        });
        const html = handlebarsTemplate({
            invoiceNumber: '1',
            from: organization,
            to: 'Sample Client',
            invoiceDate: '2021-02-23',
            dueDate: '2021-03-23',
            currency: 'BGN',
            tax: '20',
            tax2: '0',
            discountValue: '0',
            totalValue: '168',
            taxType: 'PERCENT',
            tax2Type: 'FLAT',
            discountType: 'PERCENT',
            hasRemainingAmountInvoiced: true,
            alreadyPaid: '0',
            amountDue: '168',
            invoiceItems: [
                {
                    name: 'Item 1',
                    description: 'Desc 1',
                    quantity: '1',
                    price: '10',
                    totalValue: '10'
                },
                {
                    name: 'Item 2',
                    description: 'Desc 2',
                    quantity: '2',
                    price: '20',
                    totalValue: '40'
                },
                {
                    name: 'Item 3',
                    description: 'Desc 3',
                    quantity: '3',
                    price: '30',
                    totalValue: '90'
                }
            ],
            estimateNumber: '1',
            estimateDate: '2021-02-23',
            estimateDueDate: '2021-03-23',
            estimateItems: [
                {
                    name: 'Item 1',
                    description: 'Desc 1',
                    quantity: '1',
                    price: '10',
                    totalValue: '10'
                },
                {
                    name: 'Item 2',
                    description: 'Desc 2',
                    quantity: '2',
                    price: '20',
                    totalValue: '40'
                },
                {
                    name: 'Item 3',
                    description: 'Desc 3',
                    quantity: '3',
                    price: '30',
                    totalValue: '90'
                }
            ],
            imgPath: 'assets/images/logos/ever-large.jpg',
            receiptNumber: '1',
            paymentDate: '2021-02-24',
            paymentMethod: 'Bank Transfer',
            receiptItems: [
                {
                    name: 'Item 1',
                    description: 'Desc 1',
                    quantity: '1',
                    price: '10',
                    totalValue: '10'
                },
                {
                    name: 'Item 2',
                    description: 'Desc 2',
                    quantity: '2',
                    price: '20',
                    totalValue: '40'
                },
                {
                    name: 'Item 3',
                    description: 'Desc 3',
                    quantity: '3',
                    price: '30',
                    totalValue: '90'
                }
            ],
            subtotal: '140',
            totalPaid: '168'
        });
        return { html };
    }
    /**
     * Save accounting template to the organization
     *
     * @param input
     * @returns
     */
    async saveTemplate(input) {
        const tenantId = context_1.RequestContext.currentTenantId();
        try {
            const record = await this.findOneByWhereOptions({
                languageCode: input.languageCode,
                templateType: input.templateType,
                organizationId: input.organizationId,
                tenantId
            });
            let entity = {
                ...record,
                hbs: (0, mjml_1.default)(record.mjml).html,
                mjml: input.mjml
            };
            return await this.update(record.id, entity);
        }
        catch (error) {
            const entity = new accounting_template_entity_1.AccountingTemplate();
            entity.languageCode = input.languageCode;
            entity.templateType = input.templateType;
            entity.name = input.templateType;
            entity.mjml = input.mjml;
            entity.hbs = (0, mjml_1.default)(input.mjml).html;
            entity.organizationId = input.organizationId;
            entity.tenantId = tenantId;
            return await this.create(entity);
        }
    }
    /**
     * GET single accounting template by conditions
     *
     * @param options
     * @param themeLanguage
     * @returns
     */
    async getAccountTemplate(options, themeLanguage) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { templateType = index_1.AccountingTemplateTypeEnum.INVOICE, organizationId, languageCode = themeLanguage } = options;
        try {
            return await this.typeOrmRepository.findOneBy({
                languageCode,
                templateType,
                organizationId,
                tenantId
            });
        }
        catch (error) {
            try {
                return await this.typeOrmRepository.findOneBy({
                    languageCode,
                    templateType,
                    organizationId: (0, typeorm_2.IsNull)(),
                    tenantId: (0, typeorm_2.IsNull)()
                });
            }
            catch (error) {
                try {
                    return await this.typeOrmRepository.findOneBy({
                        languageCode: index_1.LanguagesEnum.ENGLISH,
                        templateType,
                        organizationId,
                        tenantId
                    });
                }
                catch (error) {
                    return await this.typeOrmRepository.findOneBy({
                        languageCode: index_1.LanguagesEnum.ENGLISH,
                        templateType,
                        organizationId: (0, typeorm_2.IsNull)(),
                        tenantId: (0, typeorm_2.IsNull)()
                    });
                }
            }
        }
    }
    /**
     * Get Accounting Templates using pagination params
     *
     * @param params
     * @returns
     */
    async findAll(params) {
        const query = this.typeOrmRepository.createQueryBuilder('accounting_template');
        query.setFindOptions({
            select: {
                organization: {
                    id: true,
                    name: true,
                    brandColor: true
                }
            },
            ...(params && params.relations
                ? {
                    relations: params.relations
                }
                : {}),
            ...(params && params.order
                ? {
                    order: params.order
                }
                : {})
        });
        query.where((qb) => {
            qb.andWhere(new typeorm_2.Brackets((bck) => {
                const { organizationId, languageCode } = params.where;
                if ((0, index_2.isNotEmpty)(organizationId)) {
                    bck.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), {
                        organizationId
                    });
                }
                if ((0, index_2.isNotEmpty)(languageCode)) {
                    bck.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."languageCode" = :languageCode`), {
                        languageCode
                    });
                }
                bck.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), {
                    tenantId: context_1.RequestContext.currentTenantId()
                });
            }));
            qb.orWhere(new typeorm_2.Brackets((bck) => {
                bck.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" IS NULL`));
                bck.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" IS NULL`));
            }));
        });
        const [items, total] = await query.getManyAndCount();
        return { items, total };
    }
};
exports.AccountingTemplateService = AccountingTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(accounting_template_entity_1.AccountingTemplate)),
    __metadata("design:paramtypes", [type_orm_accounting_template_repository_1.TypeOrmAccountingTemplateRepository,
        mikro_orm_accounting_template_repository_1.MikroOrmAccountingTemplateRepository])
], AccountingTemplateService);
//# sourceMappingURL=accounting-template.service.js.map