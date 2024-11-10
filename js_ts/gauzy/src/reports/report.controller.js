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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const report_service_1 = require("./report.service");
const report_organization_service_1 = require("./report-organization.service");
let ReportController = exports.ReportController = class ReportController {
    _reportService;
    _reportOrganizationService;
    constructor(_reportService, _reportOrganizationService) {
        this._reportService = _reportService;
        this._reportOrganizationService = _reportOrganizationService;
    }
    /**
     * Get all reports
     *
     * @param options
     * @returns
     */
    async findAllReports(options) {
        return await this._reportService.findAllReports(options);
    }
    /**
     *
     * @param filter
     * @returns
     */
    async getMenuItems(filter) {
        return await this._reportService.getMenuItems(filter);
    }
    /**
     *
     * @param input
     * @returns
     */
    async updateReportMenu(input) {
        return await this._reportOrganizationService.updateReportMenu(input);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found records',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "findAllReports", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found records',
    }),
    (0, common_1.Get)('menu-items'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getMenuItems", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found records',
    }),
    (0, common_1.Post)('menu-item'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "updateReportMenu", null);
exports.ReportController = ReportController = __decorate([
    (0, swagger_1.ApiTags)('Report'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [report_service_1.ReportService,
        report_organization_service_1.ReportOrganizationService])
], ReportController);
//# sourceMappingURL=report.controller.js.map