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
exports.CustomSmtp = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const internal_1 = require("../core/entities/internal");
const decorators_1 = require("./../core/decorators");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_custom_smtp_repository_1 = require("./repository/mikro-orm-custom-smtp.repository");
//'../../../config/dist/index';
//'../../../plugins/integration-ai/dist/index';
let CustomSmtp = exports.CustomSmtp = class CustomSmtp extends internal_1.TenantOrganizationBaseEntity {
    fromAddress;
    host;
    port;
    secure;
    username;
    password;
    isValidate;
    /**
     * Additional fields to expose secret fields
     */
    secretKey;
    secretPassword;
    /**
     * Get SMTP transporter configuration
     *
     * @returns
     */
    getSmtpTransporter() {
        return {
            fromAddress: this.fromAddress,
            host: this.host,
            port: this.port,
            secure: this.secure || false,
            auth: {
                user: this.username,
                pass: this.password
            }
        };
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, examples: ['noreply@domain.com'] }),
    (0, class_validator_1.IsEmail)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], CustomSmtp.prototype, "fromAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, examples: ['smtp.postmarkapp.com', 'smtp.gmail.com'] }),
    (0, class_validator_1.IsString)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], CustomSmtp.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, examples: [587, 465] }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], CustomSmtp.prototype, "port", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean, examples: [true, false] }),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Boolean)
], CustomSmtp.prototype, "secure", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], CustomSmtp.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toPlainOnly: true }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], CustomSmtp.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean, default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, entity_1.MultiORMColumn)({ default: false }),
    __metadata("design:type", Boolean)
], CustomSmtp.prototype, "isValidate", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ toPlainOnly: true, name: 'username' }),
    (0, decorators_1.IsSecret)(),
    __metadata("design:type", String)
], CustomSmtp.prototype, "secretKey", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ toPlainOnly: true, name: 'password' }),
    (0, decorators_1.IsSecret)(),
    __metadata("design:type", String)
], CustomSmtp.prototype, "secretPassword", void 0);
exports.CustomSmtp = CustomSmtp = __decorate([
    (0, entity_1.MultiORMEntity)('custom_smtp', { mikroOrmRepository: () => mikro_orm_custom_smtp_repository_1.MikroOrmCustomSmtpRepository })
], CustomSmtp);
//# sourceMappingURL=custom-smtp.entity.js.map