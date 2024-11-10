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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstimateEmailService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("../../plugins/config/dist/index");
const context_1 = require("../core/context");
const crud_1 = require("./../core/crud");
const internal_1 = require("./../core/entities/internal");
const estimate_email_entity_1 = require("./estimate-email.entity");
const type_orm_estimate_email_repository_1 = require("./repository/type-orm-estimate-email.repository");
const mikro_orm_estimate_email_repository_1 = require("./repository/mikro-orm-estimate-email.repository");
const type_orm_invoice_repository_1 = require("./../invoice/repository/type-orm-invoice.repository");
const mikro_orm_invoice_repository_1 = require("./../invoice/repository/mikro-orm-invoice.repository");
const type_orm_organization_repository_1 = require("./../organization/repository/type-orm-organization.repository");
const mikro_orm_organization_repository_1 = require("./../organization/repository/mikro-orm-organization.repository");
let EstimateEmailService = exports.EstimateEmailService = class EstimateEmailService extends crud_1.TenantAwareCrudService {
    typeOrmInvoiceRepository;
    typeOrmOrganizationRepository;
    constructor(typeOrmEstimateEmailRepository, mikroOrmEstimateEmailRepository, typeOrmInvoiceRepository, mikroOrmInvoiceRepository, typeOrmOrganizationRepository, mikroOrmOrganizationRepository) {
        super(typeOrmEstimateEmailRepository, mikroOrmEstimateEmailRepository);
        this.typeOrmInvoiceRepository = typeOrmInvoiceRepository;
        this.typeOrmOrganizationRepository = typeOrmOrganizationRepository;
    }
    async createEstimateEmail(id, email) {
        const invoice = await this.typeOrmInvoiceRepository.findOneByOrFail({
            id
        });
        const organization = await this.typeOrmOrganizationRepository.findOneBy({
            id: invoice.organizationId
        });
        try {
            const payload = {
                invoiceId: invoice.id,
                organizationId: invoice.organizationId,
                tenantId: context_1.RequestContext.currentTenantId(),
                email
            };
            const tokenExpiryPeriod = organization.inviteExpiryPeriod || 7;
            const now = (0, moment_1.default)();
            const expireDate = now.clone().add(tokenExpiryPeriod, 'days');
            const duration = moment_1.default.duration(expireDate.diff(now)).asSeconds();
            const estimateEmail = new estimate_email_entity_1.EstimateEmail();
            estimateEmail.organizationId = invoice.organizationId;
            estimateEmail.tenantId = context_1.RequestContext.currentTenantId();
            estimateEmail.email = email;
            estimateEmail.expireDate = expireDate.toDate();
            estimateEmail.convertAcceptedEstimates = organization.convertAcceptedEstimates || false;
            estimateEmail.token = (0, jsonwebtoken_1.sign)(payload, index_1.environment.JWT_SECRET, {
                expiresIn: `${duration}s`
            });
            return await this.typeOrmRepository.save(estimateEmail);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     * Validate estimate email
     *
     * @param params
     * @param relations
     * @returns
     */
    async validate(params, relations = []) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(params.token, index_1.environment.JWT_SECRET);
            const { organizationId, tenantId, email, token } = decoded;
            return await this.typeOrmRepository.findOneOrFail({
                select: {
                    tenant: {
                        name: true,
                        logo: true
                    },
                    organization: {
                        name: true,
                        officialName: true,
                        brandColor: true
                    }
                },
                where: {
                    email,
                    token,
                    organizationId,
                    tenantId,
                    expireDate: (0, typeorm_2.MoreThan)((0, moment_1.default)().toDate())
                },
                ...(relations
                    ? {
                        relations: relations
                    }
                    : {})
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.EstimateEmailService = EstimateEmailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estimate_email_entity_1.EstimateEmail)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.Invoice)),
    __param(4, (0, typeorm_1.InjectRepository)(internal_1.Organization)),
    __metadata("design:paramtypes", [type_orm_estimate_email_repository_1.TypeOrmEstimateEmailRepository,
        mikro_orm_estimate_email_repository_1.MikroOrmEstimateEmailRepository,
        type_orm_invoice_repository_1.TypeOrmInvoiceRepository,
        mikro_orm_invoice_repository_1.MikroOrmInvoiceRepository,
        type_orm_organization_repository_1.TypeOrmOrganizationRepository,
        mikro_orm_organization_repository_1.MikroOrmOrganizationRepository])
], EstimateEmailService);
//# sourceMappingURL=estimate-email.service.js.map