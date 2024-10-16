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
exports.EmailHistory = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_email_history_repository_1 = require("./repository/mikro-orm-email-history.repository");
let EmailHistory = exports.EmailHistory = class EmailHistory extends internal_1.TenantOrganizationBaseEntity {
    name;
    content;
    email;
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
    /**
     * Email Template
     */
    emailTemplate;
    emailTemplateId;
    status;
};
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], EmailHistory.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.MultiORMColumn)({
        nullable: true,
        ...((0, index_1.isMySQL)() ? { type: 'text' } : {})
    }),
    __metadata("design:type", String)
], EmailHistory.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], EmailHistory.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.User }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.User, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Object)
], EmailHistory.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.user),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", Object)
], EmailHistory.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.EmailTemplate }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.EmailTemplate),
    __metadata("design:type", Object)
], EmailHistory.prototype, "emailTemplate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsUUID)(),
    (0, typeorm_1.RelationId)((it) => it.emailTemplate),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], EmailHistory.prototype, "emailTemplateId", void 0);
__decorate([
    (0, entity_1.ColumnIndex)(),
    (0, swagger_1.ApiPropertyOptional)({ type: () => String, enum: index_2.EmailStatusEnum }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(index_2.EmailStatusEnum),
    (0, entity_1.MultiORMColumn)({
        type: 'simple-enum',
        nullable: true,
        enum: index_2.EmailStatusEnum,
        default: null
    }),
    __metadata("design:type", String)
], EmailHistory.prototype, "status", void 0);
exports.EmailHistory = EmailHistory = __decorate([
    (0, entity_1.MultiORMEntity)('email_sent', { mikroOrmRepository: () => mikro_orm_email_history_repository_1.MikroOrmEmailHistoryRepository })
], EmailHistory);
//# sourceMappingURL=email-history.entity.js.map