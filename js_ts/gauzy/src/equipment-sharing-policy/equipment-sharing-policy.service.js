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
exports.EquipmentSharingPolicyService = void 0;
const crud_1 = require("./../core/crud");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const equipment_sharing_policy_entity_1 = require("./equipment-sharing-policy.entity");
const type_orm_equipment_sharing_policy_repository_1 = require("./repository/type-orm-equipment-sharing-policy.repository");
const mikro_orm_equipment_sharing_policy_repository_1 = require("./repository/mikro-orm-equipment-sharing-policy.repository");
let EquipmentSharingPolicyService = exports.EquipmentSharingPolicyService = class EquipmentSharingPolicyService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmEquipmentSharingPolicyRepository, mikroOrmEquipmentSharingPolicyRepository) {
        super(typeOrmEquipmentSharingPolicyRepository, mikroOrmEquipmentSharingPolicyRepository);
    }
    /**
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        try {
            const policy = new equipment_sharing_policy_entity_1.EquipmentSharingPolicy();
            policy.name = entity.name;
            policy.organizationId = entity.organizationId;
            policy.tenantId = entity.tenantId;
            policy.description = entity.description;
            return this.typeOrmRepository.save(policy);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    /**
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        try {
            const policy = await this.typeOrmRepository.findOneBy({ id });
            policy.name = entity.name;
            policy.organizationId = entity.organizationId;
            policy.description = entity.description;
            return this.typeOrmRepository.save(policy);
        }
        catch (err /*: WriteError*/) {
            throw new common_1.BadRequestException(err);
        }
    }
};
exports.EquipmentSharingPolicyService = EquipmentSharingPolicyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_sharing_policy_entity_1.EquipmentSharingPolicy)),
    __metadata("design:paramtypes", [type_orm_equipment_sharing_policy_repository_1.TypeOrmEquipmentSharingPolicyRepository,
        mikro_orm_equipment_sharing_policy_repository_1.MikroOrmEquipmentSharingPolicyRepository])
], EquipmentSharingPolicyService);
//# sourceMappingURL=equipment-sharing-policy.service.js.map