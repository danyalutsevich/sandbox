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
exports.EmailHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const email_history_entity_1 = require("./email-history.entity");
const email_history_service_1 = require("./email-history.service");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const dto_1 = require("./dto");
const crud_1 = require("./../core/crud");
const resend_email_history_dto_1 = require("./dto/resend-email-history.dto");
const cqrs_1 = require("@nestjs/cqrs");
const commands_1 = require("./commands");
let EmailHistoryController = exports.EmailHistoryController = class EmailHistoryController {
    _emailHistoryService;
    commandBus;
    constructor(_emailHistoryService, commandBus) {
        this._emailHistoryService = _emailHistoryService;
        this.commandBus = commandBus;
    }
    async findAll(params) {
        try {
            return await this._emailHistoryService.findAll(params);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async update(id, entity) {
        try {
            return await this._emailHistoryService.update(id, entity);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async resendInvite(entity, languageCode) {
        return await this.commandBus.execute(new commands_1.EmailHistoryResendCommand(entity, languageCode));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find all sent emails under specific tenant.' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found emails',
        type: email_history_entity_1.EmailHistory
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'No records found'
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Get)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], EmailHistoryController.prototype, "findAll", null);
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
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.UpdateEmailHistoryDTO]),
    __metadata("design:returntype", Promise)
], EmailHistoryController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Resend Email.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully updated.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, common_1.Post)('resend'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resend_email_history_dto_1.ResendEmailHistoryDTO, String]),
    __metadata("design:returntype", Promise)
], EmailHistoryController.prototype, "resendInvite", null);
exports.EmailHistoryController = EmailHistoryController = __decorate([
    (0, swagger_1.ApiTags)('Email'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.VIEW_ALL_EMAILS),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [email_history_service_1.EmailHistoryService, cqrs_1.CommandBus])
], EmailHistoryController);
//# sourceMappingURL=email-history.controller.js.map