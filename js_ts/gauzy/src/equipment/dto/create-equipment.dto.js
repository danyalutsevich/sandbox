"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEquipmentDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const dto_1 = require("./../../currency/dto");
const dto_2 = require("./../../tags/dto");
const equipment_dto_1 = require("./equipment.dto");
class CreateEquipmentDTO extends (0, mapped_types_1.IntersectionType)(equipment_dto_1.EquipmentDTO, dto_2.RelationalTagDTO, dto_1.RelationalCurrencyDTO) {
}
exports.CreateEquipmentDTO = CreateEquipmentDTO;
//# sourceMappingURL=create-equipment.dto.js.map