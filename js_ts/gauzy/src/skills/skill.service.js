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
exports.SkillService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const skill_entity_1 = require("./skill.entity");
const crud_1 = require("./../core/crud");
const database_helper_1 = require("./../database/database.helper");
const mikro_orm_skill_repository_1 = require("./repository/mikro-orm-skill.repository");
const type_orm_skill_repository_1 = require("./repository/type-orm-skill.repository");
let SkillService = exports.SkillService = class SkillService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmSkillRepository, mikroOrmSkillRepository) {
        super(typeOrmSkillRepository, mikroOrmSkillRepository);
    }
    /**
     *
     * @param name
     * @returns
     */
    async findOneByName(name) {
        const query = this.typeOrmRepository.createQueryBuilder('skill').where((0, database_helper_1.prepareSQLQuery)(`"skill"."name" = :name`), {
            name
        });
        const item = await query.getOne();
        return item;
    }
};
exports.SkillService = SkillService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(skill_entity_1.Skill)),
    __metadata("design:paramtypes", [type_orm_skill_repository_1.TypeOrmSkillRepository,
        mikro_orm_skill_repository_1.MikroOrmSkillRepository])
], SkillService);
//# sourceMappingURL=skill.service.js.map