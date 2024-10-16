import { AuthLoginHandler } from './auth.login.handler';
import { AuthRegisterHandler } from './auth.register.handler';
import { WorkspaceSigninSendCodeCommandHandler } from './workspace-signin-send-code.handler';
import { WorkspaceSigninVerifyTokenHandler } from './workspace-signin-verify-token.handler';
export declare const CommandHandlers: (typeof AuthLoginHandler | typeof AuthRegisterHandler | typeof WorkspaceSigninSendCodeCommandHandler | typeof WorkspaceSigninVerifyTokenHandler)[];
