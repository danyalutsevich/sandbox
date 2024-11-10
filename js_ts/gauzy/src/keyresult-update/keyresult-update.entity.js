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
exports.KeyResultUpdate = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_keyresult_update_repository_1 = require("./repository/mikro-orm-keyresult-update.repository");
let KeyResultUpdate = exports.KeyResultUpdate = class KeyResultUpdate extends internal_1.TenantOrganizationBaseEntity {
    update;
    progress;
    owner;
    status;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    keyResult;
    keyResultId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], KeyResultUpdate.prototype, "update", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], KeyResultUpdate.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], KeyResultUpdate.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.KeyResultUpdateStatusEnum }),
    (0, class_validator_1.IsEnum)(index_1.KeyResultUpdateStatusEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], KeyResultUpdate.prototype, "status", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.KeyResult, (it) => it.updates, {
        onDelete: 'CASCADE'
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], KeyResultUpdate.prototype, "keyResult", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, typeorm_1.RelationId)((it) => it.keyResult),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], KeyResultUpdate.prototype, "keyResultId", void 0);
exports.KeyResultUpdate = KeyResultUpdate = __decorate([
    (0, entity_1.MultiORMEntity)('key_result_update', { mikroOrmRepository: () => mikro_orm_keyresult_update_repository_1.MikroOrmKeyResultUpdateRepository })
], KeyResultUpdate);
//# sourceMappingURL=keyresult-update.entity.js.map