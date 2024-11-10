"use strict";
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const user_entity_1 = require("./user.entity");
const user_service_1 = require("./user.service");
const commands_1 = require("./commands");
const factory_reset_service_1 = require("./factory-reset/factory-reset.service");
const dto_1 = require("./dto");
let UserController = exports.UserController = class UserController extends crud_1.CrudController {
    _userService;
    _factoryResetService;
    _commandBus;
    constructor(_userService, _factoryResetService, _commandBus) {
        super(_userService);
        this._userService = _userService;
        this._factoryResetService = _factoryResetService;
        this._commandBus = _commandBus;
    }
    /**
     * GET endpoint to retrieve details of the currently logged-in user.
     *
     * @param options Query parameters specifying what additional relations to load for the user.
     * @returns A Promise that resolves to the IUser object.
     */
    async findMe(options) {
        return await this._userService.findMeUser(options);
    }
    /**
     * GET user by email
     *
     * @param email
     * @returns
     */
    async findByEmail(email) {
        return await this._userService.getUserByEmail(email);
    }
    /**
     * UPDATE user preferred language
     *
     * @param entity
     * @returns
     */
    async updatePreferredLanguage(entity) {
        return await this._userService.updatePreferredLanguage(entity.preferredLanguage);
    }
    /**
     * UPDATE user preferred component layout
     *
     * @param entity
     * @returns
     */
    async updatePreferredComponentLayout(entity) {
        return await this._userService.updatePreferredComponentLayout(entity.preferredComponentLayout);
    }
    /**
     * GET user count for specific tenant
     *
     * @returns
     */
    async getCount(options) {
        return await this._userService.countBy(options);
    }
    /**
     * GET users for specific tenant using pagination
     *
     * @param options
     * @returns
     */
    async pagination(options) {
        return await this._userService.paginate(options);
    }
    /**
     * GET users for specific tenant
     *
     * @param options
     * @returns
     */
    async findAll(options) {
        return await this._userService.findAll(options);
    }
    /**
     * GET user by id
     *
     * @param id
     * @param data
     * @returns
     */
    async findById(id, data) {
        const { relations } = data;
        return await this._userService.findOneByIdString(id, { relations });
    }
    /**
     * CREATE user for specific tenant
     *
     * @param entity
     * @returns
     */
    async create(entity) {
        return await this._commandBus.execute(new commands_1.UserCreateCommand(entity));
    }
    /**
     * UPDATE user by id
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this._userService.updateProfile(id, {
            id,
            ...entity
        });
    }
    /**
     * To permanently delete your account from your Gauzy app:
     *
     * @param id
     * @returns
     */
    async delete(id) {
        return await this._commandBus.execute(new commands_1.UserDeleteCommand(id));
    }
    /**
     * DELETE all user data from all tables
     *
     * @returns
     */
    async factoryReset() {
        return await this._factoryResetService.reset();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find current user.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Found current user', type: user_entity_1.User }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Record not found' }),
    (0, common_1.Get)('/me'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindMeQueryDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findMe", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find user by email address.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found user by email address',
        type: user_entity_1.User
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('/email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Put)('/preferred-language'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdatePreferredLanguageDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePreferredLanguage", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Put)('/preferred-layout'),
    (0, pipes_1.UseValidationPipe)({ transform: true, whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdatePreferredComponentLayoutDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePreferredComponentLayout", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_USERS_VIEW),
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getCount", null);
__decorate([
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_USERS_VIEW),
    (0, common_1.Get)('pagination'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all users.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found users',
        type: user_entity_1.User
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_USERS_VIEW),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find User by id.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found one record',
        type: user_entity_1.User
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.' /*, type: T*/
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_USERS_EDIT),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_USERS_EDIT, index_1.PermissionsEnum.PROFILE_EDIT),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Delete record'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'The record has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ALL_ORG_EDIT, index_1.PermissionsEnum.ACCESS_DELETE_ACCOUNT),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete all user data.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Deleted all user data.',
        type: user_entity_1.User
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ACCESS_DELETE_ALL_DATA),
    (0, common_1.Delete)('/reset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "factoryReset", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        factory_reset_service_1.FactoryResetService,
        cqrs_1.CommandBus])
], UserController);
//# sourceMappingURL=user.controller.js.map