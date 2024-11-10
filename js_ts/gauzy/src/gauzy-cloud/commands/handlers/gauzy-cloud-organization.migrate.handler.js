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
exports.GauzyCloudOrganizationMigrateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const gauzy_cloud_service_1 = require("../../gauzy-cloud.service");
const gauzy_cloud_organization_migrate_command_1 = require("./../gauzy-cloud-organization.migrate.command");
let GauzyCloudOrganizationMigrateHandler = exports.GauzyCloudOrganizationMigrateHandler = class GauzyCloudOrganizationMigrateHandler {
    gauzyCloudService;
    constructor(gauzyCloudService) {
        this.gauzyCloudService = gauzyCloudService;
    }
    async execute(command) {
        const { input, token } = command;
        return this.gauzyCloudService.migrateOrganization(input, token);
    }
};
exports.GauzyCloudOrganizationMigrateHandler = GauzyCloudOrganizationMigrateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(gauzy_cloud_organization_migrate_command_1.GauzyCloudOrganizationMigrateCommand),
    __metadata("design:paramtypes", [gauzy_cloud_service_1.GauzyCloudService])
], GauzyCloudOrganizationMigrateHandler);
//# sourceMappingURL=gauzy-cloud-organization.migrate.handler.js.map