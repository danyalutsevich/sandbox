"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestApprovalEmployeeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const request_approval_employee_entity_1 = require("./request-approval-employee.entity");
const nestjs_1 = require("@mikro-orm/nestjs");
let RequestApprovalEmployeeModule = exports.RequestApprovalEmployeeModule = class RequestApprovalEmployeeModule {
};
exports.RequestApprovalEmployeeModule = RequestApprovalEmployeeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([request_approval_employee_entity_1.RequestApprovalEmployee]),
            nestjs_1.MikroOrmModule.forFeature([request_approval_employee_entity_1.RequestApprovalEmployee]),
        ]
    })
], RequestApprovalEmployeeModule);
//# sourceMappingURL=request-approval-employee.module.js.map