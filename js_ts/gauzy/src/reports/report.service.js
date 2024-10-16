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
var ReportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const crud_1 = require("../core/crud");
const context_1 = require("./../core/context");
const mikro_orm_report_repository_1 = require("./repository/mikro-orm-report.repository");
const type_orm_report_repository_1 = require("./repository/type-orm-report.repository");
let ReportService = exports.ReportService = ReportService_1 = class ReportService extends crud_1.CrudService {
    typeOrmReportRepository;
    mikroOrmReportRepository;
    logger = new common_1.Logger(ReportService_1.name);
    constructor(typeOrmReportRepository, mikroOrmReportRepository) {
        super(typeOrmReportRepository, mikroOrmReportRepository);
        this.typeOrmReportRepository = typeOrmReportRepository;
        this.mikroOrmReportRepository = mikroOrmReportRepository;
    }
    /**
     * Retrieves all reports for the specified organization and tenant, including whether they should be shown in the menu.
     *
     * @param filter The filter containing organization ID and tenant ID for retrieving reports.
     * @returns A promise that resolves to an object containing paginated report items and total count.
     */
    async findAllReports(filter) {
        console.time(`ReportService.findAll took seconds`);
        // Extract organizationId and tenantId from filter
        const { organizationId } = filter;
        const tenantId = context_1.RequestContext.currentTenantId() || filter.tenantId;
        // Fetch all reports and their associated organizations in a single query
        const qb = this.typeOrmRepository.createQueryBuilder('report');
        qb.setFindOptions({
            ...(filter.relations ? { relations: filter.relations } : {})
        });
        qb.leftJoinAndSelect('report.reportOrganizations', 'ro', 'ro.organizationId = :organizationId AND ro.tenantId = :tenantId AND ro.isEnabled = :isEnabled AND ro.isActive = :isActive AND ro.isArchived = :isArchived', {
            organizationId,
            tenantId,
            isEnabled: true,
            isActive: true,
            isArchived: false
        });
        // Execute the query
        const [items, total] = await qb.getManyAndCount();
        // Map over items and set 'showInMenu' property based on menu item existence
        const reports = items.map((item) => {
            item.showInMenu = !!item.reportOrganizations.length; // true if there are reportOrganizations, false otherwise
            delete item.reportOrganizations; // Remove reportOrganizations from the report object
            return item;
        });
        console.timeEnd(`ReportService.findAll took seconds`);
        return { items: reports, total: total };
    }
    /**
     * Retrieves report menu items based on the provided options.
     *
     * @param input The input containing the organization ID and tenant ID for filtering report menu items.
     * @returns A promise that resolves to an array of report menu items.
     */
    async getMenuItems(input) {
        const { organizationId } = input;
        const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
        const qb = this.typeOrmRepository.createQueryBuilder('report');
        qb.innerJoin('report.reportOrganizations', 'ro', 'ro.isEnabled = :isEnabled AND ro.isActive = :isActive AND ro.isArchived = :isArchived', {
            isEnabled: true,
            isActive: true,
            isArchived: false
        });
        qb.andWhere('ro.organizationId = :organizationId', { organizationId });
        qb.andWhere('ro.tenantId = :tenantId', { tenantId });
        return await qb.getMany();
    }
};
exports.ReportService = ReportService = ReportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_orm_report_repository_1.TypeOrmReportRepository,
        mikro_orm_report_repository_1.MikroOrmReportRepository])
], ReportService);
//# sourceMappingURL=report.service.js.map