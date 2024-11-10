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
exports.EmailVerificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/common/dist/index");
const index_2 = require("../../plugins/contracts/dist/index");
const email_confirmation_service_1 = require("./email-confirmation.service");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("../shared/pipes");
const dto_1 = require("./dto");
let EmailVerificationController = exports.EmailVerificationController = class EmailVerificationController {
    emailConfirmationService;
    constructor(emailConfirmationService) {
        this.emailConfirmationService = emailConfirmationService;
    }
    /**
     * Email verification by token
     *
     * @param body
     * @returns
     */
    async confirmEmail(body) {
        const user = await this.emailConfirmationService.decodeConfirmationToken(body.token);
        if (!!user) {
            return await this.emailConfirmationService.confirmEmail(user);
        }
    }
    /**
     * Email verification by token
     *
     * @param body
     * @returns
     */
    async confirmEmailByCode(body) {
        const user = await this.emailConfirmationService.confirmationByCode(body);
        if (!!user) {
            return await this.emailConfirmationService.confirmEmail(user);
        }
    }
    /**
     * Resend email verification link
     *
     * @returns
     */
    async resendConfirmationLink(config) {
        return await this.emailConfirmationService.resendConfirmationLink(config);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Email verification by token' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, index_1.Public)(),
    (0, common_1.Post)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ConfirmEmailByTokenDTO]),
    __metadata("design:returntype", Promise)
], EmailVerificationController.prototype, "confirmEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Email verification by code' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, index_1.Public)(),
    (0, common_1.Post)('code'),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ConfirmEmailByCodeDTO]),
    __metadata("design:returntype", Promise)
], EmailVerificationController.prototype, "confirmEmailByCode", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Resend email verification link' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Post)('resend-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailVerificationController.prototype, "resendConfirmationLink", null);
exports.EmailVerificationController = EmailVerificationController = __decorate([
    (0, common_1.Controller)('email/verify'),
    (0, common_1.UseGuards)(guards_1.FeatureFlagGuard),
    (0, index_1.FeatureFlag)(index_2.FeatureEnum.FEATURE_EMAIL_VERIFICATION),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [email_confirmation_service_1.EmailConfirmationService])
], EmailVerificationController);
//# sourceMappingURL=email-verification.controller.js.map