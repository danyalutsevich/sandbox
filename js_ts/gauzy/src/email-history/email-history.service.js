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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHistoryService = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("../core/crud");
const context_1 = require("../core/context");
const repository_1 = require("./repository");
let EmailHistoryService = exports.EmailHistoryService = class EmailHistoryService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmEmailHistoryRepository, mikroOrmEmailHistoryRepository) {
        super(typeOrmEmailHistoryRepository, mikroOrmEmailHistoryRepository);
    }
    /**
     * Retrieves a list of email history records with optional filtering.
     * @param filter Optional filtering options.
     * @returns A paginated list of email history records.
     */
    async findAll(filter) {
        const query = this.typeOrmRepository.createQueryBuilder('email_sent');
        query.leftJoin(`${query.alias}.user`, 'user');
        query.leftJoin(`${query.alias}.emailTemplate`, 'emailTemplate');
        query.addSelect(['user.email', 'user.firstName', 'user.lastName', 'user.imageUrl']);
        const { organizationId } = filter.where;
        const tenantId = context_1.RequestContext.currentTenantId() || filter.where.tenantId;
        query.where({
            organizationId,
            tenantId,
            isActive: true,
            isArchived: false
        });
        query.take(filter.take ? filter.take : 20);
        query.orderBy(`${query.alias}.createdAt`, 'DESC');
        const [items, total] = await query.getManyAndCount();
        return {
            items,
            total
        };
    }
};
exports.EmailHistoryService = EmailHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmEmailHistoryRepository,
        repository_1.MikroOrmEmailHistoryRepository])
], EmailHistoryService);
//# sourceMappingURL=email-history.service.js.map