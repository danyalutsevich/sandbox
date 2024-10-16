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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailTemplateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const mjml_1 = __importDefault(require("mjml"));
const index_1 = require("../../plugins/common/dist/index");
const email_template_entity_1 = require("./email-template.entity");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const database_helper_1 = require("./../database/database.helper");
const repository_1 = require("./repository");
let EmailTemplateService = exports.EmailTemplateService = class EmailTemplateService extends crud_1.CrudService {
    constructor(typeOrmEmailTemplateRepository, mikroOrmEmailTemplateRepository) {
        super(typeOrmEmailTemplateRepository, mikroOrmEmailTemplateRepository);
    }
    /**
     * Get Email Templates
     * @param params
     * @returns
     */
    async findAll(params) {
        const query = this.typeOrmRepository.createQueryBuilder('email_template');
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
            qb.where(new typeorm_1.Brackets((web) => {
                const { tenantId, organizationId, languageCode } = params.where;
                if ((0, index_1.isNotEmpty)(tenantId)) {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), {
                        tenantId: context_1.RequestContext.currentTenantId()
                    });
                }
                if ((0, index_1.isNotEmpty)(organizationId)) {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), {
                        organizationId
                    });
                }
                if ((0, index_1.isNotEmpty)(languageCode)) {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."languageCode" = :languageCode`), {
                        languageCode
                    });
                }
            }));
            qb.orWhere(new typeorm_1.Brackets((web) => {
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" IS NULL`));
                web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" IS NULL`));
            }));
        });
        const [items, total] = await query.getManyAndCount();
        return { items, total };
    }
    /**
     * Insert or update global missing email templates in database.
     * Production environment not running any seeder to save templates.
     * If someone looking for templates, we are fetch it from code folders.
     *
     * @param languageCode
     * @param name
     * @param type
     * @param organizationId
     * @param tenantId
     * @param content
     * @returns
     */
    async saveTemplate(languageCode, name, type, organizationId, tenantId, content) {
        let entity;
        try {
            const emailTemplate = await this.findOneByWhereOptions({
                languageCode,
                name: `${name}/${type}`,
                organizationId,
                tenantId
            });
            switch (type) {
                case 'subject':
                    entity = {
                        ...emailTemplate,
                        hbs: content.hbs
                    };
                    break;
                case 'html':
                    entity = {
                        ...emailTemplate,
                        mjml: content.mjml,
                        hbs: (0, mjml_1.default)(content.mjml).html
                    };
                    break;
            }
            await super.create({ id: emailTemplate.id, ...entity });
        }
        catch (error) {
            entity = new email_template_entity_1.EmailTemplate({
                organizationId,
                tenantId,
                languageCode
            });
            entity.name = `${name}/${type}`;
            switch (type) {
                case 'subject':
                    entity.hbs = content.hbs;
                    break;
                case 'html':
                    entity.mjml = content.mjml;
                    entity.hbs = (0, mjml_1.default)(content.mjml).html;
                    break;
            }
            await super.create(entity);
        }
        return entity;
    }
};
exports.EmailTemplateService = EmailTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmEmailTemplateRepository,
        repository_1.MikroOrmEmailTemplateRepository])
], EmailTemplateService);
//# sourceMappingURL=email-template.service.js.map