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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const index_1 = require("../../../plugins/config/dist/index");
const auth_service_1 = require("../auth.service");
const employee_service_1 = require("../../employee/employee.service");
let JwtStrategy = exports.JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt') {
    _authService;
    _employeeService;
    loggingEnabled = false;
    constructor(_authService, _employeeService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: index_1.environment.JWT_SECRET
        });
        this._authService = _authService;
        this._employeeService = _employeeService;
    }
    /**
     * Validates the JWT payload.
     * @param {JwtPayload} payload - The JWT payload to validate.
     * @param {Function} done - The callback function to call when validation is complete.
     * @returns {void}
     */
    async validate(payload, done) {
        try {
            const { id, thirdPartyId, employeeId } = payload;
            if (this.loggingEnabled)
                console.log('Validate JWT payload:', payload);
            // We use this to also attach the user object to the request context.
            const user = await this._authService.getAuthenticatedUser(id, thirdPartyId);
            if (!user) {
                return done(new common_1.UnauthorizedException('unauthorized'), false);
            }
            else {
                // Check if employeeId exists in payload
                if (employeeId) {
                    // Retrieve employee details associated with the user
                    const employee = await this._employeeService.findOneByUserId(user.id);
                    // Check if the employeeId from payload matches the employeeId retrieved
                    if (!employee || payload.employeeId !== employee.id) {
                        return done(new common_1.UnauthorizedException('unauthorized'), false);
                    }
                    // Assign employeeId to user if employee is found, otherwise assign null
                    user.employeeId = employee.id;
                }
                // You could add a function to the authService to verify the claims of the token:
                // i.e. does the user still have the roles that are claimed by the token
                // const validClaims = await this.authService.verifyTokenClaims(payload);
                // if (!validClaims) {
                // 	return done(new UnauthorizedException('invalid token claims'), false);
                // }
                done(null, user);
            }
        }
        catch (error) {
            console.error('Error occurred during JWT validation:', error);
            return done(new common_1.UnauthorizedException('unauthorized', error.message), false);
        }
    }
};
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService, employee_service_1.EmployeeService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map