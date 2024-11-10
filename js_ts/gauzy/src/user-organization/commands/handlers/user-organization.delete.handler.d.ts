import { ICommandHandler } from '@nestjs/cqrs';
import { UserOrganizationDeleteCommand } from '../user-organization.delete.command';
import { UserOrganization } from '../../user-organization.entity';
import { UserService } from '../../../user/user.service';
import { UserOrganizationService } from '../../user-organization.services';
import { DeleteResult } from 'typeorm';
import { RoleService } from '../../../role/role.service';
import { I18nService } from 'nestjs-i18n';
/**
 * 1. Remove user from given organization if user belongs to multiple organizations
 * 2. Remove user record if the user belongs only to the given organization
 * 3. Allow the deletion of Admin and Super Admin Users only if there are more than 1 users of that Role.
 * 4. When a Super Admins are deleted, they must be removed from all existing organizations.
 * 5. Super Admin user can be deleted only by a Super Admin user.
 */
export declare class UserOrganizationDeleteHandler implements ICommandHandler<UserOrganizationDeleteCommand> {
    private readonly userOrganizationService;
    private readonly userService;
    private readonly roleService;
    private readonly i18n;
    constructor(userOrganizationService: UserOrganizationService, userService: UserService, roleService: RoleService, i18n: I18nService);
    execute(command: UserOrganizationDeleteCommand): Promise<UserOrganization | DeleteResult>;
    private _removeUserFromOrganization;
    private _removeSuperAdmin;
}
