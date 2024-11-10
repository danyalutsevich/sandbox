"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseJsonPipe = void 0;
const common_1 = require("@nestjs/common");
const http_error_by_code_util_1 = require("@nestjs/common/utils/http-error-by-code.util");
const class_validator_1 = require("class-validator");
/**
 * JSON Parse Pipe
 * Validates UUID passed in request parameters.
 */
let ParseJsonPipe = exports.ParseJsonPipe = class ParseJsonPipe {
    /**
     * Throw invalid JSON error or not ? default to "false"
     */
    throwInvalidError;
    exceptionFactory;
    /**
     * Instance of class-validator
     * Can not be easily injected, and there's no need to do so as we
     * only use it for json validation method.
     */
    constructor(options) {
        options = options || {};
        const { exceptionFactory, errorHttpStatusCode = common_1.HttpStatus.BAD_REQUEST, throwInvalidError = false } = options;
        this.throwInvalidError = throwInvalidError;
        this.exceptionFactory =
            exceptionFactory ||
                ((error) => new http_error_by_code_util_1.HttpErrorByCode[errorHttpStatusCode](error));
    }
    /**
     * @param value currently processed route argument
     * @param metadata contains metadata about the currently processed route argument
     */
    async transform(value, metadata) {
        const isJson = (0, class_validator_1.isJSON)(value);
        if (isJson) {
            try {
                return JSON.parse(value);
            }
            catch (e) {
                console.log('Json Parser Error:', e);
            }
        }
        else if (this.throwInvalidError) {
            throw this.exceptionFactory('Validation failed (JSON string is expected)');
        }
        return {};
    }
};
exports.ParseJsonPipe = ParseJsonPipe = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [Object])
], ParseJsonPipe);
//# sourceMappingURL=parse-json.pipe.js.map