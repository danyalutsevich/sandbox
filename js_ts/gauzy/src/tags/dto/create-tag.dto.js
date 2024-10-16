"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTagDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../core/dto");
const tag_entity_1 = require("./../tag.entity");
class CreateTagDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.PartialType)(dto_1.TenantOrganizationBaseDTO), (0, swagger_1.PickType)(tag_entity_1.Tag, ['name', 'description', 'color', 'textColor', 'icon', 'organizationTeamId'])) {
}
exports.CreateTagDTO = CreateTagDTO;
//# sourceMappingURL=create-tag.dto.js.map