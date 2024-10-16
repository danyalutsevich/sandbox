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
exports.RequestApprovalEmployee = void 0;
/*
  - Request Approval Employee table is the third table which will combine the employee table and the request approval table.
  - Request Approval Employee table has the many to one relationship to the RequestApproval table and the Employee table by requestApprovalId and employeeId
*/
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_request_approval_employee_repository_1 = require("./repository/mikro-orm-request-approval-employee.repository");
let RequestApprovalEmployee = exports.RequestApprovalEmployee = class RequestApprovalEmployee extends internal_1.TenantOrganizationBaseEntity {
    status;
    requestApproval;
    requestApprovalId;
    employee;
    employeeId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", Number)
], RequestApprovalEmployee.prototype, "status", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.RequestApproval, (requestApproval) => requestApproval.employeeApprovals, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], RequestApprovalEmployee.prototype, "requestApproval", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.requestApproval),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], RequestApprovalEmployee.prototype, "requestApprovalId", void 0);
__decorate([
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (employee) => employee.requestApprovals, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], RequestApprovalEmployee.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], RequestApprovalEmployee.prototype, "employeeId", void 0);
exports.RequestApprovalEmployee = RequestApprovalEmployee = __decorate([
    (0, entity_1.MultiORMEntity)('request_approval_employee', { mikroOrmRepository: () => mikro_orm_request_approval_employee_repository_1.MikroOrmRequestApprovalEmployeeRepository })
], RequestApprovalEmployee);
//# sourceMappingURL=request-approval-employee.entity.js.map