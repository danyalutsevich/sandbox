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
exports.FeatureToggleUpdateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const feature_organization_service_1 = require("feature/feature-organization.service");
const feature_toggle_update_command_1 = require("../feature-toggle.update.command");
let FeatureToggleUpdateHandler = exports.FeatureToggleUpdateHandler = class FeatureToggleUpdateHandler {
    _featureOrganizationService;
    constructor(_featureOrganizationService) {
        this._featureOrganizationService = _featureOrganizationService;
    }
    async execute(command) {
        const { input } = command;
        return await this._featureOrganizationService.updateFeatureOrganization(input);
    }
};
exports.FeatureToggleUpdateHandler = FeatureToggleUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(feature_toggle_update_command_1.FeatureToggleUpdateCommand),
    __metadata("design:paramtypes", [typeof (_a = typeof feature_organization_service_1.FeatureOrganizationService !== "undefined" && feature_organization_service_1.FeatureOrganizationService) === "function" ? _a : Object])
], FeatureToggleUpdateHandler);
//# sourceMappingURL=feature-toggle.update.handler.js.map