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
exports.Language = void 0;
const typeorm_1 = require("typeorm");
const core_1 = require("@mikro-orm/core");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const repository_1 = require("./repository");
let Language = exports.Language = class Language extends internal_1.BaseEntity {
    name;
    code;
    is_system;
    description;
    color;
    /*
    |--------------------------------------------------------------------------
    | @OneToMany
    |--------------------------------------------------------------------------
    */
    organizationLanguages;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Language.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Language.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Boolean, default: true }),
    (0, entity_1.MultiORMColumn)({ default: true, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], Language.prototype, "is_system", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], Language.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], Language.prototype, "color", void 0);
__decorate([
    (0, entity_1.MultiORMOneToMany)(() => internal_1.OrganizationLanguage, (it) => it.language, {
        cascade: true
    }),
    __metadata("design:type", Array)
], Language.prototype, "organizationLanguages", void 0);
exports.Language = Language = __decorate([
    (0, entity_1.MultiORMEntity)('language', { mikroOrmRepository: () => repository_1.MikroOrmLanguageRepository }),
    (0, typeorm_1.Unique)(['code']),
    (0, core_1.Unique)({ properties: ['code'] })
], Language);
//# sourceMappingURL=language.entity.js.map