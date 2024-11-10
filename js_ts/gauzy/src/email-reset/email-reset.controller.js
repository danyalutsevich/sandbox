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
exports.EmailResetController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const guards_1 = require("./../shared/guards");
const decorators_1 = require("./../shared/decorators");
const pipes_1 = require("../shared/pipes");
const email_reset_service_1 = require("./email-reset.service");
const dto_1 = require("./dto");
let EmailResetController = exports.EmailResetController = class EmailResetController {
    emailResetService;
    constructor(emailResetService) {
        this.emailResetService = emailResetService;
    }
    /**
     * Create email reset request.
     *
     * @param entity
     * @param languageCode
     * @returns
     */
    async requestChangeEmail(entity, languageCode) {
        return await this.emailResetService.requestChangeEmail(entity, languageCode);
    }
    /**
     * Verify email reset request
     *
     * @param entity
     * @returns
     */
    async verifyChangeEmail(entity) {
        return await this.emailResetService.verifyCode(entity);
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/request-change-email'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.LanguageDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResetEmailRequestDTO, String]),
    __metadata("design:returntype", Promise)
], EmailResetController.prototype, "requestChangeEmail", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Post)('/verify-change-email'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.VerifyEmailResetRequestDTO]),
    __metadata("design:returntype", Promise)
], EmailResetController.prototype, "verifyChangeEmail", null);
exports.EmailResetController = EmailResetController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard, guards_1.PermissionGuard),
    (0, decorators_1.Permissions)(index_1.PermissionsEnum.ORG_USERS_EDIT, index_1.PermissionsEnum.PROFILE_EDIT),
    (0, common_1.Controller)('email-reset'),
    __metadata("design:paramtypes", [email_reset_service_1.EmailResetService])
], EmailResetController);
//# sourceMappingURL=email-reset.controller.js.map