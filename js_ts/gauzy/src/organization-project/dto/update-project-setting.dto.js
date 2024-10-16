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
exports.UpdateProjectSettingDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../core/dto");
class UpdateProjectSettingDTO extends dto_1.TenantOrganizationBaseDTO {
    // External repository ID property
    repositoryId;
    // Auto-sync tasks property
    isTasksAutoSync;
    // Auto-sync on label property
    isTasksAutoSyncOnLabel;
    // Auto-sync tasks label property
    syncTag;
}
exports.UpdateProjectSettingDTO = UpdateProjectSettingDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateProjectSettingDTO.prototype, "repositoryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectSettingDTO.prototype, "isTasksAutoSync", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateProjectSettingDTO.prototype, "isTasksAutoSyncOnLabel", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: String }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProjectSettingDTO.prototype, "syncTag", void 0);
//# sourceMappingURL=update-project-setting.dto.js.map