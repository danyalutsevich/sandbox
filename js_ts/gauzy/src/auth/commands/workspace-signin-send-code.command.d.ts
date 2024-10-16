import { ICommand } from '@nestjs/cqrs';
import { IUserEmailInput, LanguagesEnum } from '../../../plugins/contracts';
import { IAppIntegrationConfig } from '../../../plugins/common/dist/index';
export declare class WorkspaceSigninSendCodeCommand implements ICommand {
    readonly input: IUserEmailInput & Partial<IAppIntegrationConfig>;
    readonly locale: LanguagesEnum;
    static readonly type = "[Password Less] Send Workspace Signin Authentication Code";
    constructor(input: IUserEmailInput & Partial<IAppIntegrationConfig>, locale: LanguagesEnum);
}
