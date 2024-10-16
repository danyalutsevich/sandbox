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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const underscore_1 = require("underscore");
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../plugins/common/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const utils_1 = require("../core/utils");
const crud_1 = require("./../core/crud");
const context_1 = require("../core/context");
const email_service_1 = require("./../email-send/email.service");
const database_helper_1 = require("./../database/database.helper");
const mikro_orm_payment_repository_1 = require("./repository/mikro-orm-payment.repository");
const type_orm_payment_repository_1 = require("./repository/type-orm-payment.repository");
let PaymentService = exports.PaymentService = class PaymentService extends crud_1.TenantAwareCrudService {
    typeOrmPaymentRepository;
    mikroOrmPaymentRepository;
    emailService;
    constructor(typeOrmPaymentRepository, mikroOrmPaymentRepository, emailService) {
        super(typeOrmPaymentRepository, mikroOrmPaymentRepository);
        this.typeOrmPaymentRepository = typeOrmPaymentRepository;
        this.mikroOrmPaymentRepository = mikroOrmPaymentRepository;
        this.emailService = emailService;
    }
    /**
     * Retrieves payments based on the provided request parameters.
     *
     * @param request - Request parameters for filtering payments.
     * @returns A Promise that resolves to an array of payments.
     */
    async getPayments(request) {
        // Create a query builder for the Payment entity
        const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
        // Set up the find options for the query
        query.setFindOptions({
            ...(request && request.limit > 0
                ? {
                    take: request.limit,
                    skip: (request.page || 0) * request.limit
                }
                : {}),
            join: {
                alias: `${this.tableName}`,
                leftJoin: {
                    project: `${this.tableName}.project`
                }
            },
            select: {
                project: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    membersCount: true
                },
                organizationContact: {
                    id: true,
                    name: true,
                    imageUrl: true
                }
            },
            relations: {
                project: true,
                organizationContact: true
            },
            order: {
                paymentDate: 'ASC'
            }
        });
        // Set up the where clause using the provided filter function
        query.where((qb) => {
            this.getFilterQuery(qb, request);
        });
        // Set up the where clause using the provided filter function
        return await query.getMany();
    }
    /**
     * Retrieves daily payment report charts based on the provided request parameters.
     *
     * @param request - Request parameters for filtering data.
     * @returns A Promise that resolves to an array of daily payment report charts.
     */
    async getDailyReportCharts(request) {
        // Create a query builder for the Payment entity
        const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
        // Set up the find options for the query
        query.setFindOptions({
            ...(request.limit > 0
                ? {
                    take: request.limit,
                    skip: (request.page || 0) * request.limit
                }
                : {}),
            order: {
                // Order results by the 'startedAt' field in ascending order
                paymentDate: 'ASC'
            }
        });
        // Set up the where clause using the provided filter function
        query.where((qb) => {
            this.getFilterQuery(qb, request);
        });
        // Set up the where clause using the provided filter function
        const payments = await query.getMany();
        // Gets an array of days between the given start date, end date and timezone.
        const { startDate, endDate, timeZone } = request;
        const days = (0, utils_1.getDaysBetweenDates)(startDate, endDate, timeZone);
        // Group payments by date and calculate sum
        const byDate = (0, underscore_1.chain)(payments)
            .groupBy((payment) => moment_1.default.utc(payment.paymentDate).tz(timeZone).format('YYYY-MM-DD'))
            .mapObject((payments, date) => {
            const sum = payments.reduce((iteratee, payment) => {
                return iteratee + parseFloat(payment.amount);
            }, 0);
            return {
                date,
                value: {
                    payment: sum.toFixed(1)
                }
            };
        })
            .value();
        // Map dates to the required format
        const dates = days.map((date) => byDate[date] || { date, value: { payment: 0 } });
        return dates;
    }
    /**
     *
     * @param query
     * @param request
     * @returns
     */
    getFilterQuery(query, request) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const { organizationId, startDate, endDate } = request;
        let { projectIds = [], contactIds = [] } = request;
        // Calculate start and end dates using a utility function
        const { start, end } = (0, utils_1.getDateRangeFormat)(moment_1.default.utc(startDate || (0, moment_1.default)().startOf('week')), moment_1.default.utc(endDate || (0, moment_1.default)().endOf('week')));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.where({
                paymentDate: (0, typeorm_1.Between)(start, end)
            });
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
            qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
        }));
        query.andWhere(new typeorm_1.Brackets((qb) => {
            if ((0, index_1.isNotEmpty)(projectIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."projectId" IN (:...projectIds)`), {
                    projectIds
                });
            }
            if ((0, index_1.isNotEmpty)(contactIds)) {
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationContactId" IN (:...contactIds)`), {
                    contactIds
                });
            }
        }));
        return query;
    }
    /**
     *
     * @param languageCode
     * @param params
     * @param origin
     */
    async sendReceipt(languageCode, invoice, payment, origin) {
        try {
            const { primaryEmail: recipientEmail, name: recipientName } = invoice.toContact;
            await this.emailService.sendPaymentReceipt(languageCode, recipientEmail, recipientName, invoice.invoiceNumber, payment.amount, payment.currency, invoice.fromOrganization, origin);
            return true;
        }
        catch (error) {
            return false;
        }
    }
    pagination(filter) {
        if ('where' in filter) {
            const { where } = filter;
            const likeOperator = (0, index_2.isPostgres)() ? 'ILIKE' : 'LIKE';
            if ('note' in where) {
                const { note } = where;
                filter['where']['note'] = (0, typeorm_1.Raw)((alias) => `${alias} ${likeOperator} '%${note}%'`);
            }
            if ('paymentDate' in where) {
                const { paymentDate } = where;
                const { startDate, endDate } = paymentDate;
                if (startDate && endDate) {
                    filter['where']['paymentDate'] = (0, typeorm_1.Between)(moment_1.default.utc(startDate).format('YYYY-MM-DD HH:mm:ss'), moment_1.default.utc(endDate).format('YYYY-MM-DD HH:mm:ss'));
                }
                else {
                    filter['where']['paymentDate'] = (0, typeorm_1.Between)((0, moment_1.default)().startOf('month').utc().format('YYYY-MM-DD HH:mm:ss'), (0, moment_1.default)().endOf('month').utc().format('YYYY-MM-DD HH:mm:ss'));
                }
            }
            if ('tags' in where) {
                const { tags } = where;
                filter['where']['tags'] = {
                    id: (0, typeorm_1.In)(tags)
                };
            }
        }
        return super.paginate(filter);
    }
};
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_payment_repository_1.TypeOrmPaymentRepository,
        mikro_orm_payment_repository_1.MikroOrmPaymentRepository,
        email_service_1.EmailService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map