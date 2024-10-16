"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateFeatureDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CandidateFeatureDTO {
    candidateId;
    candidate;
}
exports.CandidateFeatureDTO = CandidateFeatureDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, readOnly: true }),
    (0, class_validator_1.ValidateIf)((it) => !it.candidate || it.candidateId),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], CandidateFeatureDTO.prototype, "candidateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Object, readOnly: true }),
    (0, class_validator_1.ValidateIf)((it) => !it.candidateId || it.candidate),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CandidateFeatureDTO.prototype, "candidate", void 0);
//# sourceMappingURL=candidate-feature.dto.js.map