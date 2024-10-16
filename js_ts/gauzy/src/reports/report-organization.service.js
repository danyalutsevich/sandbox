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
exports.ReportOrganizationService = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("../core/crud");
const context_1 = require("../core/context");
const report_organization_entity_1 = require("./report-organization.entity");
const type_orm_report_repository_1 = require("./repository/type-orm-report.repository");
const type_orm_report_organization_repository_1 = require("./repository/type-orm-report-organization.repository");
const mikro_orm_report_organization_repository_1 = require("./repository/mikro-orm-report-organization.repository");
let ReportOrganizationService = exports.ReportOrganizationService = class ReportOrganizationService extends crud_1.TenantAwareCrudService {
    typeOrmReportRepository;
    typeOrmReportOrganizationRepository;
    mikroOrmReportOrganizationRepository;
    constructor(typeOrmReportRepository, typeOrmReportOrganizationRepository, mikroOrmReportOrganizationRepository) {
        super(typeOrmReportOrganizationRepository, mikroOrmReportOrganizationRepository);
        this.typeOrmReportRepository = typeOrmReportRepository;
        this.typeOrmReportOrganizationRepository = typeOrmReportOrganizationRepository;
        this.mikroOrmReportOrganizationRepository = mikroOrmReportOrganizationRepository;
    }
    /**
     * Updates an existing report menu entry if it exists, otherwise creates a new one.
     * @param input The input containing data for updating or creating the report menu entry.
     * @returns The updated or newly created report menu entry.
     */
    async updateReportMenu(input) {
        try {
            const { reportId, organizationId } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            let reportOrganization = await this.findOneByWhereOptions({
                reportId,
                organizationId,
                tenantId
            });
            // If the report organization exists, update it with the input data
            reportOrganization = new report_organization_entity_1.ReportOrganization(Object.assign(reportOrganization, input));
            return await super.save(reportOrganization);
        }
        catch (error) {
            // If the report organization doesn't exist, create a new one with the input data
            return await super.create(new report_organization_entity_1.ReportOrganization(input));
        }
    }
    /**
     * Bulk create organization default reports menu.
     *
     * @param input - The organization input data.
     * @returns A promise that resolves to an array of created ReportOrganization instances.
     */
    async bulkCreateOrganizationReport(input) {
        try {
            const { id: organizationId, tenantId } = input;
            // Fetch reports from the database
            const reports = await this.typeOrmReportRepository.find();
            // Create ReportOrganization instances based on fetched reports
            const reportOrganizations = reports.map((report) => new report_organization_entity_1.ReportOrganization({
                report: { id: report.id },
                isEnabled: true,
                organizationId,
                tenantId
            }));
            // Save the created ReportOrganization instances to the database
            return await this.typeOrmReportOrganizationRepository.save(reportOrganizations);
        }
        catch (error) {
            console.log(`Error occurred while attempting bulk creation of organization reports: ${error?.message}`);
            // Throw InternalServerErrorException if an error occurs
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.ReportOrganizationService = ReportOrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_report_repository_1.TypeOrmReportRepository,
        type_orm_report_organization_repository_1.TypeOrmReportOrganizationRepository,
        mikro_orm_report_organization_repository_1.MikroOrmReportOrganizationRepository])
], ReportOrganizationService);
//# sourceMappingURL=report-organization.service.js.map