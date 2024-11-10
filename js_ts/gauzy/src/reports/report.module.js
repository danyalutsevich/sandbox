"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ReportModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const report_category_entity_1 = require("./report-category.entity");
const report_entity_1 = require("./report.entity");
const report_controller_1 = require("./report.controller");
const report_service_1 = require("./report.service");
const report_category_controller_1 = require("./report-category.controller");
const report_category_service_1 = require("./report-category.service");
const report_organization_entity_1 = require("./report-organization.entity");
const handlers_1 = require("./commands/handlers");
const report_organization_service_1 = require("./report-organization.service");
const type_orm_report_organization_repository_1 = require("./repository/type-orm-report-organization.repository");
const type_orm_report_repository_1 = require("./repository/type-orm-report.repository");
let ReportModule = exports.ReportModule = ReportModule_1 = class ReportModule {
};
exports.ReportModule = ReportModule = ReportModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/report',
                    module: ReportModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([report_entity_1.Report, report_category_entity_1.ReportCategory, report_organization_entity_1.ReportOrganization]),
            nestjs_1.MikroOrmModule.forFeature([report_entity_1.Report, report_category_entity_1.ReportCategory, report_organization_entity_1.ReportOrganization])
        ],
        controllers: [report_category_controller_1.ReportCategoryController, report_controller_1.ReportController],
        providers: [
            report_service_1.ReportService,
            report_category_service_1.ReportCategoryService,
            report_organization_service_1.ReportOrganizationService,
            type_orm_report_repository_1.TypeOrmReportRepository,
            type_orm_report_organization_repository_1.TypeOrmReportOrganizationRepository,
            ...handlers_1.CommandHandlers
        ]
    })
], ReportModule);
//# sourceMappingURL=report.module.js.map