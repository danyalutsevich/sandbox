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
exports.DefaultLogger = void 0;
const chalk = __importStar(require("chalk"));
const DEFAULT_CONTEXT = `Bootstrap Server`;
class DefaultLogger {
    logger = console.log;
    _defaultContext = DEFAULT_CONTEXT;
    get defaultContext() {
        return this._defaultContext;
    }
    set defaultContext(context) {
        this._defaultContext = context;
    }
    constructor(options) { }
    log(message, context) {
        this.printLog(chalk.green.bold(`info`), message, context);
    }
    error(message, context, trace) {
        this.printLog(chalk.red.bold(`error`), message, context);
    }
    warn(message, context) {
        this.printLog(chalk.yellow.bold(`warn`), message, context);
    }
    info(message, context) {
        this.printLog(chalk.green.bold(`info`), message, context);
    }
    verbose(message, context) {
        this.printLog(chalk.green.bold(`verbose`), message, context);
    }
    debug(message, context) {
        this.printLog(chalk.green.bold(`debug`), message, context);
    }
    printLog(prefix, message, context) {
        this.logger([prefix, this.printContext(context), message].join(' '));
    }
    printContext(context) {
        return chalk.cyan(`[${context || this.defaultContext}]`);
    }
}
exports.DefaultLogger = DefaultLogger;
//# sourceMappingURL=default-logger.js.map