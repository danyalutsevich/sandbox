import { ICustomSmtpCreateInput } from '../../../plugins/contracts';
import { CustomSmtp } from "./../custom-smtp.entity";
import { CustomSmtpQueryDTO } from "./custom-smtp.query.dto";
declare const CreateCustomSmtpDTO_base: import("@nestjs/common").Type<CustomSmtpQueryDTO & Pick<CustomSmtp, "host" | "port" | "fromAddress" | "secure" | "isValidate">>;
/**
 * Create custom SMTP Request DTO validation
 */
export declare class CreateCustomSmtpDTO extends CreateCustomSmtpDTO_base implements ICustomSmtpCreateInput {
    readonly username: string;
    readonly password: string;
}
export {};
