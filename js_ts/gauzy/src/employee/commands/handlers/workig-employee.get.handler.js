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
exports.WorkingEmployeeGetHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const employee_service_1 = require("../../employee.service");
const working_employee_get_command_1 = require("./../working-employee.get.command");
let WorkingEmployeeGetHandler = exports.WorkingEmployeeGetHandler = class WorkingEmployeeGetHandler {
    employeeService;
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    async execute(command) {
        const { input } = command;
        const { organizationId = null, forRange, withUser } = input;
        return await this.employeeService.findWorkingEmployees(organizationId, forRange, withUser);
    }
};
exports.WorkingEmployeeGetHandler = WorkingEmployeeGetHandler = __decorate([
    (0, cqrs_1.CommandHandler)(working_employee_get_command_1.WorkingEmployeeGetCommand),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], WorkingEmployeeGetHandler);
//# sourceMappingURL=workig-employee.get.handler.js.map