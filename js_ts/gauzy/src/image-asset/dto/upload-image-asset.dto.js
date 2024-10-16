"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadImageAsset = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../core/dto");
/**
 * Upload image asset request DTO validation
 */
class UploadImageAsset extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)((0, swagger_1.PickType)(dto_1.TenantOrganizationBaseDTO, ['tenantId', 'organizationId']))) {
}
exports.UploadImageAsset = UploadImageAsset;
//# sourceMappingURL=upload-image-asset.dto.js.map