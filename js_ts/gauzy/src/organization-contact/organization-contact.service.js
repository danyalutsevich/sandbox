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
exports.OrganizationContactService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const context_1 = require("../core/context");
const crud_1 = require("./../core/crud");
const database_helper_1 = require("./../database/database.helper");
const repository_1 = require("./repository");
let OrganizationContactService = exports.OrganizationContactService = class OrganizationContactService extends crud_1.TenantAwareCrudService {
    typeOrmOrganizationContactRepository;
    mikroOrmOrganizationContactRepository;
    constructor(typeOrmOrganizationContactRepository, mikroOrmOrganizationContactRepository) {
        super(typeOrmOrganizationContactRepository, mikroOrmOrganizationContactRepository);
        this.typeOrmOrganizationContactRepository = typeOrmOrganizationContactRepository;
        this.mikroOrmOrganizationContactRepository = mikroOrmOrganizationContactRepository;
    }
    /**
     * Find employee assigned contacts
     *
     * @param employeeId
     * @param options
     * @returns
     */
    async findByEmployee(employeeId, options) {
        try {
            const query = this.typeOrmRepository.createQueryBuilder(this.tableName);
            query.setFindOptions({
                select: {
                    id: true,
                    name: true,
                    imageUrl: true
                }
            });
            query.innerJoin(`${query.alias}.members`, 'member');
            query.andWhere(new typeorm_1.Brackets((qb) => {
                const tenantId = context_1.RequestContext.currentTenantId();
                const { organizationId, contactType } = options;
                qb.andWhere((0, database_helper_1.prepareSQLQuery)('member.id = :employeeId'), { employeeId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
                qb.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" = :organizationId`), { organizationId });
                if ((0, index_2.isNotEmpty)(contactType)) {
                    qb.andWhere((0, database_helper_1.prepareSQLQuery)(`${query.alias}.contactType = :contactType`), { contactType });
                }
            }));
            return await query.getMany();
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /*
     * Get All Organization Contact
     */
    async findAllOrganizationContacts(data) {
        const { relations, findInput } = data;
        if (findInput && findInput['employeeId']) {
            return await this.getOrganizationContactByEmployee(data);
        }
        return this.findAll({
            where: findInput,
            relations
        });
    }
    /*
     * Get All Organization By Employee
     */
    async getOrganizationContactByEmployee(data) {
        const { relations, findInput } = data;
        const { employeeId, organizationId, contactType } = findInput;
        const { tenantId, id: createdBy } = context_1.RequestContext.currentUser();
        const query = this.typeOrmRepository.createQueryBuilder('organization_contact');
        if (relations.length > 0) {
            relations.forEach((relation) => {
                if (relation.indexOf('.') !== -1) {
                    const alias = relation.split('.').slice(-1)[0];
                    query.leftJoinAndSelect(`${relation}`, alias);
                }
                else {
                    const alias = relation;
                    query.leftJoinAndSelect(`${query.alias}.${relation}`, alias);
                }
            });
        }
        query.where(new typeorm_1.Brackets((subQuery) => {
            subQuery
                .where('members.id =:employeeId', { employeeId })
                .orWhere(`${query.alias}.createdBy = :createdBy`, {
                createdBy
            });
        }));
        query.andWhere(`${query.alias}.contactType = :contactType`, {
            contactType
        });
        if (organizationId) {
            query.andWhere(`${query.alias}.organizationId = :organizationId`, {
                organizationId
            });
        }
        query.andWhere(`${query.alias}.tenantId = :tenantId`, {
            tenantId
        });
        const [items, total] = await query.getManyAndCount();
        return { items, total };
    }
    async findById(id, relations) {
        return await this.findOneByIdString(id, { relations });
    }
    /**
     * Organization contact by pagination
     *
     * @param params
     * @returns
     */
    async pagination(params) {
        // Custom Filters
        if ('where' in params) {
            const likeOperator = (0, index_1.isPostgres)() ? 'ILIKE' : 'LIKE';
            const { where } = params;
            if ('name' in where) {
                const { name } = where;
                params['where']['name'] = (0, typeorm_1.Raw)((alias) => `${alias} ${likeOperator} '%${name}%'`);
            }
            if ('primaryPhone' in where) {
                const { primaryPhone } = where;
                params['where']['primaryPhone'] = (0, typeorm_1.Raw)((alias) => `${alias} ${likeOperator} '%${primaryPhone}%'`);
            }
            if ('primaryEmail' in where) {
                const { primaryEmail } = where;
                params['where']['primaryEmail'] = (0, typeorm_1.Raw)((alias) => `${alias} ${likeOperator} '%${primaryEmail}%'`);
            }
            if ('members' in where) {
                const { members } = where;
                params['where']['members'] = {
                    id: (0, typeorm_1.In)(members)
                };
            }
        }
        return await super.paginate(params);
    }
};
exports.OrganizationContactService = OrganizationContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmOrganizationContactRepository,
        repository_1.MikroOrmOrganizationContactRepository])
], OrganizationContactService);
//# sourceMappingURL=organization-contact.service.js.map