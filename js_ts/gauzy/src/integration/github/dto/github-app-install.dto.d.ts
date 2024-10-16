import { IGithubAppInstallInput } from '../../../../plugins/contracts/dist/index';
import { TenantOrganizationBaseDTO } from "core/dto";
export declare enum GithubSetupActionEnum {
    INSTALL = "install",
    UPDATE = "update"
}
export declare class GithubOAuthDTO extends TenantOrganizationBaseDTO implements IGithubAppInstallInput {
    readonly code: string;
}
export declare class GithubAppInstallDTO implements IGithubAppInstallInput {
    readonly installation_id: string;
    readonly setup_action: GithubSetupActionEnum;
}
