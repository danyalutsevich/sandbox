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
exports.GauzyCloudController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const interceptors_1 = require("./../core/interceptors");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const commands_1 = require("./commands");
let GauzyCloudController = exports.GauzyCloudController = class GauzyCloudController {
    commandBus;
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async migrateUserToGauzyCloud(body) {
        return await this.commandBus.execute(new commands_1.GauzyCloudUserMigrateCommand(body));
    }
    async migrateTenantToGauzyCloud(body, token) {
        return await this.commandBus.execute(new commands_1.GauzyCloudTenantMigrateCommand(body, token));
    }
    async migrateOrganizationToGauzyCloud(body, token) {
        return await this.commandBus.execute(new commands_1.GauzyCloudOrganizationMigrateCommand(body, token));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Migrate self hosted to gauzy cloud hosted' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The user has been successfully created in the Gauzy cloud.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GauzyCloudController.prototype, "migrateUserToGauzyCloud", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Migrate self hosted tenant into the gauzy cloud tenant' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The tenant has been successfully created in the Gauzy cloud.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('tenant/:token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GauzyCloudController.prototype, "migrateTenantToGauzyCloud", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Migrate self hosted organization into the gauzy cloud organization' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The organization has been successfully created in the Gauzy cloud.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('organization/:token'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GauzyCloudController.prototype, "migrateOrganizationToGauzyCloud", null);
exports.GauzyCloudController = GauzyCloudController = __decorate([
    (0, common_1.UseInterceptors)(interceptors_1.CloudMigrateInterceptor),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.MIGRATE_GAUZY_CLOUD),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], GauzyCloudController);
//# sourceMappingURL=gauzy-cloud.controller.js.map