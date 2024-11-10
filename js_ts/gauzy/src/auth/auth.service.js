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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = require("jsonwebtoken");
const underscore_1 = require("underscore");
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/config/dist/index");
const index_3 = require("../../plugins/auth/dist/index");
const index_4 = require("../../plugins/common/dist/index");
const events_1 = require("../event-bus/events");
const event_bus_1 = require("../event-bus/event-bus");
const constants_1 = require("./../constants");
const email_service_1 = require("./../email-send/email.service");
const user_entity_1 = require("../user/user.entity");
const user_service_1 = require("../user/user.service");
const role_service_1 = require("./../role/role.service");
const user_organization_services_1 = require("../user-organization/user-organization.services");
const import_record_1 = require("./../export-import/import-record");
const commands_1 = require("./../password-reset/commands");
const context_1 = require("./../core/context");
const utils_1 = require("./../core/utils");
const internal_1 = require("./../core/entities/internal");
const email_confirmation_service_1 = require("./email-confirmation.service");
const database_helper_1 = require("./../database/database.helper");
const type_orm_user_repository_1 = require("./../user/repository/type-orm-user.repository");
const type_orm_organization_team_repository_1 = require("./../organization-team/repository/type-orm-organization-team.repository");
const employee_service_1 = require("../employee/employee.service");
const verify_oauth_tokens_1 = require("./social-account/token-verification/verify-oauth-tokens");
const social_account_service_1 = require("./social-account/social-account.service");
let AuthService = exports.AuthService = class AuthService extends index_3.SocialAuthService {
    typeOrmUserRepository;
    typeOrmOrganizationTeamRepository;
    emailConfirmationService;
    userService;
    employeeService;
    roleService;
    emailService;
    userOrganizationService;
    commandBus;
    httpService;
    socialAccountService;
    eventBus;
    constructor(typeOrmUserRepository, typeOrmOrganizationTeamRepository, emailConfirmationService, userService, employeeService, roleService, emailService, userOrganizationService, commandBus, httpService, socialAccountService, eventBus) {
        super();
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.typeOrmOrganizationTeamRepository = typeOrmOrganizationTeamRepository;
        this.emailConfirmationService = emailConfirmationService;
        this.userService = userService;
        this.employeeService = employeeService;
        this.roleService = roleService;
        this.emailService = emailService;
        this.userOrganizationService = userOrganizationService;
        this.commandBus = commandBus;
        this.httpService = httpService;
        this.socialAccountService = socialAccountService;
        this.eventBus = eventBus;
    }
    /**
     * User Login Request
     *
     * @param email The user's email address
     * @param password The user's password
     * @returns A Promise that resolves to the authentication response or null
     */
    async login({ email, password }) {
        try {
            // Find the user by email. Ensure the user is active, not archived, and has a hashed password.
            const user = await this.userService.findOneByOptions({
                where: { email, isActive: true, isArchived: false, hash: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
                relations: { role: true },
                order: { createdAt: 'DESC' } // Order by creation time, latest first
            });
            // Verify the provided password. If no user is found or the password does not match, throw an error.
            if (!user || !(await bcrypt.compare(password, user.hash))) {
                throw new common_1.UnauthorizedException(); // Generic error for security purposes
            }
            // Retrieve the employee details associated with the user.
            const employee = await this.employeeService.findOneByUserId(user.id);
            // Check if the employee is active and not archived. If not, throw an error.
            if (employee && (!employee.isActive || employee.isArchived)) {
                throw new common_1.UnauthorizedException();
            }
            // Generate both access and refresh tokens concurrently for efficiency.
            const [access_token, refresh_token] = await Promise.all([
                this.getJwtAccessToken(user),
                this.getJwtRefreshToken(user)
            ]);
            // Store the current refresh token with the user for later validation.
            await this.userService.setCurrentRefreshToken(refresh_token, user.id);
            // Return the user object with user details, tokens, and optionally employee info if it exists.
            return {
                user: {
                    ...user,
                    ...(employee && { employee })
                },
                token: access_token,
                refresh_token: refresh_token
            };
        }
        catch (error) {
            // Log the error with a timestamp and the error message for debugging.
            console.error(`Login failed at ${new Date().toISOString()}: ${error.message}.`);
            throw new common_1.UnauthorizedException(); // Throw a generic error to avoid exposing specific failure reasons.
        }
    }
    /**
     * Authenticate a user by email and password and return user workspaces.
     *
     * @param email - The user's email.
     * @param password - The user's password.
     * @returns A promise that resolves to a response with user workspaces.
     * @throws UnauthorizedException if authentication fails.
     */
    async signinWorkspacesByEmailPassword(input, includeTeams) {
        const { email, password } = input;
        /** Fetching users matching the query */
        let users = await this.userService.find({
            where: [
                {
                    email,
                    isActive: true,
                    isArchived: false,
                    hash: (0, typeorm_2.Not)((0, typeorm_2.IsNull)())
                }
            ],
            relations: { tenant: true },
            order: { createdAt: 'DESC' }
        });
        // Filter users based on password match
        users = users.filter((user) => bcrypt.compareSync(password, user.hash));
        if (users.length === 0) {
            throw new common_1.UnauthorizedException();
        }
        const code = (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH);
        const codeExpireAt = (0, moment_1.default)().add(index_2.environment.MAGIC_CODE_EXPIRATION_TIME, 'seconds').toDate();
        // Update all users with a single query
        const ids = users.map((user) => user.id);
        await this.typeOrmUserRepository.update({
            id: (0, typeorm_2.In)(ids),
            email,
            isActive: true,
            isArchived: false
        }, {
            code,
            codeExpireAt
        });
        // Determining the response based on the number of matching users
        const response = await this.createUserSigninWorkspaceResponse({
            users,
            code,
            email,
            includeTeams
        });
        if (response.total_workspaces > 0) {
            return response;
        }
        else {
            console.log('Error while signin workspace: %s');
            throw new common_1.UnauthorizedException();
        }
    }
    /**
     * Verify OAuth token when signin with social media from Ever Teams
     *
     * @param provider The provider used with user for signin
     * @param token The token generated by OAuth provider from Ever Teams frontent
     * @returns A promise resolved by the provider name and the account ID, both decode from the token
     * @throws A bad request if the provider used by user is not supported
     */
    async verifyOAuthToken(provider, token) {
        switch (provider) {
            case index_1.ProviderEnum.GOOGLE:
                return (0, verify_oauth_tokens_1.verifyGoogleToken)(this.httpService, token);
            case index_1.ProviderEnum.GITHUB:
                return (0, verify_oauth_tokens_1.verifyGithubToken)(this.httpService, token);
            case index_1.ProviderEnum.TWITTER:
                return (0, verify_oauth_tokens_1.verifyTwitterToken)(this.httpService, token);
            case index_1.ProviderEnum.FACEBOOK:
                return (0, verify_oauth_tokens_1.verifyFacebookToken)(this.httpService, token);
            default:
                throw new common_1.BadRequestException('Unsupported provider');
        }
    }
    /**
     * Check if any user with the given provider infos exists
     * This function is used to facilitate the GauzyAdapter in Ever Teams try to create new Users or only signin them

     * @param input An object that contains the provider name and the provider Account ID
     * @returns A promise that resolves to a boolean specifying if the user exists or not
     */
    async socialSignupCheckIfUserExistsBySocial(input) {
        const user = await this.socialAccountService.findUserBySocialId(input);
        if (!user)
            return { isUserExists: false };
        return { isUserExists: true };
    }
    /**
     * Authenticate a user by email from social media and return user workspaces.
     *
     * @param email - The user's email.
     * @param password - The user's password.
     * @returns A promise that resolves to a response with user workspaces.
     * @throws UnauthorizedException if authentication fails.
     */
    async signinWorkspacesByEmailSocial(input, includeTeams) {
        const { provider: inputProvider, token } = input;
        const providerData = await this.verifyOAuthToken(inputProvider, token);
        const { email, id: providerAccountId, provider } = providerData;
        const socialAccount = await this.socialAccountService.findAccountByProvider({ provider, providerAccountId });
        /** Fetching users matching the query */
        let users = await this.userService.find({
            where: [
                {
                    email,
                    isActive: true,
                    isArchived: false
                }
            ],
            relations: { tenant: true },
            order: { createdAt: 'DESC' }
        });
        if (users.length === 0) {
            throw new common_1.UnauthorizedException();
        }
        if (!socialAccount) {
            await Promise.all(users.map(async (user) => {
                return await this.socialAccountService.registerSocialAccount({
                    provider,
                    providerAccountId,
                    userId: user.id,
                    user,
                    tenantId: user.tenantId,
                    tenant: user.tenant
                });
            }));
        }
        const code = (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH);
        const codeExpireAt = (0, moment_1.default)().add(index_2.environment.MAGIC_CODE_EXPIRATION_TIME, 'seconds').toDate();
        // Update all users with a single query
        const ids = users.map((user) => user.id);
        await this.typeOrmUserRepository.update({
            id: (0, typeorm_2.In)(ids),
            email,
            isActive: true,
            isArchived: false
        }, {
            code,
            codeExpireAt
        });
        // Determining the response based on the number of matching users
        const response = await this.createUserSigninWorkspaceResponse({
            users,
            code,
            email,
            includeTeams
        });
        if (response.total_workspaces > 0) {
            return response;
        }
        else {
            console.log('Error while signin workspace: %s');
            throw new common_1.UnauthorizedException();
        }
    }
    /**
     * This method links a user to an oAuth account when signin/singup with a social media provider
     *
     * @param input The body request that contains the token to be verified and the provider name
     * @returns A promise that resolved with  an account creation
     */
    async linkUserToSocialAccount(input) {
        try {
            const { provider: inputProvider, token } = input;
            const providerData = await this.verifyOAuthToken(inputProvider, token);
            const { email, id, provider } = providerData;
            const user = await this.userService.getUserByEmail(email);
            if (!user) {
                throw new common_1.BadRequestException('User for these credentials could not be found');
            }
            return await this.socialAccountService.registerSocialAccount({
                provider,
                providerAccountId: id,
                userId: user.id,
                user,
                tenantId: user.tenantId,
                tenant: user.tenant
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('User for these credentials could not be found');
        }
    }
    /**
     * Generate a JWT token for the given user.
     *
     * @param user - The user object for which to generate the token.
     * @returns The JWT token as a string.
     */
    generateToken(user, code) {
        const payload = {
            userId: user.id,
            email: user.email,
            tenantId: user.tenant ? user.tenantId : null,
            code
        };
        return (0, jsonwebtoken_1.sign)(payload, index_2.environment.JWT_SECRET, {
            expiresIn: `${index_2.environment.JWT_TOKEN_EXPIRATION_TIME}s`
        });
    }
    /**
     * Initiates the process to request a password reset.
     *
     * @param request - The reset password request object containing the email address.
     * @param languageCode - The language code used for email communication.
     * @param originUrl - Optional parameter representing the origin URL of the request.
     * @returns A Promise that resolves to a boolean indicating the success of the password reset request
     *          or throws a BadRequestException in case of failure.
     */
    async requestResetPassword(request, languageCode, originUrl) {
        try {
            const { email } = request;
            // Fetch users with specific criteria
            const users = await this.fetchUsers(email);
            // Throw an exception if no matching users are found
            if (users.length === 0) {
                throw new common_1.BadRequestException('Forgot password request failed!');
            }
            // Initialize an array to store reset links along with tenant and user information
            const tenantUsersMap = [];
            // Iterate through users and generate reset links
            for await (const user of users) {
                const { email, tenantId } = user;
                const token = await this.getJwtAccessToken(user);
                // Proceed if a valid token and email are obtained
                if (!!token && !!email) {
                    try {
                        // Create a password reset request and generate a reset link
                        const request = await this.commandBus.execute(new commands_1.PasswordResetCreateCommand({
                            email,
                            tenantId,
                            token
                        }));
                        const resetLink = `${index_2.environment.clientBaseUrl}/#/auth/reset-password?token=${request.token}&tenantId=${tenantId}&email=${email}`;
                        tenantUsersMap.push({ resetLink, tenant: user.tenant, user });
                    }
                    catch (error) {
                        throw new common_1.BadRequestException('Forgot password request failed!');
                    }
                }
            }
            // If there is only one user, send a password reset email
            if (users.length === 1) {
                const [user] = users;
                const [tenantUserMap] = tenantUsersMap;
                if (tenantUserMap) {
                    const { resetLink } = tenantUserMap;
                    this.emailService.requestPassword(user, resetLink, languageCode, originUrl);
                }
            }
            else {
                // If multiple users are found, send a multi-tenant password reset email
                this.emailService.multiTenantResetPassword(email, tenantUsersMap, languageCode, originUrl);
            }
            // Return success status
            return true;
        }
        catch (error) {
            // Throw a BadRequestException in case of failure
            throw new common_1.BadRequestException('Forgot password request failed!');
        }
    }
    /**
     * Fetch users from the repository based on specific criteria.
     *
     * @param {string} email - The user's email address.
     * @returns {Promise<User[]>} A Promise that resolves to an array of User objects.
     */
    async fetchUsers(email) {
        return await this.typeOrmUserRepository.find({
            where: {
                email,
                isActive: true,
                isArchived: false
            },
            relations: {
                tenant: true,
                role: true
            }
        });
    }
    /**
     * Change password
     *
     * @param request
     */
    async resetPassword(request) {
        try {
            const { password, token } = request;
            const record = await this.commandBus.execute(new commands_1.PasswordResetGetCommand({
                token
            }));
            if (record.expired) {
                throw new common_1.BadRequestException('Password Reset Failed.');
            }
            const { id, tenantId } = (0, jsonwebtoken_1.verify)(token, index_2.environment.JWT_SECRET);
            try {
                const user = await this.userService.findOneByIdString(id, {
                    where: {
                        tenantId
                    },
                    relations: {
                        tenant: true
                    }
                });
                if (user) {
                    const hash = await this.getPasswordHash(password);
                    await this.userService.changePassword(user.id, hash);
                    return true;
                }
            }
            catch (error) {
                throw new common_1.BadRequestException('Password Reset Failed.');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Password Reset Failed.');
        }
    }
    /**
     * Shared method involved in
     * 1. Sign up
     * 2. Addition of new user to organization
     * 3. User invite accept scenario
     *
     * @param input
     * @param languageCode
     * @returns
     */
    async register(input, languageCode) {
        let tenant = input.user.tenant;
        // 1. If createdById is provided, get the creating user and use their tenant
        if (input.createdById) {
            const creatingUser = await this.userService.findOneByIdString(input.createdById, {
                relations: {
                    tenant: true
                }
            });
            tenant = creatingUser.tenant;
        }
        // 2. Register new user
        const userToCreate = this.typeOrmUserRepository.create({
            ...input.user,
            tenant,
            ...(input.password ? { hash: await this.getPasswordHash(input.password) } : {})
        });
        const createdUser = await this.typeOrmUserRepository.save(userToCreate);
        // 3. Email is automatically verified after accepting an invitation
        if (input.inviteId) {
            await this.typeOrmUserRepository.update(createdUser.id, {
                emailVerifiedAt: (0, utils_1.freshTimestamp)()
            });
        }
        // 4. Find the latest registered user with role
        const user = await this.typeOrmUserRepository.findOne({
            where: {
                id: createdUser.id
            },
            relations: {
                role: true
            }
        });
        // 5. If organizationId is provided, add the user to the organization
        if ((0, index_4.isNotEmpty)(input.organizationId)) {
            await this.userOrganizationService.addUserToOrganization(user, input.organizationId);
        }
        // 6. Create Import Records while migrating for a relative user
        const { isImporting = false, sourceId = null } = input;
        if (isImporting && sourceId) {
            const { sourceId } = input;
            this.commandBus.execute(new import_record_1.ImportRecordUpdateOrCreateCommand({
                entityType: this.typeOrmUserRepository.metadata.tableName,
                sourceId,
                destinationId: user.id
            }));
        }
        // Extract integration information
        let integration = (0, underscore_1.pick)(input, [
            'appName',
            'appLogo',
            'appSignature',
            'appLink',
            'appEmailConfirmationUrl',
            'companyLink',
            'companyName'
        ]);
        // 7. If the user's email is not verified, send an email verification
        if (!user.emailVerifiedAt) {
            this.emailConfirmationService.sendEmailVerification(user, integration);
        }
        // Publish the account registration event
        const ctx = context_1.RequestContext.currentRequestContext();
        const event = new events_1.AccountRegistrationEvent(ctx, user); // ToDo: Send a welcome email to user from events
        await this.eventBus.publish(event);
        // 8. Send a welcome email to the user
        this.emailService.welcomeUser(input.user, languageCode, input.organizationId, input.originalUrl, integration);
        return user;
    }
    /**
     *
     * @param id
     * @param thirdPartyId
     * @returns
     */
    async getAuthenticatedUser(id, thirdPartyId) {
        return thirdPartyId ? this.userService.getIfExistsThirdParty(thirdPartyId) : this.userService.getIfExists(id);
    }
    async isAuthenticated(token) {
        try {
            const { id, thirdPartyId } = (0, jsonwebtoken_1.verify)(token, index_2.environment.JWT_SECRET);
            let result;
            if (thirdPartyId) {
                result = this.userService.checkIfExistsThirdParty(thirdPartyId);
            }
            else {
                result = this.userService.checkIfExists(id);
            }
            return result;
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                return false;
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Check current user has role
     *
     * @param token
     * @param roles
     * @returns
     */
    async hasRole(roles = []) {
        console.log("test", context_1.RequestContext.currentUserId());
        try {
            const { role } = await this.userService.findOneByIdString(context_1.RequestContext.currentUserId(), {
                relations: {
                    role: true
                }
            });
            return role ? roles.includes(role.name) : false;
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
                return false;
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Check current user has permission
     *
     * @param token
     * @param roles
     * @returns
     */
    async hasPermissions(permissions = []) {
        try {
            const roleId = context_1.RequestContext.currentRoleId();
            return !!(await this.roleService.findOneByIdString(roleId, {
                where: {
                    rolePermissions: {
                        permission: (0, typeorm_2.In)(permissions),
                        enabled: true
                    }
                }
            }));
        }
        catch (error) {
            return false;
        }
    }
    /**
     *
     * @param emails
     * @returns
     */
    async validateOAuthLoginEmail(emails) {
        let response = {
            success: false,
            authData: { jwt: null, userId: null }
        };
        try {
            for (const { value } of emails) {
                const userExist = await this.userService.checkIfExistsEmail(value);
                if (userExist) {
                    const user = await this.userService.getOAuthLoginEmail(value);
                    const token = await this.getJwtAccessToken(user);
                    response = {
                        success: true,
                        authData: { jwt: token, userId: user.id }
                    };
                    // Break the loop and return the response
                    return response;
                }
            }
            return response;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException('validateOAuthLoginEmail', err.message);
        }
    }
    /**
     * Generates a JWT access token for a given user.
     *
     * This function takes a partial user object, primarily the user's ID,
     * and retrieves the user's details including their role and permissions.
     * It then constructs a JWT payload and generates a token.
     * If the user does not exist, an error is thrown.
     *
     * @param request A partial IUser object, mainly containing the user's ID.
     * @returns A Promise that resolves to a JWT access token string.
     * @throws Throws an UnauthorizedException if the user is not found or if there is an issue in token generation.
     */
    async getJwtAccessToken(request) {
        try {
            // Validate that the request contains a user ID
            if (!request.id) {
                throw new Error('User ID is missing in the request.');
            }
            console.log('Request getJwtAccessToken with Id: ', request.id);
            // Extract the user ID from the request
            const userId = request.id;
            // Retrieve the user's data, including role and permissions
            const user = await this.userService.findOneByIdString(userId, {
                relations: { role: { rolePermissions: true } },
                order: { createdAt: 'DESC' }
            });
            // Throw an error if the user is not found
            if (!user) {
                console.error(`User not found: ${request.id}`);
                throw new common_1.UnauthorizedException();
            }
            // Retrieve the employee details associated with the user.
            const employee = await this.employeeService.findOneByUserId(user.id);
            // Create a payload for the JWT token
            const payload = {
                id: user.id,
                tenantId: user.tenantId,
                employeeId: employee ? employee.id : null,
                role: user.role ? user.role.name : null,
                permissions: user.role?.rolePermissions?.filter((rp) => rp.enabled).map((rp) => rp.permission) ?? null
            };
            // Generate the JWT access token using the payload
            return (0, jsonwebtoken_1.sign)(payload, index_2.environment.JWT_SECRET, {});
        }
        catch (error) {
            // Log and rethrow any errors encountered during the process
            console.log('Error while generating JWT access token:', error);
            throw new common_1.UnauthorizedException();
        }
    }
    /**
     * Generates a JWT refresh token for a given user.
     *
     * This function takes a user object and constructs a JWT payload with the user's
     * ID, email, tenant ID, and role. It then generates a refresh token based on this payload.
     *
     * @param user A partial IUser object containing at least the user's ID, email, and role.
     * @returns A Promise that resolves to a JWT refresh token string.
     * @throws Logs an error and throws an exception if the token generation fails.
     */
    async getJwtRefreshToken(user) {
        try {
            // Ensure the user object contains the necessary information
            if (!user.id || !user.email) {
                throw new Error('User ID or email is missing.');
            }
            // Construct the JWT payload
            const payload = {
                id: user.id,
                email: user.email,
                tenantId: user.tenantId || null,
                role: user.role ? user.role.name : null
            };
            // Generate the JWT refresh token
            return (0, jsonwebtoken_1.sign)(payload, index_2.environment.JWT_REFRESH_TOKEN_SECRET, {
                expiresIn: `${index_2.environment.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`
            });
        }
        catch (error) {
            console.log('Error while generating JWT refresh token:', error);
        }
    }
    /**
     * Get JWT access token from JWT refresh token
     *
     * @returns
     */
    async getAccessTokenFromRefreshToken() {
        console.log('Get access token from refresh token');
        try {
            const user = context_1.RequestContext.currentUser();
            return { token: await this.getJwtAccessToken(user) };
        }
        catch (error) {
            console.log('Error while getting jwt access token from refresh token', error);
        }
    }
    /**
     * Sends a unique authentication code to the user's email for workspace sign-in.
     *
     * @param input - User email input along with partial app integration configuration.
     * @param locale - Language/locale for email content.
     * @returns {Promise<void>} - A promise indicating the completion of the operation.
     */
    async sendWorkspaceSigninCode(input, locale) {
        const { email } = input;
        // Check if the email is provided
        if (!email) {
            console.log('Error while sending workspace magic login code: Email is required');
            return;
        }
        console.log('Email: ', email);
        try {
            // Count the number of users with the given email
            const count = await this.typeOrmUserRepository.countBy({
                email
            });
            // If no user found with the email, return
            if (count === 0) {
                console.log(`Error while sending workspace magic login code: No user found with the email ${email}`);
                return;
            }
            // Generate a random alphanumeric code
            let magicCode;
            let isDemoCode = false;
            // Check if the environment variable 'DEMO' is set to 'true' and the Node.js environment is set to 'development'
            const IS_DEMO = process.env.DEMO === 'true' && process.env.NODE_ENV === 'development';
            console.log('Auth Is Demo: ', IS_DEMO);
            // If it's a demo environment, handle special cases
            if (IS_DEMO) {
                const demoEmployeeEmail = index_2.environment.demoCredentialConfig?.employeeEmail || 'employee@ever.co';
                const demoAdminEmail = index_2.environment.demoCredentialConfig?.adminEmail || 'local.admin@ever.co';
                console.log('Demo Employee Email: ', demoEmployeeEmail);
                console.log('Demo Admin Email: ', demoAdminEmail);
                // Check the value of the 'email' variable against certain demo email addresses
                if (email === demoEmployeeEmail || email === demoAdminEmail) {
                    magicCode = index_2.environment.demoCredentialConfig?.employeePassword || constants_1.DEMO_PASSWORD_LESS_MAGIC_CODE;
                    isDemoCode = true;
                }
            }
            if (!isDemoCode) {
                magicCode = (0, utils_1.generateRandomAlphaNumericCode)(constants_1.ALPHA_NUMERIC_CODE_LENGTH);
            }
            // Calculate the expiration time for the code
            const codeExpireAt = (0, moment_1.default)()
                .add(index_2.environment.MAGIC_CODE_EXPIRATION_TIME || 600, 'seconds')
                .toDate();
            // Update the user record with the generated code and expiration time
            await this.typeOrmUserRepository.update({ email }, { code: magicCode, codeExpireAt });
            console.log(`Email: '${email}' magic code: '${magicCode}' expires at: '${codeExpireAt}'`);
            // If it's not a demo code, send the magic code to the user's email
            if (!isDemoCode) {
                // Extract integration information
                let appIntegration = (0, underscore_1.pick)(input, [
                    'appName',
                    'appLogo',
                    'appSignature',
                    'appLink',
                    'companyLink',
                    'companyName',
                    'appMagicSignUrl'
                ]);
                // Override the default config by merging in the provided values.
                const integration = (0, index_4.deepMerge)(index_2.environment.appIntegrationConfig, appIntegration);
                let magicLink;
                if (integration.appMagicSignUrl) {
                    magicLink = `${integration.appMagicSignUrl}?email=${email}&code=${magicCode}`;
                }
                console.log('Magic Link: ', magicLink);
                // Send the magic code to the user's email
                this.emailService.sendMagicLoginCode({
                    email,
                    magicCode,
                    magicLink,
                    locale,
                    integration
                });
            }
        }
        catch (error) {
            console.log(`Error while sending workspace magic login code for email: ${email}`, error?.message);
        }
    }
    /**
     * Sign in and confirm by code for multi-tenant workspaces.
     * @param payload - The user invitation code confirmation input.
     * @returns The user sign-in workspace response.
     */
    async confirmWorkspaceSigninByCode(payload, includeTeams) {
        try {
            const { email, code } = payload;
            // Check for missing email or code
            if (!email || !code) {
                throw new common_1.UnauthorizedException();
            }
            // Find users matching the criteria
            let users = await this.typeOrmUserRepository.find({
                where: {
                    email,
                    code,
                    codeExpireAt: (0, typeorm_2.MoreThanOrEqual)(new Date()),
                    isActive: true,
                    isArchived: false
                },
                relations: {
                    tenant: true
                }
            });
            // Determining the response based on the number of matching users
            const response = await this.createUserSigninWorkspaceResponse({
                users,
                code,
                email,
                includeTeams
            });
            // Return the response if there are matching users
            if (response.total_workspaces > 0) {
                return response;
            }
            throw new common_1.UnauthorizedException();
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    /**
     * Verify workspace signin token
     *
     * @param input - The user email and token input.
     * @returns An object containing user information and tokens.
     */
    async workspaceSigninVerifyToken(input) {
        try {
            const { email, token } = input;
            // Check for missing email or token
            if (!email || !token) {
                throw new common_1.UnauthorizedException();
            }
            let payload = this.verifyToken(token);
            if (typeof payload === 'object') {
                const { userId, tenantId, code } = payload;
                const user = await this.typeOrmUserRepository.findOneOrFail({
                    where: {
                        id: userId,
                        email,
                        tenantId,
                        code,
                        codeExpireAt: (0, typeorm_2.MoreThanOrEqual)(new Date()),
                        isActive: true,
                        isArchived: false
                    },
                    relations: { role: true }
                });
                await this.typeOrmUserRepository.update({
                    email,
                    id: userId,
                    tenantId,
                    code,
                    isActive: true,
                    isArchived: false
                }, {
                    code: null,
                    codeExpireAt: null
                });
                // Retrieve the employee details associated with the user.
                const employee = await this.employeeService.findOneByUserId(user.id);
                // Check if the employee is active and not archived. If not, throw an error.
                if (employee && (!employee.isActive || employee.isArchived)) {
                    throw new common_1.UnauthorizedException();
                }
                // Generate both access and refresh tokens concurrently for efficiency.
                const [access_token, refresh_token] = await Promise.all([
                    this.getJwtAccessToken(user),
                    this.getJwtRefreshToken(user)
                ]);
                // Store the current refresh token with the user for later validation.
                await this.userService.setCurrentRefreshToken(refresh_token, user.id);
                // Return the user object with user details, tokens, and optionally employee info if it exists.
                return {
                    user: {
                        ...user,
                        ...(employee && { employee })
                    },
                    token: access_token,
                    refresh_token: refresh_token
                };
            }
            throw new common_1.UnauthorizedException();
        }
        catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new common_1.BadRequestException('JWT token has been expired.');
            }
            console.log('Error while signin workspace for specific tenant: %s', error?.message);
            throw new common_1.UnauthorizedException(error?.message);
        }
    }
    /**
     * Verify the JWT token and return the payload.
     * @param token - The JWT token to verify.
     * @returns The token payload or throws an error.
     */
    verifyToken(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, index_2.environment.JWT_SECRET);
        }
        catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new common_1.BadRequestException('JWT token has expired.');
            }
            console.log('Error while verifying JWT token: %s', error?.message);
            throw new common_1.UnauthorizedException(error?.message);
        }
    }
    /**
     * Get teams for a user within a specific tenant.
     *
     * @param tenantId The ID of the tenant.
     * @param userId The ID of the user.
     * @param employeeId The ID of the employee (optional).
     *
     * @returns A Promise that resolves to an array of IOrganizationTeam objects.
     */
    async getTeamsForUser(tenantId, userId, employeeId) {
        const query = this.typeOrmOrganizationTeamRepository.createQueryBuilder('organization_team');
        query.innerJoin(`organization_team_employee`, `team_member`, (0, database_helper_1.prepareSQLQuery)('"team_member"."organizationTeamId" = "organization_team"."id"'));
        query.select([
            (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."id" AS "team_id"`),
            (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."name" AS "team_name"`),
            (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."logo" AS "team_logo"`),
            (0, database_helper_1.prepareSQLQuery)(`COALESCE(COUNT("team_member"."id"), 0) AS "team_member_count"`),
            (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."profile_link" AS "profile_link"`),
            (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."prefix" AS "prefix"`)
        ]);
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."isActive" = :isActive`), { isActive: true });
        query.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."isArchived" = :isArchived`), { isArchived: false });
        // Sub Query to get only assigned teams for specific organizations
        const orgSubQuery = (cb) => {
            const subQuery = cb
                .subQuery()
                .select((0, database_helper_1.prepareSQLQuery)('"user_organization"."organizationId"'))
                .from('user_organization', 'user_organization');
            subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."isActive" = :isActive`), { isActive: true });
            subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."isArchived" = :isArchived`), { isArchived: false });
            subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."userId" = :userId`), { userId });
            subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."tenantId" = :tenantId`), { tenantId });
            return subQuery.distinct(true).getQuery();
        };
        // Sub Query to get only assigned teams for specific organizations
        query.andWhere((cb) => {
            return (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."organizationId" IN ` + orgSubQuery(cb));
        });
        // Sub Query to get only assigned teams for a specific employee for specific tenant
        query.andWhere((cb) => {
            const subQuery = cb
                .subQuery()
                .select((0, database_helper_1.prepareSQLQuery)('"organization_team_employee"."organizationTeamId"'))
                .from('organization_team_employee', 'organization_team_employee');
            subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."isActive" = :isActive`), { isActive: true });
            subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."isArchived" = :isArchived`), { isArchived: false });
            subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."tenantId" = :tenantId`), { tenantId });
            if ((0, index_4.isNotEmpty)(employeeId)) {
                subQuery.andWhere((0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."employeeId" = :employeeId`), { employeeId });
            }
            // Sub Query to get only assigned teams for specific organizations
            subQuery.andWhere((cb) => {
                return (0, database_helper_1.prepareSQLQuery)(`"${subQuery.alias}"."organizationId" IN ` + orgSubQuery(cb));
            });
            return (0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."id" IN ` + subQuery.distinct(true).getQuery());
        });
        query.addGroupBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."id"`));
        query.orderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."createdAt"`), 'DESC');
        return await query.getRawMany();
    }
    /**
     * Creates workspace response objects for a list of users.
     *
     * @param {Object} params - The parameters.
     * @param {IUser[]} params.users - The list of users.
     * @param {string} params.email - The email address.
     * @param {string} params.code - The code for workspace signin.
     * @param {boolean} params.includeTeams - Flag to include teams in the response.
     * @returns {Promise<IUserSigninWorkspaceResponse>} A promise that resolves to the workspace response.
     */
    async createUserSigninWorkspaceResponse({ users, email, code, includeTeams }) {
        const workspaces = [];
        for (const user of users) {
            const workspace = await this.createWorkspace(user, code, includeTeams);
            workspaces.push(workspace);
        }
        return {
            workspaces,
            confirmed_email: email,
            show_popup: workspaces.length > 1,
            total_workspaces: workspaces.length
        };
    }
    /**
     * Creates a workspace response object for a given user.
     *
     * @param user The user object of type IUser.
     * @param code The code used for generating the user token.
     * @param includeTeams Flag indicating whether to include team information in the response.
     * @returns A promise that resolves to the workspace response object of type IWorkspaceResponse.
     */
    async createWorkspace(user, code, includeTeams) {
        const tenantId = user.tenant ? user.tenantId : null;
        const employeeId = await this.employeeService.findEmployeeIdByUserId(user.id);
        const workspace = {
            user: this.createUserObject(user),
            token: this.generateToken(user, code)
        };
        if (includeTeams) {
            try {
                console.time('Get teams for a user within a specific tenant');
                const teams = await this.getTeamsForUser(tenantId, user.id, employeeId);
                workspace['current_teams'] = teams;
                console.timeEnd('Get teams for a user within a specific tenant');
            }
            catch (error) {
                console.error('Error while getting specific teams for specific tenant:', error?.message);
                // Optionally, you might want to handle the error more explicitly here.
            }
        }
        return workspace;
    }
    /**
     * Creates a new User object from a given IUser object.
     *
     * @param user The IUser object to be transformed.
     * @returns A new User object with properties mapped from the IUser object.
     */
    createUserObject(user) {
        return new user_entity_1.User({
            id: user.id,
            email: user.email || null,
            name: user.name || null,
            imageUrl: user.imageUrl || null,
            tenant: user.tenant
                ? new internal_1.Tenant({
                    id: user.tenant.id,
                    name: user.tenant.name || '',
                    logo: user.tenant.logo || '' // Defaulting to an empty string if logo is undefined
                })
                : null // Sets tenant to null if user.tenant is undefined
        });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeam)),
    __metadata("design:paramtypes", [type_orm_user_repository_1.TypeOrmUserRepository,
        type_orm_organization_team_repository_1.TypeOrmOrganizationTeamRepository,
        email_confirmation_service_1.EmailConfirmationService,
        user_service_1.UserService,
        employee_service_1.EmployeeService,
        role_service_1.RoleService,
        email_service_1.EmailService,
        user_organization_services_1.UserOrganizationService,
        cqrs_1.CommandBus,
        axios_1.HttpService,
        social_account_service_1.SocialAccountService,
        event_bus_1.EventBus])
], AuthService);
//# sourceMappingURL=auth.service.js.map