import { EntityRepositoryType } from '@mikro-orm/knex';
import { ISocialAccount, IUser, ProviderEnum } from '../../../plugins/contracts';
import { TenantBaseEntity } from '../../core/entities/internal';
import { MicroOrmSocialAccountRepository } from './repository';
export declare class SocialAccount extends TenantBaseEntity implements ISocialAccount {
    [EntityRepositoryType]?: MicroOrmSocialAccountRepository;
    provider: ProviderEnum;
    providerAccountId: string;
    /**
     * User
     */
    user?: IUser;
    userId?: IUser['id'];
}
