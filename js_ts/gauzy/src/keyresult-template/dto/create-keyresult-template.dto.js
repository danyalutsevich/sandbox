"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateKeyresultTemplateDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("goal-kpi-template/dto");
const dto_2 = require("goal-template/dto");
const keyresult_template_dto_1 = require("./keyresult-template.dto");
class CreateKeyresultTemplateDTO extends (0, mapped_types_1.IntersectionType)(keyresult_template_dto_1.KeyresultTemplateDTO, dto_2.RelationalGoalTemplateDTO, dto_1.RelationalGoalKpiTemplateDTO) {
}
exports.CreateKeyresultTemplateDTO = CreateKeyresultTemplateDTO;
//# sourceMappingURL=create-keyresult-template.dto.js.map