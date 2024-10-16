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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationTenantController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("core/crud");
const dto_1 = require("core/dto");
const pipes_1 = require("./../shared/pipes");
const decorators_1 = require("./../shared/decorators");
const guards_1 = require("./../shared/guards");
const dto_2 = require("./../shared/dto");
const integration_tenant_service_1 = require("./integration-tenant.service");
const dto_3 = require("./dto");
const commands_1 = require("./commands");
let IntegrationTenantController = exports.IntegrationTenantController = class IntegrationTenantController extends crud_1.CrudController {
    _commandBus;
    _integrationTenantService;
    constructor(_commandBus, _integrationTenantService) {
        super(_integrationTenantService);
        this._commandBus = _commandBus;
        this._integrationTenantService = _integrationTenantService;
    }
    /**
     * Retrieve an integration tenant by specified options.
     *
     * @param options - The input options for finding the integration tenant.
     * @returns The integration tenant if found, or `false` if not found or an error occurs.
     */
    async getIntegrationByOptions(options) {
        return await this._integrationTenantService.getIntegrationByOptions(options);
    }
    /**
     * Fetch a paginated list of IntegrationTenant entities.
     * @param params - Query parameters for pagination and filtering.
     * @returns A paginated list of IntegrationTenant entities.
     */
    async findAll(params) {
        // Delegate the logic to your service
        return await this._integrationTenantService.findAll(params);
    }
    /**
     * Fetches an IntegrationTenant entity by ID from the database.
     *
     * @param integrationId - The ID of the IntegrationTenant entity (validated by UUIDValidationPipe).
     * @param query - Optional query parameters, such as relations.
     * @returns {Promise<IIntegrationTenant>} The fetched IntegrationTenant entity.
     * @throws {InternalServerErrorException} If an error occurs during the fetching process.
     */
    async findById(integrationId, query) {
        try {
            const { relations } = query;
            // Attempt to find the IntegrationTenant entity in the database
            return await this._integrationTenantService.findOneByIdString(integrationId, { relations });
        }
        catch (error) {
            // Handle and log any errors that occur
            console.error(`Error while finding IntegrationTenant: ${error.message}`);
            // Throw an InternalServerErrorException with a generic error message
            throw new common_1.InternalServerErrorException('An error occurred while fetching the IntegrationTenant entity');
        }
    }
    /**
     * Update an integration tenant with the provided data.
     *
     * @param id - The identifier of the integration tenant to update.
     * @param input - The data to update the integration tenant with.
     * @returns A response, typically the updated integration tenant or an error response.
     */
    async update(id, input) {
        try {
            // Update the corresponding integration tenant with the new input data
            return await this._commandBus.execute(new commands_1.IntegrationTenantUpdateCommand(id, input));
        }
        catch (error) {
            // Handle errors, e.g., return an error response.
            throw new Error('Failed to update integration fields');
        }
    }
    /**
     * Delete a resource identified by the provided 'id'.
     *
     * @param {string} id - The identifier of the resource to be deleted.
     * @returns {Promise<DeleteResult>} A Promise that resolves with the DeleteResult indicating the result of the deletion.
     */
    async delete(id, query) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!query || !query.organizationId) {
                throw new common_1.HttpException('Invalid query parameter', common_1.HttpStatus.BAD_REQUEST);
            }
            // Execute a command to delete the resource using a command bus
            return await this._commandBus.execute(new commands_1.IntegrationTenantDeleteCommand(id, query));
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            throw new common_1.HttpException(`Error while deleting integration: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, swagger_2.ApiOperation)({
        summary: 'Retrieve an integration tenant by specified options.'
    }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_2.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid request'
    }),
    (0, common_1.Get)('integration'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.IntegrationTenantQueryDTO]),
    __metadata("design:returntype", Promise)
], IntegrationTenantController.prototype, "getIntegrationByOptions", null);
__decorate([
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof crud_1.PaginationParams !== "undefined" && crud_1.PaginationParams) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], IntegrationTenantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_2.RelationsQueryDTO]),
    __metadata("design:returntype", Promise)
], IntegrationTenantController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_3.UpdateIntegrationTenantDTO]),
    __metadata("design:returntype", Promise)
], IntegrationTenantController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof dto_1.TenantOrganizationBaseDTO !== "undefined" && dto_1.TenantOrganizationBaseDTO) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], IntegrationTenantController.prototype, "delete", null);
exports.IntegrationTenantController = IntegrationTenantController = __decorate([
    (0, swagger_1.ApiTags)('IntegrationTenant'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.INTEGRATION_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        integration_tenant_service_1.IntegrationTenantService])
], IntegrationTenantController);
//# sourceMappingURL=integration-tenant.controller.js.map