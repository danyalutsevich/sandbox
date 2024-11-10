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
exports.AccountingTemplate = void 0;
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_accounting_template_repository_1 = require("./repository/mikro-orm-accounting-template.repository");
let AccountingTemplate = exports.AccountingTemplate = class AccountingTemplate extends internal_1.TenantOrganizationBaseEntity {
    name;
    languageCode;
    mjml;
    hbs;
    templateType;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], AccountingTemplate.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], AccountingTemplate.prototype, "languageCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AccountingTemplate.prototype, "mjml", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ ...((0, index_2.isMySQL)() ? { type: "longtext" } : {}) }),
    __metadata("design:type", String)
], AccountingTemplate.prototype, "hbs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.AccountingTemplateTypeEnum }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], AccountingTemplate.prototype, "templateType", void 0);
exports.AccountingTemplate = AccountingTemplate = __decorate([
    (0, entity_1.MultiORMEntity)('accounting_template', { mikroOrmRepository: () => mikro_orm_accounting_template_repository_1.MikroOrmAccountingTemplateRepository })
], AccountingTemplate);
//# sourceMappingURL=accounting-template.entity.js.map