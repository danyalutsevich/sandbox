"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const logger_provider_1 = require("./logger.provider");
const logger_1 = require("./logger");
let LoggerModule = exports.LoggerModule = LoggerModule_1 = class LoggerModule {
    /**
     * Configures the Logger module for root.
     * @returns {DynamicModule} The dynamically configured module.
     */
    static forRoot() {
        const prefixedLoggerProviders = (0, logger_provider_1.createLoggerProviders)();
        return {
            module: LoggerModule_1,
            providers: [logger_1.Logger, ...prefixedLoggerProviders],
            exports: [logger_1.Logger, ...prefixedLoggerProviders]
        };
    }
};
exports.LoggerModule = LoggerModule = LoggerModule_1 = __decorate([
    (0, common_1.Module)({})
], LoggerModule);
//# sourceMappingURL=logger.module.js.map