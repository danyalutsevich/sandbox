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
exports.GithubAppInstallDTO = exports.GithubOAuthDTO = exports.GithubSetupActionEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("core/dto");
var GithubSetupActionEnum;
(function (GithubSetupActionEnum) {
    GithubSetupActionEnum["INSTALL"] = "install";
    GithubSetupActionEnum["UPDATE"] = "update";
})(GithubSetupActionEnum || (exports.GithubSetupActionEnum = GithubSetupActionEnum = {}));
class GithubOAuthDTO extends dto_1.TenantOrganizationBaseDTO {
    code;
}
exports.GithubOAuthDTO = GithubOAuthDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GithubOAuthDTO.prototype, "code", void 0);
class GithubAppInstallDTO {
    installation_id;
    setup_action;
}
exports.GithubAppInstallDTO = GithubAppInstallDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GithubAppInstallDTO.prototype, "installation_id", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => String }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(GithubSetupActionEnum),
    __metadata("design:type", String)
], GithubAppInstallDTO.prototype, "setup_action", void 0);
//# sourceMappingURL=github-app-install.dto.js.map