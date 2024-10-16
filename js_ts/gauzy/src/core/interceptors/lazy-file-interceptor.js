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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazyFileInterceptor = void 0;
const common_1 = require("@nestjs/common");
const files_constants_1 = require("@nestjs/platform-express/multer/files.constants");
const multer_utils_1 = require("@nestjs/platform-express/multer/multer/multer.utils");
const multer = __importStar(require("multer"));
function LazyFileInterceptor(fieldName, localOptions) {
    let MixinInterceptor = class MixinInterceptor {
        options;
        multer;
        constructor(options = {}) {
            this.options = options;
        }
        async intercept(context, next) {
            const ctx = context.switchToHttp();
            const storage = localOptions.storage(context);
            this.multer = multer({
                ...this.options,
                ...{
                    storage
                }
            });
            await new Promise((resolve, reject) => this.multer.single(fieldName)(ctx.getRequest(), ctx.getResponse(), (err) => {
                if (err) {
                    const error = (0, multer_utils_1.transformException)(err);
                    console.log('Error while uploading file using multer', err);
                    return reject(error);
                }
                resolve();
            }));
            return next.handle();
        }
    };
    MixinInterceptor = __decorate([
        __param(0, (0, common_1.Optional)()),
        __param(0, (0, common_1.Inject)(files_constants_1.MULTER_MODULE_OPTIONS)),
        __metadata("design:paramtypes", [Object])
    ], MixinInterceptor);
    const Interceptor = (0, common_1.mixin)(MixinInterceptor);
    return Interceptor;
}
exports.LazyFileInterceptor = LazyFileInterceptor;
//# sourceMappingURL=lazy-file-interceptor.js.map