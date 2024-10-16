"use strict";
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const index_1 = require("../../plugins/contracts/dist/index");
const index_2 = require("../../plugins/common/dist/index");
const index_3 = require("../../plugins/config/dist/index");
const database_helper_1 = require("./../database/database.helper");
const crud_1 = require("./../core/crud");
const context_1 = require("./../core/context");
const utils_1 = require("./../core/utils");
const employee_service_1 = require("../employee/employee.service");
const task_service_1 = require("../tasks/task.service");
const repository_1 = require("./repository");
let UserService = exports.UserService = class UserService extends crud_1.TenantAwareCrudService {
    typeOrmUserRepository;
    mikroOrmUserRepository;
    _configService;
    _employeeService;
    _taskService;
    constructor(typeOrmUserRepository, mikroOrmUserRepository, _configService, _employeeService, _taskService) {
        super(typeOrmUserRepository, mikroOrmUserRepository);
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.mikroOrmUserRepository = mikroOrmUserRepository;
        this._configService = _configService;
        this._employeeService = _employeeService;
        this._taskService = _taskService;
    }
    /**
     * Fetches the logged-in user's details along with associated employee details if requested.
     *
     * @param options Options for the findMeUser method.
     * @returns A promise resolving to the user details.
     */
    async findMeUser(options) {
        let employee;
        // Check if there are relations to include and remove 'employee' from them if present.
        if (options.relations && options.relations.length > 0) {
            const index = options.relations.indexOf('employee');
            if (index > -1) {
                options.relations.splice(index, 1); // Removing 'employee' to handle it separately
            }
        }
        // Fetch the user along with requested relations (excluding employee).
        const user = await this.findMe(options.relations);
        console.log('findMe found User with Id:', user.id);
        // If 'includeEmployee' is set to true, fetch employee details associated with the user.
        if (options.includeEmployee) {
            const relations = {};
            // Include organization relation if 'includeOrganization' is true
            if (options.includeOrganization) {
                relations.organization = true;
            }
            employee = await this._employeeService.findOneByUserId(user.id, { relations });
        }
        // Return user data combined with employee data, if it exists.
        return {
            ...user,
            ...(employee && { employee }) // Conditionally add employee info to the response
        };
    }
    /**
     * Retrieves details of the currently logged-in user, including specified relations.
     *
     * @param relations An array of strings indicating which relations of the user to include.
     * @returns A Promise resolving to the IUser object with the desired relations.
     */
    async findMe(relations) {
        try {
            // Get the current user's ID from the RequestContext
            const userId = context_1.RequestContext.currentUserId();
            // Fetch and return the user's details based on the provided relations
            return await this.findOneByIdString(userId, { relations });
        }
        catch (error) {
            // Log the error for debugging purposes
            console.error('Error in findMe:', error);
        }
    }
    /**
     * Marked email as verified for user
     *
     * @param id
     * @returns
     */
    async markEmailAsVerified(id) {
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                return await this.mikroOrmRepository.nativeUpdate({ id }, {
                    emailVerifiedAt: (0, utils_1.freshTimestamp)(),
                    emailToken: null,
                    code: null,
                    codeExpireAt: null
                });
            case utils_1.MultiORMEnum.TypeORM:
                return await this.typeOrmRepository.update({ id }, {
                    emailVerifiedAt: (0, utils_1.freshTimestamp)(),
                    emailToken: null,
                    code: null,
                    codeExpireAt: null
                });
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
    }
    /**
     * GET user by email in the same tenant
     *
     * @param email
     * @returns
     */
    async getUserByEmail(email) {
        return await this.typeOrmRepository.findOneBy({ email });
    }
    /**
     * GET user by email using social logins
     *
     * @param email
     * @returns
     */
    async getOAuthLoginEmail(email) {
        try {
            return await this.typeOrmRepository.findOneByOrFail({ email });
        }
        catch (error) {
            throw new common_1.NotFoundException(`The requested record was not found`);
        }
    }
    /**
     * Checks if a user with the given email exists.
     * @param {string} email - The email of the user to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, otherwise false.
     */
    async checkIfExistsEmail(email) {
        return !!(await this.typeOrmRepository.findOneBy({ email }));
    }
    /**
     * Checks if a user with the given ID exists.
     * @param {string} id - The ID of the user to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, otherwise false.
     */
    async checkIfExists(id) {
        return !!(await this.typeOrmRepository.findOneBy({ id }));
    }
    /**
     * Checks if a user with the given third party ID exists.
     * @param {string} thirdPartyId - The third party ID of the user to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, otherwise false.
     */
    async checkIfExistsThirdParty(thirdPartyId) {
        return !!(await this.typeOrmRepository.findOneBy({ thirdPartyId }));
    }
    /**
     * Retrieves a user with the given ID if it exists.
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<User | undefined>} - A promise that resolves to the user if it exists, otherwise undefined.
     */
    async getIfExists(id) {
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                return await this.mikroOrmUserRepository.findOne({ id });
            case utils_1.MultiORMEnum.TypeORM:
                return await this.typeOrmRepository.findOneBy({ id });
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
    }
    /**
     * Retrieves a user with the given third party ID if it exists.
     * @param {string} thirdPartyId - The third party ID of the user to retrieve.
     * @returns {Promise<User | undefined>} - A promise that resolves to the user if it exists, otherwise undefined.
     */
    async getIfExistsThirdParty(thirdPartyId) {
        switch (this.ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                return await this.mikroOrmUserRepository.findOne({ thirdPartyId });
            case utils_1.MultiORMEnum.TypeORM:
                return await this.typeOrmRepository.findOneBy({ thirdPartyId });
            default:
                throw new Error(`Not implemented for ${this.ormType}`);
        }
    }
    /**
     * Creates a new user.
     * @param {User} user - The user object to create.
     * @returns {Promise<InsertResult>} - A promise that resolves to the insert result.
     */
    async createOne(user) {
        return await this.typeOrmRepository.insert(user);
    }
    async changePassword(id, hash) {
        try {
            const user = await this.findOneByIdString(id);
            user.hash = hash;
            return await this.typeOrmRepository.save(user);
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    /*
     * Update user profile
     */
    async updateProfile(id, entity) {
        /**
         * If user has only own profile edit permission
         */
        if (context_1.RequestContext.hasPermission(index_1.PermissionsEnum.PROFILE_EDIT) &&
            !context_1.RequestContext.hasPermission(index_1.PermissionsEnum.ORG_USERS_EDIT)) {
            if (context_1.RequestContext.currentUserId() !== id) {
                throw new common_1.ForbiddenException();
            }
        }
        let user;
        try {
            if (typeof id == 'string') {
                user = await this.findOneByIdString(id, {
                    relations: {
                        role: true
                    }
                });
            }
            /**
             * If user try to update Super Admin without permission
             */
            if (user.role.name === index_1.RolesEnum.SUPER_ADMIN) {
                if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.SUPER_ADMIN_EDIT)) {
                    throw new common_1.ForbiddenException();
                }
            }
            if (entity['hash']) {
                entity['hash'] = await this.getPasswordHash(entity['hash']);
            }
            await this.save(entity);
            try {
                return await this.findOneByWhereOptions({
                    id: id,
                    tenantId: context_1.RequestContext.currentTenantId()
                });
            }
            catch { }
        }
        catch (error) {
            throw new common_1.ForbiddenException();
        }
    }
    async getAdminUsers(tenantId) {
        return await this.typeOrmRepository.find({
            join: {
                alias: 'user',
                leftJoin: {
                    role: 'user.role'
                }
            },
            where: {
                tenantId,
                role: {
                    name: (0, typeorm_1.In)([index_1.RolesEnum.SUPER_ADMIN, index_1.RolesEnum.ADMIN])
                }
            }
        });
    }
    /**
     * Updates the preferred language of the current user.
     * @param {LanguagesEnum} preferredLanguage - The preferred language to update.
     * @returns {Promise<IUser | UpdateResult>} - A promise that resolves to the updated user or update result.
     */
    async updatePreferredLanguage(preferredLanguage) {
        try {
            const userId = context_1.RequestContext.currentUserId();
            return await this.update(userId, { preferredLanguage });
        }
        catch (err) {
            throw new common_1.NotFoundException(`The record was not found`, err);
        }
    }
    /**
     * Updates the preferred component layout of the current user.
     * @param {ComponentLayoutStyleEnum} preferredComponentLayout - The preferred component layout to update.
     * @returns {Promise<IUser | UpdateResult>} - A promise that resolves to the updated user or update result.
     */
    async updatePreferredComponentLayout(preferredComponentLayout) {
        try {
            const userId = context_1.RequestContext.currentUserId();
            return await this.update(userId, { preferredComponentLayout });
        }
        catch (err) {
            throw new common_1.NotFoundException(`The record was not found`, err);
        }
    }
    /**
     * Sets the current refresh token for the user.
     * @param {string} refreshToken - The refresh token to set.
     * @param {string} userId - The ID of the user for whom to set the refresh token.
     * @returns {Promise<void>} - A promise that resolves once the refresh token is set.
     */
    async setCurrentRefreshToken(refreshToken, userId) {
        try {
            // Hash the refresh token using bcrypt if refreshToken is provided
            if (refreshToken) {
                refreshToken = await bcrypt.hash(refreshToken, 10);
            }
            // Update the user's refresh token in the repository
            return await this.typeOrmRepository.update(userId, { refreshToken });
        }
        catch (error) {
            // Log error if any
            console.error('Error while setting current refresh token:', error);
        }
    }
    /**
     * Removes the refresh token from the database.
     * Logout Device
     *
     * @param userId
     * @returns
     */
    async removeRefreshToken() {
        try {
            const userId = context_1.RequestContext.currentUserId();
            const tenantId = context_1.RequestContext.currentTenantId();
            try {
                await this.typeOrmRepository.update({ id: userId, tenantId }, {
                    refreshToken: null
                });
            }
            catch (error) {
                console.log('Error while remove refresh token', error);
            }
        }
        catch (error) {
            console.log('Error while logout device', error);
        }
    }
    /**
     * Get user if refresh token matches
     *
     * @param refreshToken
     * @param payload
     * @returns
     */
    async getUserIfRefreshTokenMatches(refreshToken, payload) {
        try {
            const { id, email, tenantId, role } = payload;
            const query = this.typeOrmRepository.createQueryBuilder('user');
            query.setFindOptions({
                join: {
                    alias: 'user',
                    leftJoin: { role: 'user.role' }
                }
            });
            query.where((query) => {
                query.andWhere(new typeorm_1.Brackets((web) => {
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."id" = :id`), { id });
                    web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."email" = :email`), { email });
                }));
                query.andWhere(new typeorm_1.Brackets((web) => {
                    if ((0, index_2.isNotEmpty)(tenantId)) {
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."tenantId" = :tenantId`), { tenantId });
                    }
                    if ((0, index_2.isNotEmpty)(role)) {
                        web.andWhere((0, database_helper_1.prepareSQLQuery)(`"role"."name" = :role`), { role });
                    }
                }));
                query.orderBy((0, database_helper_1.prepareSQLQuery)(`"${query.alias}"."createdAt"`), 'DESC');
            });
            const user = await query.getOneOrFail();
            const isRefreshTokenMatching = await bcrypt.compare(refreshToken, user.refreshToken);
            if (isRefreshTokenMatching) {
                return user;
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
    /**
     *
     * @param password
     * @returns
     */
    async getPasswordHash(password) {
        return bcrypt.hash(password, index_3.environment.USER_PASSWORD_BCRYPT_SALT_ROUNDS);
    }
    /**
     * To permanently delete your account from your Gauzy app:
     *
     * @param userId
     * @param options
     * @returns
     */
    async delete(userId) {
        // Do not allow user to delete account in Demo server.
        if (!!this._configService.get('demo')) {
            throw new common_1.ForbiddenException('Do not allow user to delete account in Demo server');
        }
        const currentUserId = context_1.RequestContext.currentUserId();
        // If user don't have enough permission (CHANGE_SELECTED_EMPLOYEE).
        if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            // If user try to delete someone other user account, just denied the request.
            if (currentUserId != userId) {
                throw new common_1.ForbiddenException('You can not delete account for other users!');
            }
        }
        const user = await this.findOneByIdString(userId);
        if (!user) {
            throw new common_1.ForbiddenException('User not found for this ID!');
        }
        try {
            // TODO: Unassign all the task assigned to this user
            // Best to raise some event and handle it in the subscriber that remove tasks!
            const employee = await this._employeeService.findOneByUserId(user.id);
            if (employee) {
                await this._taskService.unassignEmployeeFromTeamTasks(employee.id);
            }
            return await super.delete(userId);
        }
        catch (error) {
            throw new common_1.ForbiddenException(error?.message);
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmUserRepository,
        repository_1.MikroOrmUserRepository,
        index_3.ConfigService,
        employee_service_1.EmployeeService,
        task_service_1.TaskService])
], UserService);
//# sourceMappingURL=user.service.js.map