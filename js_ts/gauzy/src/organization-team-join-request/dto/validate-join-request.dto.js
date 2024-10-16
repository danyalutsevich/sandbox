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
exports.ValidateJoinRequestDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("./../../constants");
const validators_1 = require("../../shared/validators");
const dto_1 = require("../../user/dto");
const organization_team_join_request_entity_1 = require("../organization-team-join-request.entity");
/**
 * Validate team join request DTO validation
 */
class ValidateJoinRequestDTO extends (0, swagger_1.IntersectionType)(dto_1.UserEmailDTO, (0, swagger_1.PickType)(organization_team_join_request_entity_1.OrganizationTeamJoinRequest, ['organizationTeamId'])) {
    code;
    token;
}
exports.ValidateJoinRequestDTO = ValidateJoinRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => !it.token),
    (0, class_validator_1.IsString)(),
    (0, validators_1.CustomLength)(constants_1.ALPHA_NUMERIC_CODE_LENGTH),
    __metadata("design:type", String)
], ValidateJoinRequestDTO.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.ValidateIf)((it) => !it.code),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ValidateJoinRequestDTO.prototype, "token", void 0);
//# sourceMappingURL=validate-join-request.dto.js.map