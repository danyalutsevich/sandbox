"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentReportQueryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("./../../../shared/dto");
const query_1 = require("time-tracking/time-log/dto/query");
/**
 * Get payment report request DTO validation
 */
class PaymentReportQueryDTO extends (0, swagger_1.IntersectionType)((0, swagger_1.IntersectionType)(dto_1.SelectorsQueryDTO, dto_1.RelationsQueryDTO), (0, swagger_1.PickType)(query_1.TimeLogQueryDTO, ['timeZone', 'groupBy'])) {
}
exports.PaymentReportQueryDTO = PaymentReportQueryDTO;
//# sourceMappingURL=payment-report-query.dto.js.map