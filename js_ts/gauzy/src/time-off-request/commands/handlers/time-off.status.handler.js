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
exports.TimeOffStatusHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../../plugins/contracts/dist/index");
const time_off_status_command_1 = require("../time-off.status.command");
const time_off_request_entity_1 = require("../../time-off-request.entity");
const request_approval_entity_1 = require("../../../request-approval/request-approval.entity");
const type_orm_time_off_request_repository_1 = require("../../repository/type-orm-time-off-request.repository");
const type_orm_request_approval_repository_1 = require("../../../request-approval/repository/type-orm-request-approval.repository");
let TimeOffStatusHandler = exports.TimeOffStatusHandler = class TimeOffStatusHandler {
    typeOrmTimeOffRequestRepository;
    typeOrmRequestApprovalRepository;
    constructor(typeOrmTimeOffRequestRepository, typeOrmRequestApprovalRepository) {
        this.typeOrmTimeOffRequestRepository = typeOrmTimeOffRequestRepository;
        this.typeOrmRequestApprovalRepository = typeOrmRequestApprovalRepository;
    }
    async execute(command) {
        const { id, status } = command;
        const [timeOffRequest, requestApproval] = await Promise.all([
            await this.typeOrmTimeOffRequestRepository.findOneBy({ id }),
            await this.typeOrmRequestApprovalRepository.findOneBy({
                requestId: id
            })
        ]);
        if (!timeOffRequest) {
            throw new common_1.NotFoundException('Request time off not found');
        }
        timeOffRequest.status = status;
        if (requestApproval) {
            requestApproval.status = index_1.StatusTypesMapRequestApprovalEnum[status];
            await this.typeOrmRequestApprovalRepository.save(requestApproval);
        }
        return await this.typeOrmTimeOffRequestRepository.save(timeOffRequest);
    }
};
exports.TimeOffStatusHandler = TimeOffStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(time_off_status_command_1.TimeOffStatusCommand),
    __param(0, (0, typeorm_1.InjectRepository)(time_off_request_entity_1.TimeOffRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(request_approval_entity_1.RequestApproval)),
    __metadata("design:paramtypes", [type_orm_time_off_request_repository_1.TypeOrmTimeOffRequestRepository,
        type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository])
], TimeOffStatusHandler);
//# sourceMappingURL=time-off.status.handler.js.map