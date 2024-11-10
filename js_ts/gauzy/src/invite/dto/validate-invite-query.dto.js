"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateInviteQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../user/dto");
/**
 * Invite validate DTO request validation
 */
class ValidateInviteQueryDTO extends (0, swagger_1.IntersectionType)(dto_1.UserEmailDTO, dto_1.UserTokenDTO) {
}
exports.ValidateInviteQueryDTO = ValidateInviteQueryDTO;
//# sourceMappingURL=validate-invite-query.dto.js.map