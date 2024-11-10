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
exports.GoalTimeFrameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const goal_time_frame_entity_1 = require("./goal-time-frame.entity");
const crud_1 = require("./../core/crud");
const mikro_orm_goal_time_frame_repository_1 = require("./repository/mikro-orm-goal-time-frame.repository");
const type_orm_goal_time_frame_repository_1 = require("./repository/type-orm-goal-time-frame.repository");
let GoalTimeFrameService = exports.GoalTimeFrameService = class GoalTimeFrameService extends crud_1.TenantAwareCrudService {
    constructor(typeOrmGoalTimeFrameRepository, mikroOrmGoalTimeFrameRepository) {
        super(typeOrmGoalTimeFrameRepository, mikroOrmGoalTimeFrameRepository);
    }
};
exports.GoalTimeFrameService = GoalTimeFrameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(goal_time_frame_entity_1.GoalTimeFrame)),
    __metadata("design:paramtypes", [type_orm_goal_time_frame_repository_1.TypeOrmGoalTimeFrameRepository,
        mikro_orm_goal_time_frame_repository_1.MikroOrmGoalTimeFrameRepository])
], GoalTimeFrameService);
//# sourceMappingURL=goal-time-frame.service.js.map