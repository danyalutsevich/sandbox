import { IAppIntegrationConfig } from '../../plugins/common/dist/index';
import { EmailConfirmationService } from './email-confirmation.service';
import { ConfirmEmailByCodeDTO, ConfirmEmailByTokenDTO } from './dto';
export declare class EmailVerificationController {
    private readonly emailConfirmationService;
    constructor(emailConfirmationService: EmailConfirmationService);
    /**
     * Email verification by token
     *
     * @param body
     * @returns
     */
    confirmEmail(body: ConfirmEmailByTokenDTO): Promise<Object>;
    /**
     * Email verification by token
     *
     * @param body
     * @returns
     */
    confirmEmailByCode(body: ConfirmEmailByCodeDTO): Promise<Object>;
    /**
     * Resend email verification link
     *
     * @returns
     */
    resendConfirmationLink(config: IAppIntegrationConfig): Promise<Object>;
}
