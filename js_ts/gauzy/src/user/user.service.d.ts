import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { JwtPayload } from 'jsonwebtoken';
import { ComponentLayoutStyleEnum, IFindMeUser, IUser, LanguagesEnum } from '../../plugins/contracts/dist/index';
import { ConfigService } from '../../plugins/config/dist/index';
import { TenantAwareCrudService } from './../core/crud';
import { EmployeeService } from '../employee/employee.service';
import { TaskService } from '../tasks/task.service';
import { MikroOrmUserRepository, TypeOrmUserRepository } from './repository';
import { User } from './user.entity';
export declare class UserService extends TenantAwareCrudService<User> {
    readonly typeOrmUserRepository: TypeOrmUserRepository;
    readonly mikroOrmUserRepository: MikroOrmUserRepository;
    private readonly _configService;
    private readonly _employeeService;
    private readonly _taskService;
    constructor(typeOrmUserRepository: TypeOrmUserRepository, mikroOrmUserRepository: MikroOrmUserRepository, _configService: ConfigService, _employeeService: EmployeeService, _taskService: TaskService);
    /**
     * Fetches the logged-in user's details along with associated employee details if requested.
     *
     * @param options Options for the findMeUser method.
     * @returns A promise resolving to the user details.
     */
    findMeUser(options: IFindMeUser): Promise<IUser>;
    /**
     * Retrieves details of the currently logged-in user, including specified relations.
     *
     * @param relations An array of strings indicating which relations of the user to include.
     * @returns A Promise resolving to the IUser object with the desired relations.
     */
    private findMe;
    /**
     * Marked email as verified for user
     *
     * @param id
     * @returns
     */
    markEmailAsVerified(id: IUser['id']): Promise<number | UpdateResult>;
    /**
     * GET user by email in the same tenant
     *
     * @param email
     * @returns
     */
    getUserByEmail(email: string): Promise<IUser | null>;
    /**
     * GET user by email using social logins
     *
     * @param email
     * @returns
     */
    getOAuthLoginEmail(email: string): Promise<IUser>;
    /**
     * Checks if a user with the given email exists.
     * @param {string} email - The email of the user to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, otherwise false.
     */
    checkIfExistsEmail(email: string): Promise<boolean>;
    /**
     * Checks if a user with the given ID exists.
     * @param {string} id - The ID of the user to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, otherwise false.
     */
    checkIfExists(id: string): Promise<boolean>;
    /**
     * Checks if a user with the given third party ID exists.
     * @param {string} thirdPartyId - The third party ID of the user to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user exists, otherwise false.
     */
    checkIfExistsThirdParty(thirdPartyId: string): Promise<boolean>;
    /**
     * Retrieves a user with the given ID if it exists.
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<User | undefined>} - A promise that resolves to the user if it exists, otherwise undefined.
     */
    getIfExists(id: string): Promise<User | undefined>;
    /**
     * Retrieves a user with the given third party ID if it exists.
     * @param {string} thirdPartyId - The third party ID of the user to retrieve.
     * @returns {Promise<User | undefined>} - A promise that resolves to the user if it exists, otherwise undefined.
     */
    getIfExistsThirdParty(thirdPartyId: string): Promise<User | undefined>;
    /**
     * Creates a new user.
     * @param {User} user - The user object to create.
     * @returns {Promise<InsertResult>} - A promise that resolves to the insert result.
     */
    createOne(user: User): Promise<InsertResult>;
    changePassword(id: string, hash: string): Promise<User>;
    updateProfile(id: string | number, entity: User): Promise<IUser>;
    getAdminUsers(tenantId: string): Promise<User[]>;
    /**
     * Updates the preferred language of the current user.
     * @param {LanguagesEnum} preferredLanguage - The preferred language to update.
     * @returns {Promise<IUser | UpdateResult>} - A promise that resolves to the updated user or update result.
     */
    updatePreferredLanguage(preferredLanguage: LanguagesEnum): Promise<IUser | UpdateResult>;
    /**
     * Updates the preferred component layout of the current user.
     * @param {ComponentLayoutStyleEnum} preferredComponentLayout - The preferred component layout to update.
     * @returns {Promise<IUser | UpdateResult>} - A promise that resolves to the updated user or update result.
     */
    updatePreferredComponentLayout(preferredComponentLayout: ComponentLayoutStyleEnum): Promise<IUser | UpdateResult>;
    /**
     * Sets the current refresh token for the user.
     * @param {string} refreshToken - The refresh token to set.
     * @param {string} userId - The ID of the user for whom to set the refresh token.
     * @returns {Promise<void>} - A promise that resolves once the refresh token is set.
     */
    setCurrentRefreshToken(refreshToken: string, userId: string): Promise<UpdateResult>;
    /**
     * Removes the refresh token from the database.
     * Logout Device
     *
     * @param userId
     * @returns
     */
    removeRefreshToken(): Promise<void>;
    /**
     * Get user if refresh token matches
     *
     * @param refreshToken
     * @param payload
     * @returns
     */
    getUserIfRefreshTokenMatches(refreshToken: string, payload: JwtPayload): Promise<User>;
    /**
     *
     * @param password
     * @returns
     */
    private getPasswordHash;
    /**
     * To permanently delete your account from your Gauzy app:
     *
     * @param userId
     * @param options
     * @returns
     */
    delete(userId: IUser['id']): Promise<DeleteResult>;
}
