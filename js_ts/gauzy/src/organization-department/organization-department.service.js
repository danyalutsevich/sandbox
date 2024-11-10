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
exports.OrganizationDepartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const organization_department_entity_1 = require("./organization-department.entity");
const crud_1 = require("./../core/crud");
const type_orm_organization_department_repository_1 = require("./repository/type-orm-organization-department.repository");
const mikro_orm_organization_department_repository_1 = require("./repository/mikro-orm-organization-department.repository");
let OrganizationDepartmentService = exports.OrganizationDepartmentService = class OrganizationDepartmentService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmOrganizationDepartmentRepository, mikroOrmOrganizationDepartmentRepository) {
        super(typeOrmOrganizationDepartmentRepository, mikroOrmOrganizationDepartmentRepository);
    }
    /**
     *
     * @param id
     * @returns
     */
    async findByEmployee(id) {
        return await this.typeOrmRepository
            .createQueryBuilder('organization_department')
            .leftJoin('organization_department.members', 'member')
            .where('member.id = :id', { id })
            .getMany();
    }
    /**
     *
     * @param filter
     * @returns
     */
    pagination(filter) {
        if ('where' in filter) {
            const { where } = filter;
            if ('name' in where) {
                const { name } = where;
                filter.where.name = (0, typeorm_2.Like)(`%${name}%`);
            }
            if ('tags' in where) {
                const { tags } = where;
                filter.where.tags = {
                    id: (0, typeorm_2.In)(tags)
                };
            }
        }
        return super.paginate(filter);
    }
};
exports.OrganizationDepartmentService = OrganizationDepartmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(organization_department_entity_1.OrganizationDepartment)),
    __metadata("design:paramtypes", [type_orm_organization_department_repository_1.TypeOrmOrganizationDepartmentRepository,
        mikro_orm_organization_department_repository_1.MikroOrmOrganizationDepartmentRepository])
], OrganizationDepartmentService);
//# sourceMappingURL=organization-department.service.js.map