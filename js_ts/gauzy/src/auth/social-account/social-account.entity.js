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
exports.SocialAccount = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const knex_1 = require("@mikro-orm/knex");
const class_validator_1 = require("class-validator");
const contracts_1 = require("../../../plugins/contracts");
const internal_1 = require("../../core/entities/internal");
const entity_1 = require("../../core/decorators/entity");
const repository_1 = require("./repository");
let SocialAccount = exports.SocialAccount = class SocialAccount extends internal_1.TenantBaseEntity {
    [knex_1.EntityRepositoryType];
    provider;
    providerAccountId;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    /**
     * User
     */
    user;
    userId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(contracts_1.ProviderEnum, { message: 'provider `$value` must be a valid enum value' }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], SocialAccount.prototype, "provider", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], SocialAccount.prototype, "providerAccountId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], SocialAccount.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.user),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], SocialAccount.prototype, "userId", void 0);
exports.SocialAccount = SocialAccount = __decorate([
    (0, entity_1.MultiORMEntity)('social_account', { mikroOrmRepository: () => repository_1.MicroOrmSocialAccountRepository })
], SocialAccount);
//# sourceMappingURL=social-account.entity.js.map