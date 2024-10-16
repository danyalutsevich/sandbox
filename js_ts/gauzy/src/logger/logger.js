"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const common_1 = require("@nestjs/common");
class Logger extends common_1.Logger {
    static _instance = Logger;
    _prefix;
    /**
    * Sets the prefix.
    * @param {string | undefined} prefix - The prefix to be set.
    * @returns {void}
    */
    setPrefix(prefix) {
        this._prefix = prefix;
    }
    /**
    * Gets the current prefix.
    * @returns {string | undefined} The current prefix.
    */
    get prefix() {
        return this._prefix;
    }
    static _logger;
    /**
     * Gets the current logger.
     * @returns {any} The current logger.
     */
    static get logger() {
        return this._logger;
    }
    /**
     * Sets the logger.
     * @param {any} logger - The logger to be set.
     * @returns {void}
     */
    static setLogger(logger) {
        Logger._logger = logger;
    }
    /**
     * Gets the current instance of the logger.
     * @returns {typeof Logger} The current instance of the logger.
     */
    get instance() {
        return Logger._instance;
    }
    /**
     * Logs a message with an optional context.
     * @param {string} message - The message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    log(message, context) {
        const formattedMessage = this.getFormattedMessage(message);
        this.instance.info(formattedMessage, context);
    }
    /**
     * Logs an error message with an optional trace and context.
     * @param {any} message - The error message to be logged.
     * @param {string} [trace] - An optional trace information for the error.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    error(message, trace, context) {
        this.instance.error(message, trace, context);
    }
    /**
     * Formats the message with the prefix if it exists.
     * @param {string} message - The original message.
     * @returns {string} The formatted message.
     */
    getFormattedMessage(message) {
        return this.prefix ? `[${this.prefix}] ${message}` : message;
    }
    /**
     * Logs a warning message with an optional context.
     * @param {string} message - The warning message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    warn(message, context) {
        this.instance.warn(message, context);
    }
    /**
     * Logs a debug message with an optional context.
     * @param {string} message - The debug message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    debug(message, context) {
        this.instance.debug(message, context);
    }
    /**
     * Logs a verbose message with an optional context.
     * @param {string} message - The verbose message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    verbose(message, context) {
        this.instance.verbose(message, context);
    }
    /**
     * Logs an error message with an optional context and trace.
     * @param {string} message - The error message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @param {string} [trace] - An optional trace information for the error.
     * @returns {void}
     */
    static error(message, context, trace) {
        Logger.logger.error(message, context, trace);
    }
    /**
     * Logs a warning message with an optional context.
     * @param {string} message - The warning message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    static warn(message, context) {
        Logger.logger.warn(message, context);
    }
    /**
     * Logs an informational message with an optional context.
     * @param {string} message - The informational message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    static info(message, context) {
        Logger.logger.info(message, context);
    }
    /**
     * Logs a verbose message with an optional context.
     * @param {string} message - The verbose message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    static verbose(message, context) {
        Logger.logger.verbose(message, context);
    }
    /**
     * Logs a debug message with an optional context.
     * @param {string} message - The debug message to be logged.
     * @param {string} [context] - An optional context for the log message.
     * @returns {void}
     */
    static debug(message, context) {
        Logger.logger.debug(message, context);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map