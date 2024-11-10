import { Strategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import { AuthService } from '../auth.service';
import { EmployeeService } from '../../employee/employee.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _authService;
    private readonly _employeeService;
    loggingEnabled: boolean;
    constructor(_authService: AuthService, _employeeService: EmployeeService);
    /**
     * Validates the JWT payload.
     * @param {JwtPayload} payload - The JWT payload to validate.
     * @param {Function} done - The callback function to call when validation is complete.
     * @returns {void}
     */
    validate(payload: JwtPayload, done: Function): Promise<void>;
}
export {};
