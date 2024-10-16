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
exports.ReportOrganization = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_report_organization_repository_1 = require("./repository/mikro-orm-report-organization.repository");
let ReportOrganization = exports.ReportOrganization = class ReportOrganization extends internal_1.TenantOrganizationBaseEntity {
    isEnabled;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    report;
    reportId;
};
__decorate([
    (0, entity_1.MultiORMColumn)({ default: true }),
    __metadata("design:type", Boolean)
], ReportOrganization.prototype, "isEnabled", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Report, (it) => it.reportOrganizations, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Object)
], ReportOrganization.prototype, "report", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.report),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], ReportOrganization.prototype, "reportId", void 0);
exports.ReportOrganization = ReportOrganization = __decorate([
    (0, entity_1.MultiORMEntity)('report_organization', { mikroOrmRepository: () => mikro_orm_report_organization_repository_1.MikroOrmReportOrganizationRepository })
], ReportOrganization);
//# sourceMappingURL=report-organization.entity.js.map