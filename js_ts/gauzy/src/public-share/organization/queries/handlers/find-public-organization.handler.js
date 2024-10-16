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
exports.FindPublicOrganizationHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
;
const find_public_organization_query_1 = require("./../find-public-organization.query");
const public_organization_service_1 = require("./../../public-organization.service");
let FindPublicOrganizationHandler = exports.FindPublicOrganizationHandler = class FindPublicOrganizationHandler {
    publicOrganizationService;
    constructor(publicOrganizationService) {
        this.publicOrganizationService = publicOrganizationService;
    }
    async execute(query) {
        const { params, relations = [] } = query;
        return await this.publicOrganizationService.findOneByProfileLink(params, relations);
    }
};
exports.FindPublicOrganizationHandler = FindPublicOrganizationHandler = __decorate([
    (0, cqrs_1.QueryHandler)(find_public_organization_query_1.FindPublicOrganizationQuery),
    __metadata("design:paramtypes", [public_organization_service_1.PublicOrganizationService])
], FindPublicOrganizationHandler);
//# sourceMappingURL=find-public-organization.handler.js.map