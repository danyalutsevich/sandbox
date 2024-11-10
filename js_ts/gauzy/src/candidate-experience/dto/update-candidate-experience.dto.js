"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCandidateExperienceDTO = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_candidate_experience_dto_1 = require("./create-candidate-experience.dto");
/**
 * UPDATE candidate experience DTO request validation
 *
 */
class UpdateCandidateExperienceDTO extends (0, mapped_types_1.OmitType)(create_candidate_experience_dto_1.CreateCandidateExperienceDTO, [
    'candidate',
    'candidateId'
]) {
}
exports.UpdateCandidateExperienceDTO = UpdateCandidateExperienceDTO;
//# sourceMappingURL=update-candidate-experience.dto.js.map