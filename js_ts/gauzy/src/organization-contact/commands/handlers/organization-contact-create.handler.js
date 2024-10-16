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
exports.OrganizationContactCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../../../plugins/common/dist/index");
const typeorm_1 = require("typeorm");
const organization_contact_create_command_1 = require("../organization-contact-create.command");
const organization_contact_service_1 = require("../../organization-contact.service");
const organization_project_service_1 = require("./../../../organization-project/organization-project.service");
const context_1 = require("./../../../core/context");
const contact_service_1 = require("contact/contact.service");
let OrganizationContactCreateHandler = exports.OrganizationContactCreateHandler = class OrganizationContactCreateHandler {
    _organizationContactService;
    _organizationProjectService;
    _contactService;
    constructor(_organizationContactService, _organizationProjectService, _contactService) {
        this._organizationContactService = _organizationContactService;
        this._organizationProjectService = _organizationProjectService;
        this._contactService = _contactService;
    }
    /**
     * Executes the creation of an organization contact.
     *
     * @param command An instance of OrganizationContactCreateCommand containing the necessary input for creating a new organization contact.
     * @returns A promise that resolves to the newly created organization contact (IOrganizationContact).
     */
    async execute(command) {
        try {
            // Destructure the input from the command.
            const { input } = command;
            // Destructure organizationId from the input, and get tenantId either from the current RequestContext or from the input.
            let { organizationId } = input;
            const tenantId = context_1.RequestContext.currentTenantId() || input.tenantId;
            // Check if the input members are empty and projects are defined.
            if ((0, index_1.isEmpty)(input.members) && (0, index_1.isNotEmpty)(input.projects)) {
                // Map the projects to their IDs.
                const projectIds = input.projects.map((project) => project.id);
                // Retrieve projects with specified IDs, belonging to the given organization and tenant.
                const projects = await this._organizationProjectService.find({
                    where: {
                        id: (0, typeorm_1.In)(projectIds),
                        organization: { id: organizationId },
                        tenantId
                    },
                    relations: { members: true }
                });
                // Flatten the members from these projects and assign them to input.members.
                input.members = projects.flatMap((project) => project.members);
            }
            // Create contact details of organization
            try {
                input.contact = await this._contactService.create({
                    ...input.contact,
                    organization: { id: organizationId }
                });
            }
            catch (error) {
                console.log('Error occurred during creation of contact details or creating the organization contact:', error);
            }
            // Create a new organization contact with the modified input.
            return await this._organizationContactService.create({
                ...input,
                organization: { id: organizationId }
            });
        }
        catch (error) {
            console.error('Error while creating new organization contact', error);
        }
    }
};
exports.OrganizationContactCreateHandler = OrganizationContactCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_contact_create_command_1.OrganizationContactCreateCommand),
    __metadata("design:paramtypes", [organization_contact_service_1.OrganizationContactService,
        organization_project_service_1.OrganizationProjectService, typeof (_a = typeof contact_service_1.ContactService !== "undefined" && contact_service_1.ContactService) === "function" ? _a : Object])
], OrganizationContactCreateHandler);
//# sourceMappingURL=organization-contact-create.handler.js.map