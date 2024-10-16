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
exports.CustomSmtpController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const custom_smtp_entity_1 = require("./custom-smtp.entity");
const custom_smtp_service_1 = require("./custom-smtp.service");
const commands_1 = require("./commands");
const crud_1 = require("./../core/crud");
const dto_1 = require("./dto");
let CustomSmtpController = exports.CustomSmtpController = class CustomSmtpController extends crud_1.CrudController {
    _customSmtpService;
    _commandBus;
    constructor(_customSmtpService, _commandBus) {
        super(_customSmtpService);
        this._customSmtpService = _customSmtpService;
        this._commandBus = _commandBus;
    }
    /**
     * GET smtp setting for tenant
     *
     * @param query
     * @returns
     */
    async getSmtpSetting(query) {
        return await this._customSmtpService.getSmtpSetting(query);
    }
    /**
     * CREATE verify smtp transporter
     *
     * @param entity
     * @returns
     */
    async validateSmtpSetting(entity) {
        return await this._customSmtpService.verifyTransporter(entity);
    }
    /**
     * CREATE custom smtp for tenant/organization
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this._commandBus.execute(new commands_1.CustomSmtpCreateCommand(entity));
    }
    /**
     * UPDATE smtp by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this._commandBus.execute(new commands_1.CustomSmtpUpdateCommand(id, entity));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find smtp setting for tenant.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found tenant setting',
        type: custom_smtp_entity_1.CustomSmtp
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('setting'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CustomSmtpQueryDTO]),
    __metadata("design:returntype", Promise)
], CustomSmtpController.prototype, "getSmtpSetting", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Validate new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('validate'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ValidateCustomSmtpDTO]),
    __metadata("design:returntype", Promise)
], CustomSmtpController.prototype, "validateSmtpSetting", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateCustomSmtpDTO]),
    __metadata("design:returntype", Promise)
], CustomSmtpController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update record' }),
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
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateCustomSmtpDTO]),
    __metadata("design:returntype", Promise)
], CustomSmtpController.prototype, "update", null);
exports.CustomSmtpController = CustomSmtpController = __decorate([
    (0, swagger_1.ApiTags)('CustomSmtp'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.CUSTOM_SMTP_VIEW),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [custom_smtp_service_1.CustomSmtpService, cqrs_1.CommandBus])
], CustomSmtpController);
//# sourceMappingURL=custom-smtp.controller.js.map