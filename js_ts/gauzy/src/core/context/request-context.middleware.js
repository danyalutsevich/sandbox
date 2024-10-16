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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestContextMiddleware = void 0;
const common_1 = require("@nestjs/common");
const request_context_1 = require("./request-context");
const nestjs_cls_1 = require("nestjs-cls");
let RequestContextMiddleware = exports.RequestContextMiddleware = class RequestContextMiddleware {
    clsService;
    constructor(clsService) {
        this.clsService = clsService;
    }
    use(req, res, next) {
        this.clsService.run(() => {
            const context = new request_context_1.RequestContext({ req, res });
            this.clsService.set(request_context_1.RequestContext.name, context);
            const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            console.log(`Context ${context.id}. Request URL: ${fullUrl} started...`);
            // Capture the original res.end
            const originalEnd = res.end.bind(res);
            // Override res.end
            res.end = (...args) => {
                console.log(`Context ${context.id}. Request to ${fullUrl} completed.`);
                // Call the original res.end and return its result
                return originalEnd(...args);
            };
            next();
        });
    }
};
exports.RequestContextMiddleware = RequestContextMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService])
], RequestContextMiddleware);
//# sourceMappingURL=request-context.middleware.js.map