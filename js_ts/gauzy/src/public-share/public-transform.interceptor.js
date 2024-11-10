"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicTransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
let PublicTransformInterceptor = exports.PublicTransformInterceptor = class PublicTransformInterceptor {
    intercept(ctx, next) {
        return next
            .handle()
            .pipe((0, operators_1.map)((data) => (0, class_transformer_1.instanceToPlain)(data)), (0, operators_1.catchError)((error) => {
            if (error instanceof common_1.BadRequestException) {
                return (0, rxjs_1.of)(new common_1.BadRequestException(error.getResponse()));
            }
            return (0, rxjs_1.of)(new common_1.HttpException(error.message, 404));
        }));
    }
};
exports.PublicTransformInterceptor = PublicTransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], PublicTransformInterceptor);
//# sourceMappingURL=public-transform.interceptor.js.map