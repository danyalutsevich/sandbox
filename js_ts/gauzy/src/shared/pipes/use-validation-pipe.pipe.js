"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseValidationPipe = void 0;
const common_1 = require("@nestjs/common");
function UseValidationPipe(options) {
    return (0, common_1.UsePipes)(new common_1.ValidationPipe(options));
}
exports.UseValidationPipe = UseValidationPipe;
//# sourceMappingURL=use-validation-pipe.pipe.js.map