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
exports.CandidateTechnologiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crud_1 = require("./../core/crud");
const candidate_technologies_entity_1 = require("./candidate-technologies.entity");
const type_orm_candidate_technologies_repository_1 = require("./repository/type-orm-candidate-technologies.repository");
const mikro_orm_candidate_technologies_repository_1 = require("./repository/mikro-orm-candidate-technologies.repository");
let CandidateTechnologiesService = exports.CandidateTechnologiesService = class CandidateTechnologiesService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmCandidateTechnologiesRepository, mikroOrmCandidateTechnologiesRepository) {
        super(typeOrmCandidateTechnologiesRepository, mikroOrmCandidateTechnologiesRepository);
    }
    /**
     *
     * @param createInput
     * @returns
     */
    async createBulk(createInput) {
        return await this.typeOrmRepository.save(createInput);
    }
    /**
     *
     * @param interviewId
     * @returns
     */
    async getTechnologiesByInterviewId(interviewId) {
        return await this.typeOrmRepository
            .createQueryBuilder('candidate_technology')
            .where('candidate_technology.interviewId = :interviewId', {
            interviewId
        })
            .getMany();
    }
    /**
     *
     * @param ids
     * @returns
     */
    async deleteBulk(ids) {
        return await this.typeOrmRepository.delete(ids);
    }
};
exports.CandidateTechnologiesService = CandidateTechnologiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(candidate_technologies_entity_1.CandidateTechnologies)),
    __metadata("design:paramtypes", [type_orm_candidate_technologies_repository_1.TypeOrmCandidateTechnologiesRepository,
        mikro_orm_candidate_technologies_repository_1.MikroOrmCandidateTechnologiesRepository])
], CandidateTechnologiesService);
//# sourceMappingURL=candidate-technologies.service.js.map