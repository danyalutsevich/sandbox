"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerDecorator = exports.prefixesForLoggers = void 0;
const common_1 = require("@nestjs/common");
exports.prefixesForLoggers = new Array();
function LoggerDecorator(prefix = '') {
    if (!exports.prefixesForLoggers.includes(prefix)) {
        exports.prefixesForLoggers.push(prefix);
    }
    return (0, common_1.Inject)(`LoggerService${prefix}`);
}
exports.LoggerDecorator = LoggerDecorator;
//# sourceMappingURL=logger.decorator.js.map