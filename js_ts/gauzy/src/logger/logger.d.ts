import { Logger as NestLogger, LoggerService } from '@nestjs/common';
export declare class Logger extends NestLogger implements LoggerService {
    private static _instance;
    private _prefix?;
    /**
    * Sets the prefix.
    * @param {string | undefined} prefix - The prefix to be set.
    * @returns {void}
    */
    setPrefix(prefix: string | undefined): void;
    /**
    * Gets the current prefix.
    * @returns {string | undefined} The current prefix.
    */
    get prefix(): string | undefined;
    private static _logger;
    /**
     * Gets the current logger.
     * @returns {any} The current logger.
     */
    static get logger(): any;
    /**
     * Sets the logger.
     * @param {any} logger - The logger to be set.
     * @returns {void}
     */
    static setLogger(logger: any): void;
    /**
     * Gets the current instance of the logger.
     * @returns {typeof Logger} The current instance of the logger.
     */
    private get instance();
    /**
     * Logs a message with an optional context.
     * @param {string} message - The message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    log(message: string, context?: string): void;
    /**
     * Logs an error message with an optional trace and context.
     * @param {any} message - The error message to be logged.
     * @param {string} [trace] - An optional trace information for the error.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    error(message: any, trace?: string, context?: string): void;
    /**
     * Formats the message with the prefix if it exists.
     * @param {string} message - The original message.
     * @returns {string} The formatted message.
     */
    private getFormattedMessage;
    /**
     * Logs a warning message with an optional context.
     * @param {string} message - The warning message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    warn(message: string, context?: string): void;
    /**
     * Logs a debug message with an optional context.
     * @param {string} message - The debug message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    debug(message: string, context?: string): void;
    /**
     * Logs a verbose message with an optional context.
     * @param {string} message - The verbose message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    verbose(message: string, context?: string): void;
    /**
     * Logs an error message with an optional context and trace.
     * @param {string} message - The error message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @param {string} [trace] - An optional trace information for the error.
     * @returns {void}
     */
    static error(message: string, context?: string, trace?: string): void;
    /**
     * Logs a warning message with an optional context.
     * @param {string} message - The warning message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    static warn(message: string, context?: string): void;
    /**
     * Logs an informational message with an optional context.
     * @param {string} message - The informational message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    static info(message: string, context?: string): void;
    /**
     * Logs a verbose message with an optional context.
     * @param {string} message - The verbose message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    static verbose(message: string, context?: string): void;
    /**
     * Logs a debug message with an optional context.
     * @param {string} message - The debug message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    static debug(message: string, context?: string): void;
}
