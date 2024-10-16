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
exports.IntegrationTenantCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const integration_tenant_create_command_1 = require("../../commands/integration-tenant.create.command");
const integration_tenant_service_1 = require("../../integration-tenant.service");
let IntegrationTenantCreateHandler = exports.IntegrationTenantCreateHandler = class IntegrationTenantCreateHandler {
    _integrationTenantService;
    constructor(_integrationTenantService) {
        this._integrationTenantService = _integrationTenantService;
    }
    async execute(command) {
        try {
            const { input } = command;
            return await this._integrationTenantService.create(input);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            console.log(`Failed to create integration tenant: %s`, error.message);
            throw new common_1.HttpException(`Failed to create integration tenant: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.IntegrationTenantCreateHandler = IntegrationTenantCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(integration_tenant_create_command_1.IntegrationTenantCreateCommand),
    __metadata("design:paramtypes", [integration_tenant_service_1.IntegrationTenantService])
], IntegrationTenantCreateHandler);
//# sourceMappingURL=integration-tenant.create.handler.js.map