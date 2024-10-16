"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
let TransformInterceptor = exports.TransformInterceptor = class TransformInterceptor {
    /**
     * Intercepts the execution context and the call handler.
     * Transforms the data using class-transformer's instanceToPlain.
     * Catches and handles errors, returning appropriate exceptions.
     * @param ctx - The execution context.
     * @param next - The call handler.
     * @returns An observable that represents the intercepted response.
     */
    intercept(ctx, next) {
        return next.handle().pipe(
        // Transform the data using class-transformer's instanceToPlain
        (0, operators_1.map)((data) => (0, class_transformer_1.instanceToPlain)(data)), 
        // Catch and handle errors
        (0, operators_1.catchError)((error) => {
            // If it's a BadRequestException, return a new instance of BadRequestException
            if (error instanceof common_1.BadRequestException) {
                return (0, rxjs_1.of)(new common_1.BadRequestException(error.getResponse()));
            }
            // For other errors, return a new instance of HttpException
            return (0, rxjs_1.of)(new common_1.HttpException(error.message, error.status));
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
//# sourceMappingURL=transform.interceptor.js.map