"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CandidateCriterionsRatingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CandidateCriterionsRatingModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const candidate_criterion_rating_entity_1 = require("./candidate-criterion-rating.entity");
const candidate_criterion_rating_service_1 = require("./candidate-criterion-rating.service");
const candidate_criterion_rating_controller_1 = require("./candidate-criterion-rating.controller");
const handlers_1 = require("./commands/handlers");
let CandidateCriterionsRatingModule = exports.CandidateCriterionsRatingModule = CandidateCriterionsRatingModule_1 = class CandidateCriterionsRatingModule {
};
exports.CandidateCriterionsRatingModule = CandidateCriterionsRatingModule = CandidateCriterionsRatingModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([
                {
                    path: '/candidate-criterions-rating',
                    module: CandidateCriterionsRatingModule_1
                }
            ]),
            typeorm_1.TypeOrmModule.forFeature([candidate_criterion_rating_entity_1.CandidateCriterionsRating]),
            nestjs_1.MikroOrmModule.forFeature([candidate_criterion_rating_entity_1.CandidateCriterionsRating]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        providers: [candidate_criterion_rating_service_1.CandidateCriterionsRatingService, ...handlers_1.CommandHandlers],
        controllers: [candidate_criterion_rating_controller_1.CandidateCriterionsRatingController],
        exports: [candidate_criterion_rating_service_1.CandidateCriterionsRatingService]
    })
], CandidateCriterionsRatingModule);
//# sourceMappingURL=candidate-criterion-rating.module.js.map