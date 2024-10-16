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
exports.EquipmentSharing = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_equipment_sharing_repository_1 = require("./repository/mikro-orm-equipment-sharing.repository");
let EquipmentSharing = exports.EquipmentSharing = class EquipmentSharing extends internal_1.TenantOrganizationBaseEntity {
    name;
    shareRequestDay;
    shareStartDay;
    shareEndDay;
    status;
    createdBy;
    createdByName;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * Equipment
     */
    equipment;
    equipmentId;
    /**
    * Equipment
    */
    equipmentSharingPolicy;
    equipmentSharingPolicyId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    /**
     * Employee
     */
    employees;
    /**
     * OrganizationTeam
     */
    teams;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], EquipmentSharing.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], EquipmentSharing.prototype, "shareRequestDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], EquipmentSharing.prototype, "shareStartDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Date)
], EquipmentSharing.prototype, "shareEndDay", void 0);
__decorate([
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], EquipmentSharing.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], EquipmentSharing.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], EquipmentSharing.prototype, "createdByName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Equipment }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Equipment, (equipment) => equipment.equipmentSharings, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], EquipmentSharing.prototype, "equipment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.equipment),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], EquipmentSharing.prototype, "equipmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.EquipmentSharingPolicy }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.EquipmentSharingPolicy, (it) => it.equipmentSharings, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], EquipmentSharing.prototype, "equipmentSharingPolicy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.equipmentSharingPolicy),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], EquipmentSharing.prototype, "equipmentSharingPolicyId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Employee, (it) => it.equipmentSharings, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'equipment_shares_employees',
        joinColumn: 'equipmentSharingId',
        inverseJoinColumn: 'employeeId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'equipment_shares_employees'
    }),
    __metadata("design:type", Array)
], EquipmentSharing.prototype, "employees", void 0);
__decorate([
    (0, entity_1.MultiORMManyToMany)(() => internal_1.OrganizationTeam, (it) => it.equipmentSharings, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'equipment_shares_teams',
        joinColumn: 'equipmentSharingId',
        inverseJoinColumn: 'organizationTeamId',
    }),
    (0, typeorm_1.JoinTable)({
        name: 'equipment_shares_teams'
    }),
    __metadata("design:type", Array)
], EquipmentSharing.prototype, "teams", void 0);
exports.EquipmentSharing = EquipmentSharing = __decorate([
    (0, entity_1.MultiORMEntity)('equipment_sharing', { mikroOrmRepository: () => mikro_orm_equipment_sharing_repository_1.MikroOrmEquipmentSharingRepository })
], EquipmentSharing);
//# sourceMappingURL=equipment-sharing.entity.js.map