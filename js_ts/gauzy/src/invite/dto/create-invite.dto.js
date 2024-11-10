"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInviteDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../role/dto");
const invite_dto_1 = require("./invite.dto");
/**
 * Create Invite DTO validation
 */
class CreateInviteDTO extends (0, swagger_1.IntersectionType)(invite_dto_1.InviteDTO, dto_1.RoleFeatureDTO) {
}
exports.CreateInviteDTO = CreateInviteDTO;
//# sourceMappingURL=create-invite.dto.js.map