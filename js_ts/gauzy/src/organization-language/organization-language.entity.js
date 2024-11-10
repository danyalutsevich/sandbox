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
exports.OrganizationLanguage = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_organization_language_repository_1 = require("./repository/mikro-orm-organization-language.repository");
let OrganizationLanguage = exports.OrganizationLanguage = class OrganizationLanguage extends internal_1.TenantOrganizationBaseEntity {
    language;
    languageCode;
    name;
    level;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Language }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Language, {
        /** Database cascade action on delete. */
        onDelete: 'CASCADE',
        referenceColumnName: 'code',
        joinColumn: 'languageCode'
    }),
    (0, typeorm_1.JoinColumn)({ referencedColumnName: "code" }),
    __metadata("design:type", internal_1.Language)
], OrganizationLanguage.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.language),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], OrganizationLanguage.prototype, "languageCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationLanguage.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], OrganizationLanguage.prototype, "level", void 0);
exports.OrganizationLanguage = OrganizationLanguage = __decorate([
    (0, entity_1.MultiORMEntity)('organization_language', { mikroOrmRepository: () => mikro_orm_organization_language_repository_1.MikroOrmOrganizationLanguageRepository })
], OrganizationLanguage);
//# sourceMappingURL=organization-language.entity.js.map