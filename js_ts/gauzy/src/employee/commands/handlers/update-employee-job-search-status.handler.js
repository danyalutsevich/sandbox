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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeJobSearchStatusHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/plugins/integration-ai/dist/index");
const context_1 = require("./../../../core/context");
const employee_service_1 = require("../../employee.service");
const update_employee_job_search_status_command_1 = require("../update-employee-job-search-status.command");
let UpdateEmployeeJobSearchStatusHandler = exports.UpdateEmployeeJobSearchStatusHandler = class UpdateEmployeeJobSearchStatusHandler {
    employeeService;
    gauzyAIService;
    constructor(employeeService, gauzyAIService) {
        this.employeeService = employeeService;
        this.gauzyAIService = gauzyAIService;
    }
    async execute(command) {
        const { employeeId, input } = command;
        const { isJobSearchActive, organizationId } = input;
        const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
        const employee = await this.employeeService.findOneByIdString(employeeId, {
            where: {
                organizationId,
                tenantId
            },
            relations: {
                user: true,
                organization: true
            }
        });
        try {
            // Attempt to sync the employee with Gauzy AI
            const syncResult = await this.gauzyAIService.syncEmployees([employee]);
            try {
                if (syncResult) {
                    const { userId } = employee;
                    await this.gauzyAIService.updateEmployeeStatus({
                        employeeId,
                        userId,
                        tenantId,
                        organizationId,
                        isJobSearchActive
                    });
                    // Employee sync and status update were successful
                    console.log('Employee synced and job search status updated successfully.');
                }
                else {
                    // Sync was not successful
                    console.log('Employee sync with Gauzy AI failed.');
                }
            }
            catch (updateError) {
                // Handle errors during the status update operation
                console.error('Error while updating employee job search status with Gauzy AI:', updateError.message);
            }
        }
        catch (syncError) {
            // Handle errors during the sync operation
            console.error('Error while syncing employee with Gauzy AI:', syncError.message);
        }
        return await this.employeeService.update(employeeId, { isJobSearchActive });
    }
};
exports.UpdateEmployeeJobSearchStatusHandler = UpdateEmployeeJobSearchStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(update_employee_job_search_status_command_1.UpdateEmployeeJobSearchStatusCommand),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService, typeof (_a = typeof index_1.GauzyAIService !== "undefined" && index_1.GauzyAIService) === "function" ? _a : Object])
], UpdateEmployeeJobSearchStatusHandler);
//# sourceMappingURL=update-employee-job-search-status.handler.js.map