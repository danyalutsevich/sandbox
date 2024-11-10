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
exports.OrganizationContactEditByEmployeeHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const handlers_1 = require("../../../shared/handlers");
const organization_contact_service_1 = require("../../organization-contact.service");
const organization_contact_edit_by_employee_command_1 = require("../organization-contact.edit-by-employee.command");
let OrganizationContactEditByEmployeeHandler = exports.OrganizationContactEditByEmployeeHandler = class OrganizationContactEditByEmployeeHandler extends handlers_1.UpdateEntityByMembersHandler {
    organizationContactService;
    constructor(organizationContactService) {
        super(organizationContactService);
        this.organizationContactService = organizationContactService;
    }
    async execute(command) {
        const { input } = command;
        return await this.executeCommand(input);
    }
};
exports.OrganizationContactEditByEmployeeHandler = OrganizationContactEditByEmployeeHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_contact_edit_by_employee_command_1.OrganizationContactEditByEmployeeCommand),
    __metadata("design:paramtypes", [organization_contact_service_1.OrganizationContactService])
], OrganizationContactEditByEmployeeHandler);
//# sourceMappingURL=organization-contact.edit-by-employee.handler.js.map