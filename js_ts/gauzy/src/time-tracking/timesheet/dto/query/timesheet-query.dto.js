"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../../../shared/dto");
/**
 * Get timesheet request DTO validation
 */
class TimesheetQueryDTO extends (0, swagger_1.IntersectionType)(dto_1.RelationsQueryDTO, dto_1.SelectorsQueryDTO) {
}
exports.TimesheetQueryDTO = TimesheetQueryDTO;
//# sourceMappingURL=timesheet-query.dto.js.map