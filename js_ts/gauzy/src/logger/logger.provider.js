"use strict";
// src/logger/logger.provider.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoggerProviders = void 0;
const logger_decorator_1 = require("./logger.decorator");
const logger_1 = require("./logger");
function loggerFactory(logger, prefix) {
    if (prefix) {
        logger.setPrefix(prefix);
    }
    return logger;
}
function createLoggerProvider(prefix) {
    return {
        provide: `Logger${prefix}`,
        useFactory: (logger) => loggerFactory(logger, prefix),
        inject: [logger_1.Logger]
    };
}
function createLoggerProviders() {
    return logger_decorator_1.prefixesForLoggers.map((prefix) => createLoggerProvider(prefix));
}
exports.createLoggerProviders = createLoggerProviders;
//# sourceMappingURL=logger.provider.js.map