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
exports.OrganizationVendorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_vendor_entity_1 = require("./organization-vendor.entity");
const expense_entity_1 = require("../expense/expense.entity");
const crud_1 = require("./../core/crud");
const type_orm_organization_vendor_repository_1 = require("./repository/type-orm-organization-vendor.repository");
const mikro_orm_organization_vendor_repository_1 = require("./repository/mikro-orm-organization-vendor.repository");
let OrganizationVendorService = exports.OrganizationVendorService = class OrganizationVendorService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmOrganizationVendorRepository, mikroOrmOrganizationVendorRepository) {
        super(typeOrmOrganizationVendorRepository, mikroOrmOrganizationVendorRepository);
    }
    async deleteVendor(vendorId) {
        const vendor = await this.typeOrmRepository
            .createQueryBuilder('vendor')
            .leftJoin(expense_entity_1.Expense, 'expense', 'vendor.id = expense."vendorId"')
            .where('expense."vendorId" = :vendorId', { vendorId: vendorId })
            .getOne();
        if (vendor) {
            throw new common_1.BadRequestException("This Vendor can't be deleted because it is used in expense records");
        }
        return await this.delete(vendorId);
    }
    pagination(filter) {
        if ('where' in filter) {
            const { where } = filter;
            if (where.tags) {
                filter.where.tags = {
                    id: (0, typeorm_2.In)(where.tags)
                };
            }
        }
        return super.paginate(filter);
    }
};
exports.OrganizationVendorService = OrganizationVendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_vendor_entity_1.OrganizationVendor)),
    __metadata("design:paramtypes", [type_orm_organization_vendor_repository_1.TypeOrmOrganizationVendorRepository,
        mikro_orm_organization_vendor_repository_1.MikroOrmOrganizationVendorRepository])
], OrganizationVendorService);
//# sourceMappingURL=organization-vendor.service.js.map