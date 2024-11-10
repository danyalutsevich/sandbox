import { EntityRepositoryType } from '@mikro-orm/core';
import { IUser, IRole, ComponentLayoutStyleEnum, ITag, IUserOrganization, IInvite, IImageAsset, TimeFormatEnum, ISocialAccount } from '../../plugins/contracts/dist/index';
import { TenantBaseEntity } from '../core/entities/internal';
import { MikroOrmUserRepository } from './repository/mikro-orm-user.repository';
export declare class User extends TenantBaseEntity implements IUser {
    [EntityRepositoryType]?: MikroOrmUserRepository;
    thirdPartyId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    username?: string;
    timeZone?: string;
    timeFormat?: TimeFormatEnum;
    hash?: string;
    refreshToken?: string;
    imageUrl?: string;
    preferredLanguage?: string;
    preferredComponentLayout?: ComponentLayoutStyleEnum;
    code?: string;
    codeExpireAt?: Date;
    emailVerifiedAt?: Date;
    emailToken?: string;
    /** Additional virtual columns */
    name?: string;
    isEmailVerified?: boolean;
    /**
     * Role
     */
    role?: IRole;
    roleId?: string;
    /**
     * ImageAsset
     */
    image?: IImageAsset;
    imageId?: IImageAsset['id'];
    tags?: ITag[];
    /**
     * UserOrganization
     */
    organizations?: IUserOrganization[];
    /**
     * User belongs to invites
     */
    invites?: IInvite[];
    /**
     * User social accounts
     */
    socialAccounts?: ISocialAccount[];
}
