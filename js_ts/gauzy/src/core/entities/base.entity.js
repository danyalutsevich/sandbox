"use strict";
// Code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SoftDeletableBaseEntity_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = exports.SoftDeletableBaseEntity = exports.Model = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const mikro_orm_soft_delete_1 = require("mikro-orm-soft-delete");
const core_1 = require("@mikro-orm/core");
const entity_1 = require("../decorators/entity");
const column_index_decorator_1 = require("../decorators/entity/column-index.decorator");
/**
 * Abstract base class for dynamically assigning properties.
 */
class Model {
    constructor(input) {
        if (input) {
            // Iterate over the key-value pairs in the input object
            for (const [key, value] of Object.entries(input)) {
                // Assign the value to the corresponding property in this instance
                this[key] = value;
            }
        }
    }
}
exports.Model = Model;
/**
 * Base entity class with soft-delete functionality.
 * All entities that extend this class will have soft-delete capability.
 */
let SoftDeletableBaseEntity = exports.SoftDeletableBaseEntity = SoftDeletableBaseEntity_1 = class SoftDeletableBaseEntity extends Model {
    // Soft Delete
    deletedAt;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        format: 'date-time',
        example: '2018-11-21T06:20:32.232Z'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)()
    // Soft delete column that records the date/time when the entity was soft-deleted
    ,
    (0, typeorm_1.DeleteDateColumn)() // Indicates that this column is used for soft-delete
    ,
    (0, core_1.Property)({ nullable: true }) // Allows for Mikro-ORM compatibility
    ,
    __metadata("design:type", Date)
], SoftDeletableBaseEntity.prototype, "deletedAt", void 0);
exports.SoftDeletableBaseEntity = SoftDeletableBaseEntity = SoftDeletableBaseEntity_1 = __decorate([
    (0, mikro_orm_soft_delete_1.SoftDeletable)(() => SoftDeletableBaseEntity_1, 'deletedAt', () => new Date())
], SoftDeletableBaseEntity);
/**
 * Abstract base entity with common fields for UUID, creation, update timestamps, soft-delete, and more.
 */
class BaseEntity extends SoftDeletableBaseEntity {
    // Primary key of UUID type
    id;
    // Date when the record was created
    createdAt;
    // Date when the record was last updated
    updatedAt;
    // Indicates if record is active now
    isActive;
    // Indicate if record is archived
    isArchived;
}
exports.BaseEntity = BaseEntity;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, core_1.PrimaryKey)({ type: 'uuid', defaultRaw: 'gen_random_uuid()' }) // For Mikro-ORM compatibility
    ,
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BaseEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        format: 'date-time',
        example: '2018-11-21T06:20:32.232Z'
    }),
    (0, typeorm_1.CreateDateColumn)() // TypeORM decorator for creation date
    ,
    (0, core_1.Property)({
        // Automatically set the property value when entity gets created, executed during flush operation.
        onCreate: () => new Date(), // Set creation date on record creation
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: 'string',
        format: 'date-time',
        example: '2018-11-21T06:20:32.232Z'
    }),
    (0, typeorm_1.UpdateDateColumn)() // TypeORM decorator for update date
    ,
    (0, core_1.Property)({
        // Automatically set the property value when entity gets created, executed during flush operation.
        onCreate: () => new Date(),
        // Automatically update the property value every time entity gets updated, executed during flush operation.
        onUpdate: () => new Date(), // Update every time the entity is changed
    }),
    __metadata("design:type", Date)
], BaseEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        default: true
    }),
    (0, class_validator_1.IsOptional)() // Field can be optional
    ,
    (0, class_validator_1.IsBoolean)() // Should be a boolean type
    ,
    (0, column_index_decorator_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: true }) // TypeORM and Mikro-ORM compatibility
    ,
    __metadata("design:type", Boolean)
], BaseEntity.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        default: false
    }),
    (0, class_validator_1.IsOptional)() // Field can be optional
    ,
    (0, class_validator_1.IsBoolean)() // Should be a boolean type
    ,
    (0, column_index_decorator_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, default: false }) // TypeORM and Mikro-ORM compatibility
    ,
    __metadata("design:type", Boolean)
], BaseEntity.prototype, "isArchived", void 0);
//# sourceMappingURL=base.entity.js.map