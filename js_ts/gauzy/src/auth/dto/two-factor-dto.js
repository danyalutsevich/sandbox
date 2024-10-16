"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceSigninDTO = exports.WorkspaceSigninEmailVerifyDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../user/dto");
const include_teams_dto_1 = require("../../user/dto/include-teams.dto");
/**
 *
 */
class WorkspaceSigninEmailVerifyDTO extends (0, swagger_1.IntersectionType)(dto_1.UserEmailDTO, dto_1.UserCodeDTO, include_teams_dto_1.IncludeTeamsDTO) {
}
exports.WorkspaceSigninEmailVerifyDTO = WorkspaceSigninEmailVerifyDTO;
/**
 *
 */
class WorkspaceSigninDTO extends (0, swagger_1.IntersectionType)(dto_1.UserEmailDTO, dto_1.UserTokenDTO) {
}
exports.WorkspaceSigninDTO = WorkspaceSigninDTO;
//# sourceMappingURL=two-factor-dto.js.map