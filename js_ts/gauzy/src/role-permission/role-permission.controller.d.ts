import { DeleteResult, UpdateResult } from 'typeorm';
import { IPagination, IRolePermission } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { CreateRolePermissionDTO, UpdateRolePermissionDTO } from './dto';
import { RolePermission } from './role-permission.entity';
import { RolePermissionService } from './role-permission.service';
export declare class RolePermissionController extends CrudController<RolePermission> {
    private readonly _rolePermissionService;
    constructor(_rolePermissionService: RolePermissionService);
    /**
     * Import/Migrate role-permissions for specific tenant
     *
     * @param input
     * @returns
     */
    importRole(input: any): Promise<import("../../plugins/contracts/dist/import-export.model").IImportRecord[]>;
    /**
     * Retrieves the permissions of the current user.
     *
     * @return {Promise<IPagination<RolePermission>>} A Promise that resolves to a paginated list of RolePermission objects.
     */
    findMePermissions(): Promise<IPagination<IRolePermission>>;
    /**
     * GET role-permissions for specific tenant
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<RolePermission>): Promise<IPagination<IRolePermission>>;
    /**
     * GET all role permissions for specific tenant
     *
     * @param data
     * @returns
     */
    findAll(data: any): Promise<IPagination<IRolePermission>>;
    /**
     * CREATE role permissions for specific tenant
     *
     * @param entity
     * @returns
     */
    create(entity: CreateRolePermissionDTO): Promise<IRolePermission>;
    /**
     * UPDATE role permissions for specific tenant
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: string, entity: UpdateRolePermissionDTO): Promise<UpdateResult | IRolePermission>;
    /**
     * DELETE role permissions for specific tenant
     *
     * @param id
     * @returns
     */
    delete(id: string): Promise<DeleteResult>;
}
