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
exports.AppointmentEmployeesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tenant_aware_crud_service_1 = require("./../core/crud/tenant-aware-crud.service");
const type_orm_appointment_employee_repository_1 = require("./repository/type-orm-appointment-employee.repository");
const mikro_orm_appointment_employee_repository_1 = require("./repository/mikro-orm-appointment-employee.repository");
const appointment_employees_entity_1 = require("./appointment-employees.entity");
let AppointmentEmployeesService = exports.AppointmentEmployeesService = class AppointmentEmployeesService extends tenant_aware_crud_service_1.TenantAwareCrudService {
    constructor(typeOrmAppointmentEmployeeRepository, mikroOrmAppointmentEmployeeRepository) {
        super(typeOrmAppointmentEmployeeRepository, mikroOrmAppointmentEmployeeRepository);
    }
};
exports.AppointmentEmployeesService = AppointmentEmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_employees_entity_1.AppointmentEmployee)),
    __metadata("design:paramtypes", [type_orm_appointment_employee_repository_1.TypeOrmAppointmentEmployeeRepository,
        mikro_orm_appointment_employee_repository_1.MikroOrmAppointmentEmployeeRepository])
], AppointmentEmployeesService);
//# sourceMappingURL=appointment-employees.service.js.map