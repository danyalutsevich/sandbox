import { CommandBus } from '@nestjs/cqrs';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { IPagination, IUser } from '../../plugins/contracts/dist/index';
import { CrudController, PaginationParams } from './../core/crud';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FactoryResetService } from './factory-reset/factory-reset.service';
import { UpdatePreferredLanguageDTO, UpdatePreferredComponentLayoutDTO, CreateUserDTO, UpdateUserDTO, FindMeQueryDTO } from './dto';
export declare class UserController extends CrudController<User> {
    private readonly _userService;
    private readonly _factoryResetService;
    private readonly _commandBus;
    constructor(_userService: UserService, _factoryResetService: FactoryResetService, _commandBus: CommandBus);
    /**
     * GET endpoint to retrieve details of the currently logged-in user.
     *
     * @param options Query parameters specifying what additional relations to load for the user.
     * @returns A Promise that resolves to the IUser object.
     */
    findMe(options: FindMeQueryDTO): Promise<IUser>;
    /**
     * GET user by email
     *
     * @param email
     * @returns
     */
    findByEmail(email: string): Promise<IUser | null>;
    /**
     * UPDATE user preferred language
     *
     * @param entity
     * @returns
     */
    updatePreferredLanguage(entity: UpdatePreferredLanguageDTO): Promise<IUser | UpdateResult>;
    /**
     * UPDATE user preferred component layout
     *
     * @param entity
     * @returns
     */
    updatePreferredComponentLayout(entity: UpdatePreferredComponentLayoutDTO): Promise<IUser | UpdateResult>;
    /**
     * GET user count for specific tenant
     *
     * @returns
     */
    getCount(options: FindOptionsWhere<User>): Promise<number>;
    /**
     * GET users for specific tenant using pagination
     *
     * @param options
     * @returns
     */
    pagination(options: PaginationParams<User>): Promise<IPagination<IUser>>;
    /**
     * GET users for specific tenant
     *
     * @param options
     * @returns
     */
    findAll(options: PaginationParams<User>): Promise<IPagination<IUser>>;
    /**
     * GET user by id
     *
     * @param id
     * @param data
     * @returns
     */
    findById(id: string, data?: any): Promise<IUser>;
    /**
     * CREATE user for specific tenant
     *
     * @param entity
     * @returns
     */
    create(entity: CreateUserDTO): Promise<IUser>;
    /**
     * UPDATE user by id
     *
     * @param id
     * @param entity
     * @returns
     */
    update(id: IUser['id'], entity: UpdateUserDTO): Promise<IUser>;
    /**
     * To permanently delete your account from your Gauzy app:
     *
     * @param id
     * @returns
     */
    delete(id: IUser['id']): Promise<DeleteResult>;
    /**
     * DELETE all user data from all tables
     *
     * @returns
     */
    factoryReset(): Promise<import("..").Organization>;
}
