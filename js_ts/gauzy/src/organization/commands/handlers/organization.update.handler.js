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
exports.OrganizationUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const context_1 = require("../../../core/context");
const organization_service_1 = require("../../organization.service");
const organization_update_command_1 = require("../organization.update.command");
let OrganizationUpdateHandler = exports.OrganizationUpdateHandler = class OrganizationUpdateHandler {
    organizationService;
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    /**
     *
     * Executes the organization update operation.
     *
     * @param command This includes the organization's ID and the new data to be updated.
     * @returns A promise that resolves to the updated instance of IOrganization.
     */
    async execute(command) {
        const { input, id } = command;
        return await this.update(id, input);
    }
    /**
     * Updates an organization with the provided input data.
     *
     * @param id The unique identifier of the organization to be updated.
     * @param input The data to update the organization with.
     * @returns The updated organization.
     */
    async update(id, input) {
        const organization = await this.organizationService.findOneByIdString(id);
        if (organization) {
            //
            const tenantId = context_1.RequestContext.currentTenantId();
            //if any organization set as default
            if (input.isDefault) {
                await this.organizationService.update({ tenantId }, { isDefault: false });
            }
            // Simplify boolean assignments
            const request = {
                ...input,
                show_profits: !!input.show_profits,
                show_bonuses_paid: !!input.show_bonuses_paid,
                show_income: !!input.show_income,
                show_total_hours: !!input.show_total_hours,
                show_projects_count: input.show_projects_count !== false,
                show_minimum_project_size: input.show_minimum_project_size !== false,
                show_clients_count: input.show_clients_count !== false,
                show_clients: input.show_clients !== false,
                show_employees_count: input.show_employees_count !== false
            };
            // Creates a new organization or updates an existing one based on the provided data.
            await this.organizationService.create({ ...request, id });
            // Retrieves an organization entity by its unique identifier.
            return await this.organizationService.findOneByIdString(id);
        }
    }
};
exports.OrganizationUpdateHandler = OrganizationUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_update_command_1.OrganizationUpdateCommand),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationUpdateHandler);
//# sourceMappingURL=organization.update.handler.js.map