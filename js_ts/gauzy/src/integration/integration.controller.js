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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const commands_1 = require("./commands");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("./../shared/pipes");
const integration_type_entity_1 = require("./integration-type.entity");
let IntegrationController = exports.IntegrationController = class IntegrationController {
    _commandBus;
    constructor(_commandBus) {
        this._commandBus = _commandBus;
    }
    /**
     * GET all integration types
     *
     * @returns
     */
    async getIntegrationTypes() {
        return await this._commandBus.execute(new commands_1.IntegrationTypeGetCommand());
    }
    /**
     * GET all system integrations
     *
     * @param filters
     * @returns
     */
    async getIntegrations(filters) {
        return await this._commandBus.execute(new commands_1.IntegrationGetCommand(filters));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all integration types.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found integration types',
        type: integration_type_entity_1.IntegrationType
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "getIntegrationTypes", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all integrations.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found integrations',
        type: integration_type_entity_1.IntegrationType
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('filters', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "getIntegrations", null);
exports.IntegrationController = IntegrationController = __decorate([
    (0, swagger_1.ApiTags)('Integrations'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INTEGRATION_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], IntegrationController);
//# sourceMappingURL=integration.controller.js.map