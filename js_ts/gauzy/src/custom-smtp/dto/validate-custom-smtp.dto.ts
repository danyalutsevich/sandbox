import { IVerifySMTPTransport } from '../../../plugins/contracts';
import { CreateCustomSmtpDTO } from "./create-custom-smtp.dto";

/**
 * Validate custom Smtp Request DTO validation
 */
export class ValidateCustomSmtpDTO extends CreateCustomSmtpDTO implements IVerifySMTPTransport { }
