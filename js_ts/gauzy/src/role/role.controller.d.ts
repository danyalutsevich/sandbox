import { IPagination, IRole, IRoleMigrateInput } from '../../plugins/contracts/dist/index';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleDTO, CreateRoleDTO as UpdateRoleDTO, FindRoleQueryDTO } from './dto';
import { CrudController } from './../core/crud';
export declare class RoleController extends CrudController<Role> {
    private readonly roleService;
    constructor(roleService: RoleService);
    /**
     * GET role by where condition
     *
     * @param options
     * @returns
     */
    findOneRoleByOptions(options: FindRoleQueryDTO): Promise<IRole>;
    /**
     * GET roles for specific tenant
     *
     * @returns
     */
    findAll(): Promise<IPagination<IRole>>;
    /**
     * CREATE role for specific tenant
     *
     * @param entity
     * @returns
     */
    create(entity: CreateRoleDTO): Promise<IRole>;
    /**
     * UPDATE role by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: IRole['id'], entity: UpdateRoleDTO): Promise<UpdateResult | IRole>;
    /**
     * Deletes a role by its ID.
     * This endpoint handles HTTP DELETE requests to delete a role identified by the given ID.
     *
     * @param id - The UUID of the role to delete.
     * @returns {Promise<DeleteResult>} - The result of the delete operation.
     */
    delete(id: IRole['id']): Promise<DeleteResult>;
    /**
     * Import self hosted to gauzy cloud
     *
     * @param input
     * @returns
     */
    importRole(input: IRoleMigrateInput[]): Promise<import("../../plugins/contracts/dist/import-export.model").IImportRecord[]>;
}
