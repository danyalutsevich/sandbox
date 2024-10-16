"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagQueryByLevelDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../core/dto");
const dto_2 = require("shared/dto");
class TagQueryByLevelDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), dto_2.RelationsQueryDTO) {
}
exports.TagQueryByLevelDTO = TagQueryByLevelDTO;
//# sourceMappingURL=tag-query-by-level.dto.js.map