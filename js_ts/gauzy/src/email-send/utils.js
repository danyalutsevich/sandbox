"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMTPUtils = void 0;
const nodemailer = __importStar(require("nodemailer"));
const index_1 = require("../../plugins/config/dist/index");
/**
 * Email utils functions.
 */
class SMTPUtils {
    /**
     * Returns the default SMTP transporter configuration based on the environment.
     * @param auth Whether to include the authentication details in the configuration.
     * @returns An SMTP configuration object.
     */
    static defaultSMTPTransporter(auth = true) {
        const smtpConfig = index_1.environment.smtpConfig; // Assuming environment.smtpConfig holds your SMTP configuration
        const smtp = {
            fromAddress: smtpConfig.fromAddress,
            host: smtpConfig.host,
            port: smtpConfig.port,
            secure: smtpConfig.secure
        };
        if (auth) {
            smtp.auth = {
                user: smtpConfig.auth.user,
                pass: smtpConfig.auth.pass
            };
        }
        // Construct and return the SMTP configuration object
        return smtp;
    }
    /**
     * Verifies the configuration of an SMTP transporter.
     * @param config The configuration object for the SMTP transporter.
     * @returns A Promise that resolves to true if the configuration is valid, or false if there's an error.
     */
    static async verifyTransporter(config) {
        try {
            const transporter = nodemailer.createTransport({
                from: config.fromAddress,
                host: config.host,
                port: config.port || 587,
                secure: config.secure || false,
                auth: {
                    user: config.username,
                    pass: config.password
                }
            });
            // Verify the transporter
            return await transporter.verify(); // Configuration is valid / invalid;
        }
        catch (error) {
            console.log('Error while verifying nodemailer transport: %s', error?.message);
            return false;
        }
    }
    /**
     *
     * @param config
     */
    static convertSmtpToTransporter(config) {
        /** */
        const transport = {
            host: config?.host,
            port: config?.port,
            secure: config?.secure,
            username: config?.auth.user,
            password: config?.auth.pass,
            fromAddress: config?.fromAddress
        };
        // console.log('SMTP config to transporter configuration: %s', transport);
        return transport;
    }
}
exports.SMTPUtils = SMTPUtils;
//# sourceMappingURL=utils.js.map