"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailConfirmationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const index_1 = require("../../plugins/config/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const index_3 = require("../../plugins/contracts/dist/index");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt = __importStar(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const constants_1 = require("./../constants");
const email_service_1 = require("./../email-send/email.service");
const user_service_1 = require("./../user/user.service");
const feature_service_1 = require("./../feature/feature.service");
const context_1 = require("./../core/context");
const utils_1 = require("./../core/utils");
let EmailConfirmationService = exports.EmailConfirmationService = class EmailConfirmationService {
    emailService;
    userService;
    featureFlagService;
    constructor(emailService, userService, featureFlagService) {
        this.emailService = emailService;
        this.userService = userService;
        this.featureFlagService = featureFlagService;
    }
    /**
     * Sends an email verification link and code to the user.
     *
     * @param user The user to send the verification email to.
     * @param integration Configuration for app integration.
     */
    async sendEmailVerification(user, integration) {
        if (!await this.featureFlagService.isFeatureEnabled(index_3.FeatureEnum.FEATURE_EMAIL_VERIFICATION)) {
            return;
        }
        try {
            const { id, email } = user;
            const payload = { id, email };
            // Generate a JWT token for email verification
            const token = (0, jsonwebtoken_1.sign)(payload, index_1.environment.JWT_VERIFICATION_TOKEN_SECRET, {
                expiresIn: `${index_1.environment.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME}s`
            });
            // Override the default config by merging in the provided values.
            const appIntegration = (0, index_2.deepMerge)(index_1.environment.appIntegrationConfig, integration);
            const verificationLink = `${appIntegration.appEmailConfirmationUrl}?email=${email}&token=${token}`;
            const verificationCode = (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH);
            // Update user's email token field and verification code
            await this.userService.update(id, {
                emailToken: await bcrypt.hash(token, 10),
                code: verificationCode,
                ...(index_1.environment.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME ? {
                    codeExpireAt: (0, moment_1.default)(new Date()).add(index_1.environment.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME, 'seconds').toDate()
                } : {}),
            });
            // Send email verification link
            return await this.emailService.emailVerification(user, verificationLink, verificationCode, appIntegration);
        }
        catch (error) {
            console.log(error, 'Error while sending verification email');
        }
    }
    /**
     * Resend confirmation email link
     *
     */
    async resendConfirmationLink(config) {
        if (!await this.featureFlagService.isFeatureEnabled(index_3.FeatureEnum.FEATURE_EMAIL_VERIFICATION)) {
            return;
        }
        try {
            const user = await this.userService.getIfExists(context_1.RequestContext.currentUserId());
            if (!!user.emailVerifiedAt) {
                throw new common_1.BadRequestException('Your email is already verified.');
            }
            await this.sendEmailVerification(user, config);
            return new Object({
                status: common_1.HttpStatus.OK,
                message: `OK`
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error?.message);
        }
    }
    /**
     * Decode email confirmation token
     *
     * @param token
     * @returns
     */
    async decodeConfirmationToken(token) {
        if (!await this.featureFlagService.isFeatureEnabled(index_3.FeatureEnum.FEATURE_EMAIL_VERIFICATION)) {
            return;
        }
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, index_1.environment.JWT_VERIFICATION_TOKEN_SECRET);
            if (typeof payload === 'object' && 'email' in payload && 'id' in payload) {
                const { id, email } = payload;
                const user = await this.userService.findOneByOptions({
                    where: {
                        id,
                        email
                    }
                });
                if (!!user.emailVerifiedAt) {
                    throw new common_1.BadRequestException('Your email is already verified.');
                }
                if (!!user.emailToken && !!(await bcrypt.compare(token, user.emailToken))) {
                    return user;
                }
            }
            throw new common_1.BadRequestException('Failed to verify email.');
        }
        catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new common_1.BadRequestException('JWT token has been expired.');
            }
            throw new common_1.BadRequestException(error?.message);
        }
    }
    /**
     * Email confirmation by code
     *
     * @param payload
     * @returns
     */
    async confirmationByCode(payload) {
        if (!await this.featureFlagService.isFeatureEnabled(index_3.FeatureEnum.FEATURE_EMAIL_VERIFICATION)) {
            return;
        }
        try {
            const { email, code, tenantId } = payload;
            if (email && code) {
                const user = await this.userService.findOneByOptions({
                    where: [
                        {
                            email,
                            code,
                            tenantId,
                            codeExpireAt: (0, typeorm_1.MoreThanOrEqual)(new Date())
                        },
                        {
                            email,
                            code,
                            tenantId,
                            codeExpireAt: (0, typeorm_1.IsNull)()
                        }
                    ]
                });
                if (!!user.emailVerifiedAt) {
                    throw new common_1.BadRequestException('Your email is already verified.');
                }
                return user;
            }
            throw new common_1.BadRequestException('Failed to verify email.');
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to verify email.');
        }
    }
    /**
     * Confirm user email
     *
     * @param user
     */
    async confirmEmail(user) {
        if (!await this.featureFlagService.isFeatureEnabled(index_3.FeatureEnum.FEATURE_EMAIL_VERIFICATION)) {
            return;
        }
        try {
            await this.userService.markEmailAsVerified(user['id']);
        }
        finally {
            return new Object({
                status: common_1.HttpStatus.OK,
                message: `OK`
            });
        }
    }
};
exports.EmailConfirmationService = EmailConfirmationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        user_service_1.UserService,
        feature_service_1.FeatureService])
], EmailConfirmationService);
//# sourceMappingURL=email-confirmation.service.js.map