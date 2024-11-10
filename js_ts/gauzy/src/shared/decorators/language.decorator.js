"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageDecorator = void 0;
const common_1 = require("@nestjs/common");
const contracts_1 = require("../../../plugins/contracts");
exports.LanguageDecorator = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers;
    return headers['language'] || contracts_1.LanguagesEnum.ENGLISH;
});
//# sourceMappingURL=language.decorator.js.map