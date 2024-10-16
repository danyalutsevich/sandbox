import { DeepPartial } from 'typeorm';
import { ISocialAccount, ISocialAccountBase } from '../../../plugins/contracts';
import { TenantAwareCrudService } from '../../core/crud';
import { SocialAccount } from './social-account.entity';
import { MicroOrmSocialAccountRepository, TypeOrmSocialAccountRepository } from './repository';
import { User, UserService } from '../../user';
export declare class SocialAccountService extends TenantAwareCrudService<SocialAccount> {
    readonly typeOrmSocialAccountRepository: TypeOrmSocialAccountRepository;
    readonly mikroOrmSocialAccountRepository: MicroOrmSocialAccountRepository;
    private readonly userService;
    constructor(typeOrmSocialAccountRepository: TypeOrmSocialAccountRepository, mikroOrmSocialAccountRepository: MicroOrmSocialAccountRepository, userService: UserService);
    registerSocialAccount(partialEntity: DeepPartial<ISocialAccount>): Promise<ISocialAccount>;
    findAccountByProvider(input: ISocialAccountBase): Promise<SocialAccount>;
    findUserBySocialId(input: ISocialAccountBase): Promise<User>;
    signupFindUserByEmail(email: string): Promise<boolean>;
}
