import { LanguagesEnum } from '../../plugins/contracts/dist/index';
import { EmailResetService } from './email-reset.service';
import { ResetEmailRequestDTO, VerifyEmailResetRequestDTO } from './dto';
export declare class EmailResetController {
    private readonly emailResetService;
    constructor(emailResetService: EmailResetService);
    /**
     * Create email reset request.
     *
     * @param entity
     * @param languageCode
     * @returns
     */
    requestChangeEmail(entity: ResetEmailRequestDTO, languageCode: LanguagesEnum): Promise<Object>;
    /**
     * Verify email reset request
     *
     * @param entity
     * @returns
     */
    verifyChangeEmail(entity: VerifyEmailResetRequestDTO): Promise<Object>;
}
