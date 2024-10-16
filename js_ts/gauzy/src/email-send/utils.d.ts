import { ISMTPConfig } from '../../plugins/common/dist/index';
import { IVerifySMTPTransport } from '../../plugins/contracts/dist/index';
/**
 * Email utils functions.
 */
export declare class SMTPUtils {
    /**
     * Returns the default SMTP transporter configuration based on the environment.
     * @param auth Whether to include the authentication details in the configuration.
     * @returns An SMTP configuration object.
     */
    static defaultSMTPTransporter(auth?: boolean): ISMTPConfig;
    /**
     * Verifies the configuration of an SMTP transporter.
     * @param config The configuration object for the SMTP transporter.
     * @returns A Promise that resolves to true if the configuration is valid, or false if there's an error.
     */
    static verifyTransporter(config: IVerifySMTPTransport): Promise<boolean>;
    /**
     *
     * @param config
     */
    static convertSmtpToTransporter(config: ISMTPConfig): IVerifySMTPTransport;
}
