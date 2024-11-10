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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTaskSettingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const commands_1 = require("./commands");
const dto_1 = require("./dto");
const organization_task_setting_entity_1 = require("./organization-task-setting.entity");
const organization_task_setting_service_1 = require("./organization-task-setting.service");
const dto_2 = require("core/dto");
let OrganizationTaskSettingController = exports.OrganizationTaskSettingController = class OrganizationTaskSettingController {
    commandBus;
    organizationTaskSettingService;
    constructor(commandBus, organizationTaskSettingService) {
        this.commandBus = commandBus;
        this.organizationTaskSettingService = organizationTaskSettingService;
    }
    /**
     * GET organization Task Setting by organizationId
     *
     * @param organizationId
     * @returns
     */
    async findByOrganizationId(query) {
        try {
            // Validate the input data (You can use class-validator for validation)
            if (!query || !query.organizationId) {
                throw new common_1.HttpException('Invalid query parameter', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.organizationTaskSettingService.findByOrganization(query);
        }
        catch (error) {
            // Handle errors and return an appropriate error response
            throw new common_1.HttpException(`Error while retrieving organization task settings: ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * CREATE organization task setting
     *
     * @param body
     * @returns
     */
    async create(body) {
        return await this.commandBus.execute(new commands_1.OrganizationTaskSettingCreateCommand(body));
    }
    /**
     * Update an existing organization task setting record.
     *
     * @param id - The unique identifier of the organization task setting to be updated.
     * @param body - The data containing the updates for the organization task setting.
     * @returns A Promise resolving to the updated organization task setting.
     *
     * @throws Throws an HTTP status 404 error if the record is not found.
     * @throws Throws an HTTP status 400 error for invalid input. The response body may contain clues as to what went wrong.
     */
    async update(id, body) {
        return await this.commandBus.execute(new commands_1.OrganizationTaskSettingUpdateCommand(id, body));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find organization task setting by organizationId.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found Organization Task Setting',
        type: organization_task_setting_entity_1.OrganizationTaskSetting
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_VIEW, index_1.PermissionsEnum.ORG_TASK_SETTING),
    (0, common_1.Get)('organization'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof dto_2.TenantOrganizationBaseDTO !== "undefined" && dto_2.TenantOrganizationBaseDTO) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], OrganizationTaskSettingController.prototype, "findByOrganizationId", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Create new record'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TASK_SETTING),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateOrganizationTaskSettingDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTaskSettingController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ORG_TASK_SETTING),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateOrganizationTaskSettingDTO]),
    __metadata("design:returntype", Promise)
], OrganizationTaskSettingController.prototype, "update", null);
exports.OrganizationTaskSettingController = OrganizationTaskSettingController = __decorate([
    (0, swagger_1.ApiTags)('OrganizationTaskSetting'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        organization_task_setting_service_1.OrganizationTaskSettingService])
], OrganizationTaskSettingController);
//# sourceMappingURL=organization-task-setting.controller.js.map