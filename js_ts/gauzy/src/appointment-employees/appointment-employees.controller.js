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
exports.AppointmentEmployeesController = void 0;
const crud_1 = require("./../core/crud");
const appointment_employees_entity_1 = require("./appointment-employees.entity");
const appointment_employees_service_1 = require("./appointment-employees.service");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
let AppointmentEmployeesController = exports.AppointmentEmployeesController = class AppointmentEmployeesController extends crud_1.CrudController {
    appointmentEmployeesService;
    constructor(appointmentEmployeesService) {
        super(appointmentEmployeesService);
        this.appointmentEmployeesService = appointmentEmployeesService;
    }
    async findByAppointmentId(appointmentId) {
        return (await this.appointmentEmployeesService.findAll({
            where: {
                appointmentId
            }
        })).items;
    }
    async findEmployeeAppointments(employeeId) {
        return (await this.appointmentEmployeesService.findAll({
            where: {
                employeeId: employeeId
            },
            relations: ['employeeAppointment']
        })).items;
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find appointment employees by appointment id.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found one record',
        type: appointment_employees_entity_1.AppointmentEmployee
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)('appointment/:appointmentId'),
    __param(0, (0, common_1.Param)('appointmentId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentEmployeesController.prototype, "findByAppointmentId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find appointments based on employee id.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found records',
        type: appointment_employees_entity_1.AppointmentEmployee
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Records not found'
    }),
    (0, common_1.Get)('employee-appointments/:employeeId'),
    __param(0, (0, common_1.Param)('employeeId', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AppointmentEmployeesController.prototype, "findEmployeeAppointments", null);
exports.AppointmentEmployeesController = AppointmentEmployeesController = __decorate([
    (0, swagger_1.ApiTags)('AppointmentEmployee'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [appointment_employees_service_1.AppointmentEmployeesService])
], AppointmentEmployeesController);
//# sourceMappingURL=appointment-employees.controller.js.map