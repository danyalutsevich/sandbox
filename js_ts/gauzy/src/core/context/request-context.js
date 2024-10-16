"use strict";
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContext = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const passport_jwt_1 = require("passport-jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const contracts_1 = require("../../../plugins/contracts");
const config_1 = require("../../../plugins/config");
const common_2 = require("../../../plugins/common");
class RequestContext {
    static logging = true;
    _id;
    _res;
    _req;
    _languageCode;
    static clsService;
    /**
     * Gets the language code.
     *
     * @returns The language code.
     */
    get languageCode() {
        return this._languageCode;
    }
    /**
     * Gets the id.
     *
     * @returns The id.
     */
    get id() {
        return this._id;
    }
    /**
     * Creates an instance of RequestContext.
     * @param options - An object containing optional parameters for initializing the instance.
     * @param options.id - Optional Request ID. If not provided, a random ID (UUID) is generated.
     * @param options.req - Optional Request object.
     * @param options.res - Optional Response object.
     * @param options.languageCode - Optional language code (enum) for the instance.
     * @param options.isAuthorized - Optional flag indicating whether the user is authorized.
     */
    constructor(options) {
        // Destructure options to extract individual properties.
        const { req, res, id, languageCode } = options;
        // Assign values to instance properties.
        this._id = id || (0, uuid_1.v4)().toString(); // If 'id' is not provided, generate a random ID.
        this._req = req;
        this._res = res;
        this._languageCode = languageCode;
        if (RequestContext.logging)
            console.log('RequestContext: setting context with Id:', this._id);
    }
    /**
     * Sets the ClsService instance to be used by RequestContext.
     *
     * @param service - The ClsService instance to set.
     */
    static setClsService(service) {
        RequestContext.clsService = service;
    }
    /**
     * Gets the current request context.
     *
     * @returns The current RequestContext instance.
     */
    static currentRequestContext() {
        if (RequestContext?.logging)
            console.log('RequestContext: getting context ...');
        const context = RequestContext?.clsService?.get(RequestContext.name);
        if (RequestContext?.logging)
            console.log('RequestContext: got context with Id:', context?._id);
        return context;
    }
    /**
     * Deserializes a serialized request context object into a RequestContext instance.
     *
     * @param ctxObject - The serialized request context object.
     * @returns A new RequestContext instance.
     */
    static deserialize(ctxObject) {
        return new RequestContext({
            req: ctxObject._req,
            languageCode: ctxObject._languageCode
        });
    }
    /**
     * Creates a shallow copy of the current instance of the RequestContext class.
     * @returns A new instance of RequestContext with the same property values as the original.
     */
    copy() {
        // Create a new object with the same prototype as the current instance
        // and copy the properties of the current instance to the new object
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    /**
     * Gets the current request.
     *
     * @returns The current Request object or null if no context is available.
     */
    static currentRequest() {
        return RequestContext.currentRequestContext()?._req || null;
    }
    /**
     * Retrieves the current tenant ID associated with the user in the RequestContext.
     * Returns the tenant ID if available, otherwise returns null.
     *
     * @returns {string | null} - The current tenant ID or null if not available.
     */
    static currentTenantId() {
        try {
            const user = RequestContext.currentUser();
            return user ? user.tenantId : null;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * Retrieves the current user ID associated with the user in the RequestContext.
     * Returns the user ID if available, otherwise returns null.
     *
     * @returns {string | null} - The current user ID or null if not available.
     */
    static currentUserId() {
        try {
            const user = RequestContext.currentUser();
            return user ? user.id : null;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * Retrieves the current role ID associated with the user in the RequestContext.
     * Returns the role ID if available, otherwise returns null.
     *
     * @returns {string | null} - The current role ID or null if not available.
     */
    static currentRoleId() {
        try {
            const user = RequestContext.currentUser();
            return user ? user.roleId : null;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * Retrieves the current employee ID from the request context.
     * @returns {string | null} - The current employee ID if available, otherwise null.
     */
    static currentEmployeeId() {
        try {
            // Retrieve the current user from the request context
            const user = RequestContext.currentUser();
            // Check if the user is not empty and has the permission to change selected employee
            if ((0, common_2.isNotEmpty)(user) && RequestContext.hasPermission(contracts_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
                // Return null if the user has the permission to change selected employee
                return null;
            }
            // Return the user's employeeId if available
            return user?.employeeId || null;
        }
        catch (error) {
            // Return null if an error occurs
            return null;
        }
    }
    /**
     * Retrieves the current user from the request context.
     * @param {boolean} throwError - Flag indicating whether to throw an error if user is not found.
     * @returns {IUser | null} - The current user if found, otherwise null.
     */
    static currentUser(throwError) {
        const requestContext = RequestContext.currentRequestContext();
        // Check if request context exists
        if (requestContext) {
            // Get user from request context
            const user = requestContext._req['user'];
            // If user exists, return it
            if (user) {
                return user;
            }
        }
        // If throwError is true, throw an unauthorized error
        if (throwError) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        // If throwError is false or not provided, return null
        return null;
    }
    /**
     * Checks if the current user has a specific permission.
     * @param {PermissionsEnum} permission - The permission to check.
     * @param {boolean} throwError - Flag indicating whether to throw an error if permission is not granted.
     * @returns {boolean} - True if the user has the permission, otherwise false.
     */
    static hasPermission(permission, throwError) {
        return this.hasPermissions([permission], throwError);
    }
    /**
     * Retrieves the language code from the headers of the current request.
     * @returns The language code (LanguagesEnum) extracted from the headers, or the default language (ENGLISH) if not found.
     */
    static getLanguageCode() {
        // Retrieve the current request
        const req = RequestContext.currentRequest();
        // Variable to store the extracted language code
        let lang;
        // Check if a request exists
        if (req) {
            // Check if the 'language' header exists in the request
            if (req.headers && req.headers['language']) {
                // If found, set the lang variable
                lang = req.headers['language'];
            }
        }
        // Return the extracted language code or the default language (ENGLISH) if not found
        return lang || contracts_1.LanguagesEnum.ENGLISH;
    }
    /**
     * Checks if the current request context has the specified permissions.
     *
     * @param permissions - An array of permissions to check.
     * @param throwError - Whether to throw an error if permissions are not found.
     * @returns True if the required permissions are found, otherwise false.
     */
    static hasPermissions(permissions, throwError) {
        const requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            try {
                // tslint:disable-next-line
                const token = this.currentToken();
                if (token) {
                    const jwtPayload = (0, jsonwebtoken_1.verify)(token, config_1.environment.JWT_SECRET);
                    return permissions.every((permission) => (jwtPayload.permissions ?? []).includes(permission));
                }
            }
            catch (error) {
                // Do nothing here, we throw below anyway if needed
                console.log(error);
            }
        }
        if (throwError) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return false;
    }
    /**
     * Checks if the current request context has any of the specified permissions.
     *
     * @param permissions - An array of permissions to check.
     * @param throwError - Whether to throw an error if no permissions are found.
     * @returns True if any of the required permissions are found, otherwise false.
     */
    static hasAnyPermission(permissions, throwError) {
        const requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            try {
                // tslint:disable-next-line
                const token = this.currentToken();
                if (token) {
                    const jwtPayload = (0, jsonwebtoken_1.verify)(token, config_1.environment.JWT_SECRET);
                    return (jwtPayload.permissions ?? []).some((permission) => permissions.includes(permission));
                }
            }
            catch (error) {
                // Do nothing here, we throw below anyway if needed
                console.log(error);
            }
        }
        if (throwError) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return false;
    }
    /**
     * Extracts the current JWT token from the request context.
     *
     * @param throwError - Whether to throw an error if no token is found.
     * @returns The extracted token if found, otherwise null.
     */
    static currentToken(throwError) {
        const requestContext = RequestContext.currentRequestContext();
        if (requestContext) {
            try {
                // tslint:disable-next-line
                return passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(requestContext._req);
            }
            catch (error) {
                // Do nothing here, we throw below anyway if needed
                console.log(error);
            }
        }
        if (throwError) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return null;
    }
    /**
     * Checks if the current user has a specific role.
     * @param {RolesEnum} role - The role to check.
     * @param {boolean} throwError - Flag indicating whether to throw an error if the role is not granted.
     * @returns {boolean} - True if the user has the role, otherwise false.
     */
    static hasRole(role, throwError) {
        return this.hasRoles([role], throwError);
    }
    /**
     * Checks if the current request context has any of the specified roles.
     *
     * @param roles - An array of roles to check.
     * @param throwError - Whether to throw an error if no roles are found.
     * @returns True if any of the required roles are found, otherwise false.
     */
    static hasRoles(roles, throwError) {
        const context = RequestContext.currentRequestContext();
        if (context) {
            try {
                // tslint:disable-next-line
                const token = this.currentToken();
                if (token) {
                    const { role } = (0, jsonwebtoken_1.verify)(token, config_1.environment.JWT_SECRET);
                    return roles.includes(role ?? null);
                }
            }
            catch (error) {
                if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                    return false;
                }
                else {
                    throw error;
                }
            }
        }
        if (throwError) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        return false;
    }
}
exports.RequestContext = RequestContext;
//# sourceMappingURL=request-context.js.map