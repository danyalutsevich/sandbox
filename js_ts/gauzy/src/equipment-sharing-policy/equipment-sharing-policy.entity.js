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
exports.EquipmentSharingPolicy = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_equipment_sharing_policy_repository_1 = require("./repository/mikro-orm-equipment-sharing-policy.repository");
let EquipmentSharingPolicy = exports.EquipmentSharingPolicy = class EquipmentSharingPolicy extends internal_1.TenantOrganizationBaseEntity {
    name;
    description;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
    * EquipmentSharing
    */
    equipmentSharings;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], EquipmentSharingPolicy.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], EquipmentSharingPolicy.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.EquipmentSharing, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.EquipmentSharing, (it) => it.equipmentSharingPolicy, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], EquipmentSharingPolicy.prototype, "equipmentSharings", void 0);
exports.EquipmentSharingPolicy = EquipmentSharingPolicy = __decorate([
    (0, entity_1.MultiORMEntity)('equipment_sharing_policy', { mikroOrmRepository: () => mikro_orm_equipment_sharing_policy_repository_1.MikroOrmEquipmentSharingPolicyRepository })
], EquipmentSharingPolicy);
//# sourceMappingURL=equipment-sharing-policy.entity.js.map