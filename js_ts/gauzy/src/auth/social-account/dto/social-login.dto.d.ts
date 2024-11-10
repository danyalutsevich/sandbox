import { ISocialAccountBase, ProviderEnum } from '../../../../plugins/contracts';
import { IncludeTeamsDTO } from '../../../user/dto/include-teams.dto';
/**
 * Validate the social login body request
 */
export declare class SocialLoginBodyRequestDTO extends IncludeTeamsDTO {
    readonly provider: ProviderEnum;
    readonly token: string;
}
declare const FindUserBySocialLoginDTO_base: import("@nestjs/common").Type<Pick<SocialLoginBodyRequestDTO, "provider">>;
export declare class FindUserBySocialLoginDTO extends FindUserBySocialLoginDTO_base implements ISocialAccountBase {
    readonly providerAccountId: string;
}
export {};
