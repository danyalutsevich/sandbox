"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestApprovalTeamModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const request_approval_team_entity_1 = require("./request-approval-team.entity");
const nestjs_1 = require("@mikro-orm/nestjs");
let RequestApprovalTeamModule = exports.RequestApprovalTeamModule = class RequestApprovalTeamModule {
};
exports.RequestApprovalTeamModule = RequestApprovalTeamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([request_approval_team_entity_1.RequestApprovalTeam]),
            nestjs_1.MikroOrmModule.forFeature([request_approval_team_entity_1.RequestApprovalTeam]),
        ]
    })
], RequestApprovalTeamModule);
//# sourceMappingURL=request-approval-team.module.js.map