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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_i18n_1 = require("nestjs-i18n");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const auth_service_1 = require("./auth.service");
const commands_1 = require("./commands");
const context_1 = require("../core/context");
const pagination_helper_1 = require("../core/crud/pagination.helper");
const guards_1 = require("./../shared/guards");
const pipes_1 = require("../shared/pipes");
const dto_1 = require("./../password-reset/dto");
const dto_2 = require("./../user/dto");
const user_service_1 = require("./../user/user.service");
const dto_3 = require("./dto");
const dto_4 = require("./social-account/dto");
let AuthController = exports.AuthController = class AuthController {
    authService;
    userService;
    commandBus;
    constructor(authService, userService, commandBus) {
        this.authService = authService;
        this.userService = userService;
        this.commandBus = commandBus;
    }
    /**
     * Check if the user is authenticated.
     *
     * @returns
     */
    async authenticated() {
        const token = context_1.RequestContext.currentToken();
        return await this.authService.isAuthenticated(token);
    }
    /**
     * Check if the user has a specific role.
     *
     * @param query - Query parameters containing roles.
     * @returns
     */
    async hasRole(query) {
        return await this.authService.hasRole(query.roles);
    }
    /**
     * Check if the user has specific permissions.
     *
     * @param query - Query parameters containing permissions.
     * @returns
     */
    async hasPermissions(query) {
        return await this.authService.hasPermissions(query.permissions);
    }
    /**
     * Register a new user.
     *
     * @param input - User registration data.
     * @param languageCode - Language code.
     * @param origin - Origin
     * @returns
     */
    async register(input, languageCode, origin) {
        return await this.commandBus.execute(new commands_1.AuthRegisterCommand({
            originalUrl: origin,
            ...input
        }, languageCode));
    }
    /**
     * User login.
     *
     * @param input - User login data.
     * @returns
     */
    async login(input) {
        console.log('Login test', input);
        return await this.commandBus.execute(new commands_1.AuthLoginCommand(input));
    }
    /**
     * Sign in workspaces by email and password.
     *
     * @param input - User sign-in data.
     * @returns
     */
    async signinWorkspacesByPassword(input) {
        return await this.authService.signinWorkspacesByEmailPassword(input, (0, pagination_helper_1.convertNativeParameters)(input.includeTeams));
    }
    /**
     * Check if any user with the given provider infos exists

     * @param input An object that contains the provider name and the provider Account ID
     * @returns A promise that resolves to a boolean specifying if the user exists or not
     */
    async socialSignupCheckIfUserExistsBySocial(input) {
        return await this.authService.socialSignupCheckIfUserExistsBySocial(input);
    }
    /**
     * Sign in workspaces by email social media.
     *
     * @param input - User sign-in data.
     * @returns
     */
    async signinWorkspacesBySocial(input) {
        return await this.authService.signinWorkspacesByEmailSocial(input, (0, pagination_helper_1.convertNativeParameters)(input.includeTeams));
    }
    async linkUserToSocialAccount(input) {
        return await this.authService.linkUserToSocialAccount(input);
    }
    /**
     * Send a workspace sign-in code by email.
     *
     * @param entity - User email data.
     * @param locale - Language code.
     * @returns
     */
    async sendWorkspaceSigninCode(entity, locale) {
        return await this.commandBus.execute(new commands_1.WorkspaceSigninSendCodeCommand(entity, locale));
    }
    /**
     * Confirm workspace sign-in by email code.
     *
     * @param input - Workspace sign-in email verification data.
     * @returns
     */
    async confirmWorkspaceSigninByCode(input) {
        return await this.authService.confirmWorkspaceSigninByCode(input, (0, pagination_helper_1.convertNativeParameters)(input.includeTeams));
    }
    /**
     * Sign in to a workspace by token.
     *
     * @param input - Workspace sign-in data.
     * @returns
     */
    async signinWorkspaceByToken(input) {
        return await this.commandBus.execute(new commands_1.WorkspaceSigninVerifyTokenCommand(input));
    }
    /**
     * Reset the user's password.
     *
     * @param request - Password change request data.
     * @returns
     */
    async resetPassword(request) {
        return await this.authService.resetPassword(request);
    }
    /**
     * Request a password reset.
     *
     * @param body - Password reset request data.
     * @param origin - Origin Request Header.
     * @param languageCode - Language code.
     * @returns
     */
    async requestPassword(body, origin, languageCode) {
        return await this.authService.requestResetPassword(body, languageCode, origin);
    }
    /**
     * Logout (Removed refresh token from database)
     *
     * @returns
     */
    async getLogOut() {
        return await this.userService.removeRefreshToken();
    }
    /**
     * Refresh the access token using a refresh token.
     *
     * @param input - Refresh token data.
     * @returns
     */
    async refreshToken(input) {
        return await this.authService.getAccessTokenFromRefreshToken();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check if user is authenticated' }),
    (0, swagger_1.ApiOkResponse)({ status: common_1.HttpStatus.OK, description: 'The success server response' }),
    (0, swagger_1.ApiBadRequestResponse)({ status: common_1.HttpStatus.BAD_REQUEST }),
    (0, common_1.Get)('/authenticated'),
    (0, index_2.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "authenticated", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check if the user has a specific role' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST }),
    (0, common_1.Get)('/role'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.HasRoleQueryDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "hasRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Check if the user has specific permissions' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST }),
    (0, common_1.Get)('/permissions'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.HasPermissionsQueryDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "hasPermissions", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, the response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)('/register'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, nestjs_i18n_1.I18nLang)()),
    __param(2, (0, common_1.Headers)('origin')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.RegisterUserDTO, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/login'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UserLoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/signin.email.password'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UserSigninWorkspaceDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinWorkspacesByPassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/signup.provider.social'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_4.FindUserBySocialLoginDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "socialSignupCheckIfUserExistsBySocial", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/signin.email.social'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_4.SocialLoginBodyRequestDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinWorkspacesBySocial", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/signup.link.account'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_4.SocialLoginBodyRequestDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "linkUserToSocialAccount", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)('/signin.email'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UserEmailDTO, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendWorkspaceSigninCode", null);
__decorate([
    (0, common_1.Post)('/signin.email/confirm'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.WorkspaceSigninEmailVerifyDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmWorkspaceSigninByCode", null);
__decorate([
    (0, common_1.Post)('/signin.workspace'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.WorkspaceSigninDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signinWorkspaceByToken", null);
__decorate([
    (0, common_1.Post)('/reset-password'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ChangePasswordRequestDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('/request-password'),
    (0, index_2.Public)(),
    (0, pipes_1.UseValidationPipe)({ whitelist: true }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('origin')),
    __param(2, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResetPasswordRequestDTO, String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Logout' }),
    (0, common_1.Get)('/logout'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getLogOut", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh token' }),
    (0, index_2.Public)(),
    (0, common_1.UseGuards)(guards_1.AuthRefreshGuard),
    (0, common_1.Post)('/refresh-token'),
    (0, pipes_1.UseValidationPipe)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        cqrs_1.CommandBus])
], AuthController);
//# sourceMappingURL=auth.controller.js.map