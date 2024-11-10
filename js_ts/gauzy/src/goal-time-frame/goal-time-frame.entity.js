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
exports.GoalTimeFrame = void 0;
const index_1 = require("../../plugins/contracts/dist/index");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_goal_time_frame_repository_1 = require("./repository/mikro-orm-goal-time-frame.repository");
let GoalTimeFrame = exports.GoalTimeFrame = class GoalTimeFrame extends internal_1.TenantOrganizationBaseEntity {
    name;
    status;
    startDate;
    endDate;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], GoalTimeFrame.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.TimeFrameStatusEnum }),
    (0, class_validator_1.IsEnum)(index_1.TimeFrameStatusEnum),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], GoalTimeFrame.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], GoalTimeFrame.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Date }),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Date)
], GoalTimeFrame.prototype, "endDate", void 0);
exports.GoalTimeFrame = GoalTimeFrame = __decorate([
    (0, entity_1.MultiORMEntity)('goal_time_frame', { mikroOrmRepository: () => mikro_orm_goal_time_frame_repository_1.MikroOrmGoalTimeFrameRepository })
], GoalTimeFrame);
//# sourceMappingURL=goal-time-frame.entity.js.map