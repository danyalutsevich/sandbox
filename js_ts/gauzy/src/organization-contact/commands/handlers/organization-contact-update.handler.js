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
exports.OrganizationContactUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const organization_contact_update_command_1 = require("../organization-contact-update.command");
const organization_contact_service_1 = require("../../organization-contact.service");
const contact_service_1 = require("../../../contact/contact.service");
let OrganizationContactUpdateHandler = exports.OrganizationContactUpdateHandler = class OrganizationContactUpdateHandler {
    _organizationContactService;
    _contactService;
    constructor(_organizationContactService, _contactService) {
        this._organizationContactService = _organizationContactService;
        this._contactService = _contactService;
    }
    /**
     * Updates an organization contact based on a given command and retrieves the updated contact.
     *
     * @param command Contains the ID and new data for updating the organization contact.
     * @returns A Promise resolving to the updated organization contact.
     * @throws BadRequestException for any errors during the update process.
     */
    async execute(command) {
        try {
            const { id, input } = command;
            // Destructure organizationId from the input, and get tenantId either from the current RequestContext or from the input.
            let { organizationId } = input;
            // Create/Update contact details of created organization
            try {
                input.contact = await this._contactService.create({
                    ...input.contact,
                    organization: { id: organizationId }
                });
            }
            catch (error) {
                console.log('Error occurred during creation of contact details or creating the organization contact:', error);
            }
            // Update the organization contact using the provided ID and input data.
            await this._organizationContactService.create({
                ...input,
                id
            });
            // Retrieve and return the updated organization contact.
            return this._organizationContactService.findOneByIdString(id);
        }
        catch (error) {
            // Re-throw the error as a BadRequestException.
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.OrganizationContactUpdateHandler = OrganizationContactUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_contact_update_command_1.OrganizationContactUpdateCommand),
    __metadata("design:paramtypes", [organization_contact_service_1.OrganizationContactService,
        contact_service_1.ContactService])
], OrganizationContactUpdateHandler);
//# sourceMappingURL=organization-contact-update.handler.js.map