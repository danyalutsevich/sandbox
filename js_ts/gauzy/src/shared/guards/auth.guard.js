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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const passport_1 = require("@nestjs/passport");
const index_1 = require("../../../plugins/common/dist/index");
let AuthGuard = exports.AuthGuard = class AuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    _reflector;
    constructor(_reflector) {
        super();
        this._reflector = _reflector;
    }
    /**
     * Determines if the current request can be activated based on authorization and PUBLIC decorators.
     * @param context The execution context of the request.
     * @returns A boolean indicating whether access is allowed.
     */
    canActivate(context) {
        console.log('AuthGuard canActivate called');
        const request = context.switchToHttp().getRequest();
        // Allow preflight requests to pass without Auth
        if (request.method === 'OPTIONS') {
            return true;
        }
        // Check if the class has a PUBLIC decorator
        const isClassPublic = this._reflector.get(index_1.PUBLIC_METHOD_METADATA, context.getClass());
        // Check if the method has a PUBLIC decorator
        const isMethodPublic = this._reflector.get(index_1.PUBLIC_METHOD_METADATA, context.getHandler());
        // Allow access if the method or class has the PUBLIC decorator
        if (isClassPublic || isMethodPublic) {
            return true;
        }
        // For non-public methods or classes, check the authorization
        return super.canActivate(context);
    }
};
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map