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
exports.PublicInvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const index_1 = require("../../../plugins/config/dist/index");
const internal_1 = require("./../../core/entities/internal");
const type_orm_invoice_repository_1 = require("../../invoice/repository/type-orm-invoice.repository");
let PublicInvoiceService = exports.PublicInvoiceService = class PublicInvoiceService {
    typeOrmInvoiceRepository;
    constructor(typeOrmInvoiceRepository) {
        this.typeOrmInvoiceRepository = typeOrmInvoiceRepository;
    }
    /**
     * Find public invoice by token
     *
     * @param params
     * @param relations
     * @returns
     */
    async findOneByConditions(params, relations = []) {
        try {
            if (!params.id || !params.token) {
                throw new common_1.ForbiddenException();
            }
            const { id, organizationId, tenantId } = (0, jsonwebtoken_1.verify)(params.token, index_1.environment.JWT_SECRET);
            if (id !== params.id) {
                throw new common_1.ForbiddenException();
            }
            return await this.typeOrmInvoiceRepository.findOneOrFail({
                select: {
                    tenant: {
                        name: true,
                        logo: true
                    },
                    organization: {
                        name: true,
                        officialName: true,
                        brandColor: true
                    },
                    fromOrganization: {
                        name: true,
                        officialName: true,
                        brandColor: true
                    },
                    invoiceItems: {
                        id: true,
                        description: true,
                        quantity: true,
                        price: true,
                        totalValue: true,
                        applyDiscount: true,
                        employeeId: true,
                        employee: {
                            user: {
                                firstName: true,
                                lastName: true,
                            }
                        },
                        projectId: true,
                        project: {
                            imageUrl: true,
                            name: true,
                            description: true
                        },
                        productId: true,
                        expenseId: true,
                        expense: {
                            purpose: true
                        },
                        taskId: true,
                        task: {
                            title: true,
                            description: true,
                        }
                    },
                    toContact: {
                        contactType: true,
                        imageUrl: true,
                        name: true,
                    }
                },
                where: {
                    id,
                    organizationId,
                    tenantId
                },
                ...((relations) ? {
                    relations: relations
                } : {}),
            });
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /**
     * Update public invoice
     *
     * @param params
     * @param entity
     * @returns
     */
    async updateInvoice(params, entity) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(params.token, index_1.environment.JWT_SECRET);
            const invoice = await this.typeOrmInvoiceRepository.findOneByOrFail({
                id: decoded.invoiceId,
                organizationId: decoded.organizationId,
                tenantId: decoded.tenantId,
            });
            return await this.typeOrmInvoiceRepository.update(invoice.id, entity);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.PublicInvoiceService = PublicInvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.Invoice)),
    __metadata("design:paramtypes", [type_orm_invoice_repository_1.TypeOrmInvoiceRepository])
], PublicInvoiceService);
//# sourceMappingURL=public-invoice.service.js.map