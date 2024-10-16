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
exports.OrganizationVendorFirstOrCreateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const context_1 = require("./../../../core/context");
const organization_vendor_first_or_create_command_1 = require("./../organization-vendor-first-or-create.command");
const organization_vendor_service_1 = require("./../../organization-vendor.service");
let OrganizationVendorFirstOrCreateHandler = exports.OrganizationVendorFirstOrCreateHandler = class OrganizationVendorFirstOrCreateHandler {
    _organizationVendorService;
    constructor(_organizationVendorService) {
        this._organizationVendorService = _organizationVendorService;
    }
    async execute(command) {
        const { input } = command;
        try {
            const { organizationId, name } = input;
            const tenantId = context_1.RequestContext.currentTenantId();
            return await this._organizationVendorService.findOneByWhereOptions({
                tenantId,
                organizationId,
                name
            });
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return await this._organizationVendorService.create(input);
            }
        }
    }
};
exports.OrganizationVendorFirstOrCreateHandler = OrganizationVendorFirstOrCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(organization_vendor_first_or_create_command_1.OrganizationVendorFirstOrCreateCommand),
    __metadata("design:paramtypes", [organization_vendor_service_1.OrganizationVendorService])
], OrganizationVendorFirstOrCreateHandler);
//# sourceMappingURL=organization-vendor-first-or-create.handler.js.map