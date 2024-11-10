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
exports.CandidateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const index_1 = require("../../plugins/common/dist/index");
const candidate_entity_1 = require("./candidate.entity");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const database_helper_1 = require("./../database/database.helper");
const type_orm_candidate_repository_1 = require("./repository/type-orm-candidate.repository");
const mikro_orm_candidate_repository_1 = require("./repository/mikro-orm-candidate.repository");
let CandidateService = exports.CandidateService = class CandidateService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmCandidateRepository, mikroOrmCandidateRepository) {
        super(typeOrmCandidateRepository, mikroOrmCandidateRepository);
    }
    /**
     *
     * @param input
     * @returns
     */
    async createBulk(input) {
        return Promise.all(input.map((candidate) => {
            candidate.user.tenant = {
                id: candidate.organization.tenantId
            };
            return this.create(candidate);
        }));
    }
    /**
     * Candidate Custom Pagination
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        try {
            const query = this.typeOrmRepository.createQueryBuilder('candidate');
            query.setFindOptions({
                skip: options && options.skip ? options.take * (options.skip - 1) : 0,
                take: options && options.take ? options.take : 10,
                ...(options && options.relations
                    ? {
                        relations: options.relations
                    }
                    : {}),
                ...(options && options.join
                    ? {
                        join: options.join
                    }
                    : {})
            });
            query.where((qb) => {
                qb.andWhere(new typeorm_2.Brackets((web) => {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."tenantId" = :tenantId`), {
                        tenantId: context_1.RequestContext.currentTenantId()
                    });
                    if ((0, index_1.isNotEmpty)(options.where)) {
                        const { where } = options;
                        if ((0, index_1.isNotEmpty)(where.organizationId)) {
                            const { organizationId } = where;
                            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."organizationId" = :organizationId`), {
                                organizationId
                            });
                        }
                    }
                }));
                if ((0, index_1.isNotEmpty)(options.where)) {
                    const { where } = options;
                    qb.andWhere(new typeorm_2.Brackets((web) => {
                        if ((0, index_1.isNotEmpty)(where.isArchived) && (0, index_1.isNotEmpty)(Boolean(JSON.parse(where.isArchived)))) {
                            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${qb.alias}"."isArchived" = :isArchived`), {
                                isArchived: false
                            });
                        }
                    }));
                    qb.andWhere(new typeorm_2.Brackets((web) => {
                        if ((0, index_1.isNotEmpty)(where.tags)) {
                            const { tags } = where;
                            web.andWhere((0, database_helper_1.prepareSQLQuery)(`"tags"."id" IN (:...tags)`), { tags });
                        }
                    }));
                    qb.andWhere(new typeorm_2.Brackets((web) => {
                        if ((0, index_1.isNotEmpty)(where.user)) {
                            if ((0, index_1.isNotEmpty)(where.user.name)) {
                                const keywords = where.user.name.split(' ');
                                keywords.forEach((keyword, index) => {
                                    web.orWhere((0, database_helper_1.prepareSQLQuery)(`LOWER("user"."firstName") like LOWER(:keyword_${index})`), {
                                        [`keyword_${index}`]: `%${keyword}%`
                                    });
                                    web.orWhere((0, database_helper_1.prepareSQLQuery)(`LOWER("user"."lastName") like LOWER(:${index}_keyword)`), {
                                        [`${index}_keyword`]: `%${keyword}%`
                                    });
                                });
                            }
                            if ((0, index_1.isNotEmpty)(where.user.email)) {
                                const { email } = where.user;
                                web.orWhere((0, database_helper_1.prepareSQLQuery)(`LOWER("user"."email") like LOWER(:email)`), {
                                    email: `%${email}%`
                                });
                            }
                        }
                    }));
                }
            });
            const [items, total] = await query.getManyAndCount();
            return { items, total };
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.CandidateService = CandidateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(candidate_entity_1.Candidate)),
    __metadata("design:paramtypes", [type_orm_candidate_repository_1.TypeOrmCandidateRepository,
        mikro_orm_candidate_repository_1.MikroOrmCandidateRepository])
], CandidateService);
//# sourceMappingURL=candidate.service.js.map