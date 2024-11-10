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
exports.EstimateEmailController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const index_1 = require("../../plugins/common/dist/index");
const estimate_email_service_1 = require("./estimate-email.service");
const dto_1 = require("./dto");
let EstimateEmailController = exports.EstimateEmailController = class EstimateEmailController {
    estimateEmailService;
    constructor(estimateEmailService) {
        this.estimateEmailService = estimateEmailService;
    }
    /**
     * Validate estimate email request
     *
     * @param params
     * @returns
     */
    async validateEstimateEmail(params) {
        return await this.estimateEmailService.validate(params, params.relations);
    }
};
__decorate([
    (0, common_1.Get)('validate'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindEstimateEmailQueryDTO]),
    __metadata("design:returntype", Promise)
], EstimateEmailController.prototype, "validateEstimateEmail", null);
exports.EstimateEmailController = EstimateEmailController = __decorate([
    (0, swagger_1.ApiTags)('EstimateEmail'),
    (0, index_1.Public)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [estimate_email_service_1.EstimateEmailService])
], EstimateEmailController);
//# sourceMappingURL=estimate-email.controller.js.map