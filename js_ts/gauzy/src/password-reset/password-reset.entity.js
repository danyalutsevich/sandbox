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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordReset = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const moment_1 = __importDefault(require("moment"));
const class_validator_1 = require("class-validator");
const tenant_base_entity_1 = require("./../core/entities/tenant-base.entity");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_password_reset_repository_1 = require("./repository/mikro-orm-password-reset.repository");
let PasswordReset = exports.PasswordReset = class PasswordReset extends tenant_base_entity_1.TenantBaseEntity {
    /** */
    email;
    /** */
    token;
    /** Additional virtual columns */
    expired;
    /**
    * Called after entity is loaded.
    */
    afterLoadEntity() {
        const createdAt = (0, moment_1.default)(this.createdAt, 'YYYY-MM-DD HH:mm:ss');
        const expiredAt = (0, moment_1.default)((0, moment_1.default)(), 'YYYY-MM-DD HH:mm:ss');
        this.expired = expiredAt.diff(createdAt, 'minutes') > 10;
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], PasswordReset.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], PasswordReset.prototype, "token", void 0);
__decorate([
    (0, entity_1.VirtualMultiOrmColumn)(),
    __metadata("design:type", Boolean)
], PasswordReset.prototype, "expired", void 0);
__decorate([
    (0, typeorm_1.AfterLoad)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PasswordReset.prototype, "afterLoadEntity", null);
exports.PasswordReset = PasswordReset = __decorate([
    (0, entity_1.MultiORMEntity)('password_reset', { mikroOrmRepository: () => mikro_orm_password_reset_repository_1.MikroOrmPasswordResetRepository })
], PasswordReset);
//# sourceMappingURL=password-reset.entity.js.map