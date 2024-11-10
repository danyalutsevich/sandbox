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
exports.EventTypeCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const event_type_create_command_1 = require("../event-type.create.command");
const event_type_entity_1 = require("../../event-type.entity");
const event_type_service_1 = require("../../event-type.service");
const employee_service_1 = require("../../../employee/employee.service");
const organization_service_1 = require("../../../organization/organization.service");
const context_1 = require("../../../core/context");
let EventTypeCreateHandler = exports.EventTypeCreateHandler = class EventTypeCreateHandler {
    eventTypeService;
    employeeService;
    organizationService;
    constructor(eventTypeService, employeeService, organizationService) {
        this.eventTypeService = eventTypeService;
        this.employeeService = employeeService;
        this.organizationService = organizationService;
    }
    async execute(command) {
        const { input } = command;
        const eventType = new event_type_entity_1.EventType();
        const employee = input.employeeId
            ? await this.employeeService.findOneByIdString(input.employeeId)
            : null;
        const organization = await this.organizationService.findOneByIdString(input.organizationId);
        eventType.employee = employee;
        eventType.organization = organization;
        eventType.isActive = input.isActive || false;
        eventType.description = input.description;
        eventType.title = input.title;
        eventType.durationUnit = input.durationUnit;
        eventType.duration = input.duration;
        eventType.tags = input.tags;
        eventType.tenantId = context_1.RequestContext.currentTenantId();
        return await this.eventTypeService.create(eventType);
    }
};
exports.EventTypeCreateHandler = EventTypeCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(event_type_create_command_1.EventTypeCreateCommand),
    __metadata("design:paramtypes", [event_type_service_1.EventTypeService,
        employee_service_1.EmployeeService,
        organization_service_1.OrganizationService])
], EventTypeCreateHandler);
//# sourceMappingURL=event-type.create.handler.js.map