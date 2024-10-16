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
exports.RequestApprovalStatusHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const request_approval_status_command_1 = require("../request-approval.status.command");
const request_approval_service_1 = require("../../request-approval.service");
const equipment_sharing_1 = require("../../../equipment-sharing");
const index_1 = require("../../../../plugins/contracts/dist/index");
const time_off_request_service_1 = require("../../../time-off-request/time-off-request.service");
let RequestApprovalStatusHandler = exports.RequestApprovalStatusHandler = class RequestApprovalStatusHandler {
    requestApprovalService;
    equipmentSharingService;
    timeOffRequestService;
    constructor(requestApprovalService, equipmentSharingService, timeOffRequestService) {
        this.requestApprovalService = requestApprovalService;
        this.equipmentSharingService = equipmentSharingService;
        this.timeOffRequestService = timeOffRequestService;
    }
    async execute(command) {
        const { requestApprovalId, status } = command;
        const requestApproval = await this.requestApprovalService.updateStatusRequestApprovalByAdmin(requestApprovalId, status);
        if (requestApproval.requestType ===
            index_1.ApprovalPolicyTypesStringEnum.TIME_OFF) {
            const timeOffStatus = index_1.StatusTypesMapRequestApprovalEnum[status];
            await this.timeOffRequestService.updateStatusTimeOffByAdmin(requestApproval.requestId, timeOffStatus);
        }
        else if (requestApproval.requestType ===
            index_1.ApprovalPolicyTypesStringEnum.EQUIPMENT_SHARING) {
            await this.equipmentSharingService.updateStatusEquipmentSharingByAdmin(requestApproval.requestId, status);
        }
        return requestApproval;
    }
};
exports.RequestApprovalStatusHandler = RequestApprovalStatusHandler = __decorate([
    (0, cqrs_1.CommandHandler)(request_approval_status_command_1.RequestApprovalStatusCommand),
    __metadata("design:paramtypes", [request_approval_service_1.RequestApprovalService,
        equipment_sharing_1.EquipmentSharingService,
        time_off_request_service_1.TimeOffRequestService])
], RequestApprovalStatusHandler);
//# sourceMappingURL=request-approval.status.handler.js.map