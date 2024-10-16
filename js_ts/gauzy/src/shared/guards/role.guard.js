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
exports.RoleGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const index_1 = require("../../../plugins/common/dist/index");
const context_1 = require("./../../core/context");
let RoleGuard = exports.RoleGuard = class RoleGuard {
    _reflector;
    constructor(_reflector) {
        this._reflector = _reflector;
    }
    /**
     * Determines if the user associated with the request has the required roles.
     * @param context The execution context of the request.
     * @returns A boolean indicating whether the user has the required roles.
     */
    async canActivate(context) {
        console.log('RoleGuard canActivate called');
        // Retrieve permissions from metadata
        const targets = [context.getHandler(), context.getClass()];
        /*
         * Retrieve metadata for a specified key for a specified set of roles
         */
        const roles = this._reflector.getAllAndOverride(index_1.ROLES_METADATA, targets) || [];
        // Check if roles are empty or if the request context has the required roles
        const check = (0, index_1.isEmpty)(roles) || context_1.RequestContext.hasRoles(roles);
        console.log('Guard: Role', roles, check);
        return check;
    }
};
exports.RoleGuard = RoleGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RoleGuard);
//# sourceMappingURL=role.guard.js.map