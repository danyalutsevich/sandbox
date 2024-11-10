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
exports.Equipment = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const pipes_1 = require("./../shared/pipes");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_equipment_repository_1 = require("./repository/mikro-orm-equipment.repository");
let Equipment = exports.Equipment = class Equipment extends internal_1.TenantOrganizationBaseEntity {
    name;
    type;
    serialNumber;
    manufacturedYear;
    initialCost;
    currency;
    maxSharePeriod;
    autoApproveShare;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * ImageAsset
     */
    image;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    /**
     * EquipmentSharing
     */
    equipmentSharings;
    /*
    |--------------------------------------------------------------------------
    | @ManyToMany
    |--------------------------------------------------------------------------
    */
    tags;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Equipment.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Equipment.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Equipment.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Equipment.prototype, "manufacturedYear", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Equipment.prototype, "initialCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CurrenciesEnum }),
    (0, class_validator_1.IsEnum)(index_1.CurrenciesEnum),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Equipment.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        type: 'numeric',
        transformer: new pipes_1.ColumnNumericTransformerPipe()
    }),
    __metadata("design:type", Number)
], Equipment.prototype, "maxSharePeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Boolean)
], Equipment.prototype, "autoApproveShare", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.ImageAsset }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.ImageAsset, (imageAsset) => imageAsset.equipmentImage, {
        /** Indicates if relation column value can be nullable or not. */
        nullable: true,
        /** Database cascade action on delete. */
        onDelete: 'SET NULL'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], Equipment.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.EquipmentSharing, isArray: true }),
    (0, entity_1.MultiORMOneToMany)(() => internal_1.EquipmentSharing, (equipmentSharing) => equipmentSharing.equipment, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Equipment.prototype, "equipmentSharings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Tag, isArray: true }),
    (0, entity_1.MultiORMManyToMany)(() => internal_1.Tag, (tag) => tag.equipments, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        owner: true,
        pivotTable: 'tag_equipment',
        joinColumn: 'equipmentId',
        inverseJoinColumn: 'tagId',
    }),
    (0, typeorm_1.JoinTable)({ name: 'tag_equipment' }),
    __metadata("design:type", Array)
], Equipment.prototype, "tags", void 0);
exports.Equipment = Equipment = __decorate([
    (0, entity_1.MultiORMEntity)('equipment', { mikroOrmRepository: () => mikro_orm_equipment_repository_1.MikroOrmEquipmentRepository })
], Equipment);
//# sourceMappingURL=equipment.entity.js.map