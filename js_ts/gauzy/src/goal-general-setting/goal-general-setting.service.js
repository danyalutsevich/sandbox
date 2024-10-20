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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalGeneralSettingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const goal_general_setting_entity_1 = require("./goal-general-setting.entity");
const crud_1 = require("./../core/crud");
const mikro_orm_goal_general_setting_repository_1 = require("./repository/mikro-orm-goal-general-setting.repository");
const type_orm_goal_general_setting_repository_1 = require("./repository/type-orm-goal-general-setting.repository");
let GoalGeneralSettingService = exports.GoalGeneralSettingService = class GoalGeneralSettingService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmGoalGeneralSettingRepository, mikroOrmGoalGeneralSettingRepository) {
        super(typeOrmGoalGeneralSettingRepository, mikroOrmGoalGeneralSettingRepository);
    }
};
exports.GoalGeneralSettingService = GoalGeneralSettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(goal_general_setting_entity_1.GoalGeneralSetting)),
    __metadata("design:paramtypes", [type_orm_goal_general_setting_repository_1.TypeOrmGoalGeneralSettingRepository,
        mikro_orm_goal_general_setting_repository_1.MikroOrmGoalGeneralSettingRepository])
], GoalGeneralSettingService);
//# sourceMappingURL=goal-general-setting.service.js.map