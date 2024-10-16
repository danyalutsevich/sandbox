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
exports.FindPublicClientsByOrganizationHandler = void 0;
;
const cqrs_1 = require("@nestjs/cqrs");
const find_public_clients_by_organization_query_1 = require("./../find-public-clients-by-organization.query");
const public_organization_service_1 = require("./../../public-organization.service");
let FindPublicClientsByOrganizationHandler = exports.FindPublicClientsByOrganizationHandler = class FindPublicClientsByOrganizationHandler {
    publicOrganizationService;
    constructor(publicOrganizationService) {
        this.publicOrganizationService = publicOrganizationService;
    }
    async execute(query) {
        const { options } = query;
        return await this.publicOrganizationService.findPublicClientsByOrganization(options);
    }
};
exports.FindPublicClientsByOrganizationHandler = FindPublicClientsByOrganizationHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_public_clients_by_organization_query_1.FindPublicClientsByOrganizationQuery),
    __metadata("design:paramtypes", [public_organization_service_1.PublicOrganizationService])
], FindPublicClientsByOrganizationHandler);
//# sourceMappingURL=find-public-clients-by-organization.handler.js.map