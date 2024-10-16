"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationTaskSettingDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../core/dto");
const organization_task_setting_entity_1 = require("./../organization-task-setting.entity");
class OrganizationTaskSettingDTO extends (0, swagger_1.IntersectionType)(dto_1.TenantOrganizationBaseDTO, (0, swagger_1.OmitType)(organization_task_setting_entity_1.OrganizationTaskSetting, ['organizationId', 'organization'])) {
}
exports.OrganizationTaskSettingDTO = OrganizationTaskSettingDTO;
//# sourceMappingURL=organization-task-setting.dto.js.map