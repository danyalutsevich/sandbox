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
exports.AppointmentEmployee = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_appointment_employee_repository_1 = require("./repository/mikro-orm-appointment-employee.repository");
let AppointmentEmployee = exports.AppointmentEmployee = class AppointmentEmployee extends internal_1.TenantOrganizationBaseEntity {
    appointmentId;
    /**
     * Employee
     */
    employee;
    employeeId;
    /**
     * EmployeeAppointment
     */
    employeeAppointment;
    employeeAppointmentId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], AppointmentEmployee.prototype, "appointmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], AppointmentEmployee.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], AppointmentEmployee.prototype, "employeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.EmployeeAppointment }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.EmployeeAppointment, (employeeAppointment) => employeeAppointment?.invitees, {
        onDelete: 'SET NULL'
    }),
    __metadata("design:type", Object)
], AppointmentEmployee.prototype, "employeeAppointment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employeeAppointment),
    (0, class_validator_1.IsString)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ nullable: true, relationId: true }),
    __metadata("design:type", String)
], AppointmentEmployee.prototype, "employeeAppointmentId", void 0);
exports.AppointmentEmployee = AppointmentEmployee = __decorate([
    (0, entity_1.MultiORMEntity)('appointment_employee', { mikroOrmRepository: () => mikro_orm_appointment_employee_repository_1.MikroOrmAppointmentEmployeeRepository })
], AppointmentEmployee);
//# sourceMappingURL=appointment-employees.entity.js.map