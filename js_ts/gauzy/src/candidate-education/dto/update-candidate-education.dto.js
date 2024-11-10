"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCandidateEducationDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_candidate_education_dto_1 = require("./create-candidate-education.dto");
class UpdateCandidateEducationDTO extends (0, swagger_1.OmitType)(create_candidate_education_dto_1.CreateCandidateEducationDTO, ['candidate', 'candidateId']) {
}
exports.UpdateCandidateEducationDTO = UpdateCandidateEducationDTO;
//# sourceMappingURL=update-candidate-education.dto.js.map