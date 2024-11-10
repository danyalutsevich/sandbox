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
exports.ReportOrganizationCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const report_organization_create_command_1 = require("../report-organization-create.command");
const report_organization_service_1 = require("../../report-organization.service");
let ReportOrganizationCreateHandler = exports.ReportOrganizationCreateHandler = class ReportOrganizationCreateHandler {
    _reportOrganizationService;
    constructor(_reportOrganizationService) {
        this._reportOrganizationService = _reportOrganizationService;
    }
    /**
     * Executes the creation of multiple report organization entries.
     *
     * @param event The event containing input data for creating report organization entries.
     * @returns A promise that resolves to the result of bulk creation of report organization entries.
     */
    async execute(event) {
        try {
            const { input } = event;
            return await this._reportOrganizationService.bulkCreateOrganizationReport(input);
        }
        catch (error) {
            console.error(`Error occurred while executing bulk creation of report organization entries: ${error.message}`);
        }
    }
};
exports.ReportOrganizationCreateHandler = ReportOrganizationCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(report_organization_create_command_1.ReportOrganizationCreateCommand),
    __metadata("design:paramtypes", [report_organization_service_1.ReportOrganizationService])
], ReportOrganizationCreateHandler);
//# sourceMappingURL=report-organization.create.handler.js.map