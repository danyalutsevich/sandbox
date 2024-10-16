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
exports.OrganizationDepartmentUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const organization_department_service_1 = require("../../organization-department.service");
const organization_department_update_command_1 = require("../organization-department.update.command");
let OrganizationDepartmentUpdateHandler = exports.OrganizationDepartmentUpdateHandler = class OrganizationDepartmentUpdateHandler {
    organizationDepartmentService;
    constructor(organizationDepartmentService) {
        this.organizationDepartmentService = organizationDepartmentService;
    }
    async execute(command) {
        const { id, input } = command;
        //This will call save() with the id so that members[] also get saved accordingly
        return this.organizationDepartmentService.create({
            id,
            ...input
        });
    }
};
exports.OrganizationDepartmentUpdateHandler = OrganizationDepartmentUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_department_update_command_1.OrganizationDepartmentUpdateCommand),
    __metadata("design:paramtypes", [organization_department_service_1.OrganizationDepartmentService])
], OrganizationDepartmentUpdateHandler);
//# sourceMappingURL=organization-department.update.handler.js.map