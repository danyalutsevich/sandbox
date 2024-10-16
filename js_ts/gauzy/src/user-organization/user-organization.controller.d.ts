import { CommandBus } from '@nestjs/cqrs';
import { IUserOrganization, LanguagesEnum, IPagination, IUser } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { UserOrganizationService } from './user-organization.services';
import { UserOrganization } from './user-organization.entity';
import { FindMeUserOrganizationDTO } from './dto/find-me-user-organization.dto';
export declare class UserOrganizationController extends CrudController<UserOrganization> {
    private readonly userOrganizationService;
    private readonly commandBus;
    constructor(userOrganizationService: UserOrganizationService, commandBus: CommandBus);
    /**
     *
     * @param params
     * @returns
     */
    findAll(params: PaginationParams<UserOrganization>, query: FindMeUserOrganizationDTO): Promise<IPagination<IUserOrganization>>;
    delete(id: string, user: IUser, language: LanguagesEnum): Promise<IUserOrganization>;
    findOrganizationCount(id: string): Promise<number>;
}
