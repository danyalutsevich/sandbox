"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../../plugins/config");
const context_1 = require("./../../core/context");
let SerializerInterceptor = exports.SerializerInterceptor = class SerializerInterceptor extends common_1.ClassSerializerInterceptor {
    intercept(ctx, next) {
        const token = context_1.RequestContext.currentToken();
        const { role } = (0, jsonwebtoken_1.verify)(token, config_1.environment.JWT_SECRET);
        return next
            .handle()
            .pipe((0, operators_1.map)((data) => (0, class_transformer_1.instanceToPlain)(data, { groups: [role] })));
    }
};
exports.SerializerInterceptor = SerializerInterceptor = __decorate([
    (0, common_1.Injectable)()
], SerializerInterceptor);
//# sourceMappingURL=serializer.interceptor.js.map