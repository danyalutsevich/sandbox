import { ClsService } from 'nestjs-cls';
import { Request, Response } from 'express';
import { IUser, PermissionsEnum, LanguagesEnum, RolesEnum } from '../../../plugins/contracts';
import { SerializedRequestContext } from './types';
export declare class RequestContext {
    private static logging;
    protected readonly _id: string;
    protected readonly _res: Response;
    private readonly _req;
    private readonly _languageCode;
    protected static clsService: ClsService;
    /**
     * Gets the language code.
     *
     * @returns The language code.
     */
    get languageCode(): LanguagesEnum;
    /**
     * Gets the id.
     *
     * @returns The id.
     */
    get id(): string;
    /**
     * Creates an instance of RequestContext.
     * @param options - An object containing optional parameters for initializing the instance.
     * @param options.id - Optional Request ID. If not provided, a random ID (UUID) is generated.
     * @param options.req - Optional Request object.
     * @param options.res - Optional Response object.
     * @param options.languageCode - Optional language code (enum) for the instance.
     * @param options.isAuthorized - Optional flag indicating whether the user is authorized.
     */
    constructor(options: {
        id?: string;
        req?: Request;
        res?: Response;
        languageCode?: LanguagesEnum;
        isAuthorized?: boolean;
    });
    /**
     * Sets the ClsService instance to be used by RequestContext.
     *
     * @param service - The ClsService instance to set.
     */
    static setClsService(service: ClsService): void;
    /**
     * Gets the current request context.
     *
     * @returns The current RequestContext instance.
     */
    static currentRequestContext(): RequestContext;
    /**
     * Deserializes a serialized request context object into a RequestContext instance.
     *
     * @param ctxObject - The serialized request context object.
     * @returns A new RequestContext instance.
     */
    static deserialize(ctxObject: SerializedRequestContext): RequestContext;
    /**
     * Creates a shallow copy of the current instance of the RequestContext class.
     * @returns A new instance of RequestContext with the same property values as the original.
     */
    copy(): RequestContext;
    /**
     * Gets the current request.
     *
     * @returns The current Request object or null if no context is available.
     */
    static currentRequest(): any;
    /**
     * Retrieves the current tenant ID associated with the user in the RequestContext.
     * Returns the tenant ID if available, otherwise returns null.
     *
     * @returns {string | null} - The current tenant ID or null if not available.
     */
    static currentTenantId(): string | null;
    /**
     * Retrieves the current user ID associated with the user in the RequestContext.
     * Returns the user ID if available, otherwise returns null.
     *
     * @returns {string | null} - The current user ID or null if not available.
     */
    static currentUserId(): string | null;
    /**
     * Retrieves the current role ID associated with the user in the RequestContext.
     * Returns the role ID if available, otherwise returns null.
     *
     * @returns {string | null} - The current role ID or null if not available.
     */
    static currentRoleId(): string | null;
    /**
     * Retrieves the current employee ID from the request context.
     * @returns {string | null} - The current employee ID if available, otherwise null.
     */
    static currentEmployeeId(): string | null;
    /**
     * Retrieves the current user from the request context.
     * @param {boolean} throwError - Flag indicating whether to throw an error if user is not found.
     * @returns {IUser | null} - The current user if found, otherwise null.
     */
    static currentUser(throwError?: boolean): IUser | null;
    /**
     * Checks if the current user has a specific permission.
     * @param {PermissionsEnum} permission - The permission to check.
     * @param {boolean} throwError - Flag indicating whether to throw an error if permission is not granted.
     * @returns {boolean} - True if the user has the permission, otherwise false.
     */
    static hasPermission(permission: PermissionsEnum, throwError?: boolean): boolean;
    /**
     * Retrieves the language code from the headers of the current request.
     * @returns The language code (LanguagesEnum) extracted from the headers, or the default language (ENGLISH) if not found.
     */
    static getLanguageCode(): LanguagesEnum;
    /**
     * Checks if the current request context has the specified permissions.
     *
     * @param permissions - An array of permissions to check.
     * @param throwError - Whether to throw an error if permissions are not found.
     * @returns True if the required permissions are found, otherwise false.
     */
    static hasPermissions(permissions: PermissionsEnum[], throwError?: boolean): boolean;
    /**
     * Checks if the current request context has any of the specified permissions.
     *
     * @param permissions - An array of permissions to check.
     * @param throwError - Whether to throw an error if no permissions are found.
     * @returns True if any of the required permissions are found, otherwise false.
     */
    static hasAnyPermission(permissions: PermissionsEnum[], throwError?: boolean): boolean;
    /**
     * Extracts the current JWT token from the request context.
     *
     * @param throwError - Whether to throw an error if no token is found.
     * @returns The extracted token if found, otherwise null.
     */
    static currentToken(throwError?: boolean): any;
    /**
     * Checks if the current user has a specific role.
     * @param {RolesEnum} role - The role to check.
     * @param {boolean} throwError - Flag indicating whether to throw an error if the role is not granted.
     * @returns {boolean} - True if the user has the role, otherwise false.
     */
    static hasRole(role: RolesEnum, throwError?: boolean): boolean;
    /**
     * Checks if the current request context has any of the specified roles.
     *
     * @param roles - An array of roles to check.
     * @param throwError - Whether to throw an error if no roles are found.
     * @returns True if any of the required roles are found, otherwise false.
     */
    static hasRoles(roles: RolesEnum[], throwError?: boolean): boolean;
}
