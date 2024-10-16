import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IOrganizationCreateInput, ITenantCreateInput, IUserRegistrationInput, IRoleMigrateInput, ITenant, IRolePermissionMigrateInput, IUserLoginInput } from '../../plugins/contracts/dist/index';
export declare class GauzyCloudService {
    private readonly _http;
    constructor(_http: HttpService);
    /**
     * Extract user from cloud server
     * Register user from local to cloud server
     *
     * @param params
     * @returns
     */
    migrateUser(params: IUserRegistrationInput): Observable<AxiosResponse<any, any>>;
    /**
     * Extract Bearer Token from cloud server
     * Login user from local to cloud server
     *
     * @param params
     * @returns
     */
    extractToken(params: IUserLoginInput): Observable<AxiosResponse<any, any>>;
    /**
     * Migrate default tenant to the cloud server
     *
     * @param params
     * @param token
     * @returns
     */
    migrateTenant(params: ITenantCreateInput, token: string): Observable<AxiosResponse<any, any>>;
    /**
     * Migrate default organization to the cloud server
     *
     * @param params
     * @param token
     * @returns
     */
    migrateOrganization(params: IOrganizationCreateInput, token: string): Observable<AxiosResponse<any, any>>;
    /**
     * Migrate roles to the cloud server
     *
     * @param params
     * @param token
     * @param tenant
     * @returns
     */
    migrateRoles(params: IRoleMigrateInput[], token: string, tenant: ITenant): Observable<AxiosResponse<any, any>>;
    /**
     * Migrate role permissions to the cloud server
     *
     * @param params
     * @param token
     * @param tenant
     * @returns
     */
    migrateRolePermissions(params: IRolePermissionMigrateInput[], token: string, tenant: ITenant): Observable<AxiosResponse<any, any>>;
}
