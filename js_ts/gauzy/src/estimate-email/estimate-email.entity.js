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
exports.EstimateEmail = void 0;
const index_1 = require("../../plugins/config/dist/index");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_estimate_email_repository_1 = require("./repository/mikro-orm-estimate-email.repository");
let EstimateEmail = exports.EstimateEmail = class EstimateEmail extends internal_1.TenantOrganizationBaseEntity {
    token;
    email;
    expireDate;
    convertAcceptedEstimates;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({
        ...((0, index_1.isMySQL)() ? { type: 'text' } : {})
    }),
    __metadata("design:type", String)
], EstimateEmail.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], EstimateEmail.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], EstimateEmail.prototype, "expireDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => Boolean }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Boolean)
], EstimateEmail.prototype, "convertAcceptedEstimates", void 0);
exports.EstimateEmail = EstimateEmail = __decorate([
    (0, entity_1.MultiORMEntity)('estimate_email', { mikroOrmRepository: () => mikro_orm_estimate_email_repository_1.MikroOrmEstimateEmailRepository })
], EstimateEmail);
//# sourceMappingURL=estimate-email.entity.js.map