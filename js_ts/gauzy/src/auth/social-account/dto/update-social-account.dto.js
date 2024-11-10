"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSocialAccountDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../core/dto");
const create_social_account_dto_1 = require("./create-social-account.dto");
/**
 * Update Social Account DTO Validation
 */
class UpdateSocialAccountDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantBaseDTO, (0, swagger_1.PartialType)((0, swagger_1.PickType)(create_social_account_dto_1.CreateSocialAccountDTO, ['providerAccountId']))) {
}
exports.UpdateSocialAccountDTO = UpdateSocialAccountDTO;
//# sourceMappingURL=update-social-account.dto.js.map