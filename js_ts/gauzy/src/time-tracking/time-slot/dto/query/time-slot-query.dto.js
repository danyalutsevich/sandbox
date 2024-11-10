"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSlotQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
;
const dto_1 = require("./../../../../shared/dto");
/**
 * Get time slot request DTO validation
 */
class TimeSlotQueryDTO extends (0, swagger_1.IntersectionType)(dto_1.FiltersQueryDTO, (0, swagger_1.IntersectionType)(dto_1.RelationsQueryDTO, dto_1.SelectorsQueryDTO)) {
}
exports.TimeSlotQueryDTO = TimeSlotQueryDTO;
//# sourceMappingURL=time-slot-query.dto.js.map