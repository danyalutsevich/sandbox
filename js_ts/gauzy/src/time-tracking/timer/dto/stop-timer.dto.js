"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopTimerDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const start_timer_dto_1 = require("./start-timer.dto");
class StopTimerDTO extends (0, swagger_1.IntersectionType)(start_timer_dto_1.StartTimerDTO, (0, swagger_1.PartialType)((0, swagger_1.PickType)(start_timer_dto_1.StartTimerDTO, ['source', 'logType']))) {
}
exports.StopTimerDTO = StopTimerDTO;
//# sourceMappingURL=stop-timer.dto.js.map