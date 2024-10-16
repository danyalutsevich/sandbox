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
exports.JwtRefreshTokenStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const index_1 = require("../../../plugins/config/dist/index");
const user_service_1 = require("./../../user/user.service");
let JwtRefreshTokenStrategy = exports.JwtRefreshTokenStrategy = class JwtRefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    userService;
    constructor(userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromBodyField('refresh_token'),
            secretOrKey: index_1.environment.JWT_REFRESH_TOKEN_SECRET,
            passReqToCallback: true,
            ignoreExpiration: false
        });
        this.userService = userService;
    }
    /**
     * Validates the refresh token and payload to ensure user authorization.
     *
     * @param request - The incoming request, expected to contain the refresh token in its body.
     * @param payload - The JWT payload to validate.
     * @param done - The callback function to be called upon validation completion.
     */
    async validate(request, payload, done) {
        try {
            const { refresh_token } = request.body; // Extract the refresh token
            // Validate the user using the refresh token and JWT payload
            const user = await this.userService.getUserIfRefreshTokenMatches(refresh_token, payload);
            if (!user) {
                return done(new common_1.UnauthorizedException('Unauthorized'), false); // Return unauthorized if validation fails
            }
            done(null, user); // Return user if validation is successful
        }
        catch (err) {
            // Handle errors and provide a meaningful response
            return done(new common_1.UnauthorizedException('Unauthorized', err.message), false);
        }
    }
};
exports.JwtRefreshTokenStrategy = JwtRefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], JwtRefreshTokenStrategy);
//# sourceMappingURL=jwt-refresh-token.strategy.js.map