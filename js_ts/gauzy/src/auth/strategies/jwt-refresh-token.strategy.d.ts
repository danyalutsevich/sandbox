import { Strategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { UserService } from './../../user/user.service';
declare const JwtRefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshTokenStrategy extends JwtRefreshTokenStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    /**
     * Validates the refresh token and payload to ensure user authorization.
     *
     * @param request - The incoming request, expected to contain the refresh token in its body.
     * @param payload - The JWT payload to validate.
     * @param done - The callback function to be called upon validation completion.
     */
    validate(request: Request, payload: JwtPayload, done: Function): Promise<void>;
}
export {};
