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
exports.EmployeeGetHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const employee_service_1 = require("../../employee.service");
const employee_get_command_1 = require("../employee.get.command");
let EmployeeGetHandler = exports.EmployeeGetHandler = class EmployeeGetHandler {
    employeeService;
    constructor(employeeService) {
        this.employeeService = employeeService;
    }
    /**
     * Executes the given command to retrieve an employee based on provided input.
     *
     * @param command The command containing the input to fetch an employee.
     * @returns A promise resolving to an IEmployee instance.
     */
    async execute(command) {
        const { input } = command;
        return await this.employeeService.findOneByOptions(input);
    }
};
exports.EmployeeGetHandler = EmployeeGetHandler = __decorate([
    (0, cqrs_1.CommandHandler)(employee_get_command_1.EmployeeGetCommand),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeGetHandler);
//# sourceMappingURL=employee.get.handler.js.map