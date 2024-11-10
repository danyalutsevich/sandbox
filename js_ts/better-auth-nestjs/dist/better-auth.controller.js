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
import { All, Controller, Next, Req, Res } from '@nestjs/common';
import { BetterAuthService } from './better-auth.service.js';
import { toNestJsController } from './lib/auth.js';
let BetterAuthController = class BetterAuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async handleAuth(request, response, next) {
        try {
            return await toNestJsController(this.authService, request, response);
        }
        catch (error) {
            next(error);
        }
    }
};
__decorate([
    All('*'),
    __param(0, Req()),
    __param(1, Res()),
    __param(2, Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request,
        Response, Function]),
    __metadata("design:returntype", Promise)
], BetterAuthController.prototype, "handleAuth", null);
BetterAuthController = __decorate([
    Controller('/api/auth'),
    __metadata("design:paramtypes", [BetterAuthService])
], BetterAuthController);
export { BetterAuthController };
//# sourceMappingURL=better-auth.controller.js.map