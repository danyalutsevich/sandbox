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
exports.UserOrganizationController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const nestjs_i18n_1 = require("nestjs-i18n");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const user_organization_services_1 = require("./user-organization.services");
const user_organization_entity_1 = require("./user-organization.entity");
const commands_1 = require("./commands");
const find_me_user_organization_dto_1 = require("./dto/find-me-user-organization.dto");
let UserOrganizationController = exports.UserOrganizationController = class UserOrganizationController extends crud_1.CrudController {
    userOrganizationService;
    commandBus;
    constructor(userOrganizationService, commandBus) {
        super(userOrganizationService);
        this.userOrganizationService = userOrganizationService;
        this.commandBus = commandBus;
    }
    /**
     *
     * @param params
     * @returns
     */
    async findAll(params, query) {
        return await this.userOrganizationService.findAllUserOrganizations(params, query.includeEmployee);
    }
    async delete(id, user, language) {
        return this.commandBus.execute(new commands_1.UserOrganizationDeleteCommand({
            userOrganizationId: id,
            requestingUser: user,
            language
        }));
    }
    async findOrganizationCount(id) {
        const { userId } = await this.findById(id);
        const { total } = await this.userOrganizationService.findAll({
            where: {
                userId,
                isActive: true,
                user: {
                    role: { name: (0, typeorm_1.Not)(index_1.RolesEnum.EMPLOYEE) }
                }
            },
            relations: ['user', 'user.role']
        });
        return total;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all UserOrganizations.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found UserOrganizations',
        type: user_organization_entity_1.UserOrganization
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams,
        find_me_user_organization_dto_1.FindMeUserOrganizationDTO]),
    __metadata("design:returntype", Promise)
], UserOrganizationController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete user from organization' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NO_CONTENT,
        description: 'The user has been successfully deleted'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, decorators_1.UserDecorator)()),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], UserOrganizationController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find number of Organizations user belongs to' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Count of Organizations given user belongs to',
        type: Number
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserOrganizationController.prototype, "findOrganizationCount", null);
exports.UserOrganizationController = UserOrganizationController = __decorate([
    (0, swagger_1.ApiTags)('UserOrganization'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_organization_services_1.UserOrganizationService,
        cqrs_1.CommandBus])
], UserOrganizationController);
//# sourceMappingURL=user-organization.controller.js.map