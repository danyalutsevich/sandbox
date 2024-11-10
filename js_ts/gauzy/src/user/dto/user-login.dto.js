"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSigninWorkspaceDTO = exports.UserLoginDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_email_dto_1 = require("./user-email.dto");
const user_password_dto_1 = require("./user-password.dto");
const include_teams_dto_1 = require("./include-teams.dto");
/**
 * User login DTO validation
 */
class UserLoginDTO extends (0, swagger_1.IntersectionType)(user_email_dto_1.UserEmailDTO, user_password_dto_1.UserPasswordDTO) {
}
exports.UserLoginDTO = UserLoginDTO;
/**
 * User SignIn Workspace DTO validation
 */
class UserSigninWorkspaceDTO extends (0, swagger_1.IntersectionType)(UserLoginDTO, include_teams_dto_1.IncludeTeamsDTO) {
}
exports.UserSigninWorkspaceDTO = UserSigninWorkspaceDTO;
//# sourceMappingURL=user-login.dto.js.map