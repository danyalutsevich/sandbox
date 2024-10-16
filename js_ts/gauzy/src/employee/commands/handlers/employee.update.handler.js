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
exports.EmployeeUpdateHandler = void 0;
const index_1 = require("../../../../plugins/contracts/dist/index");
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const employee_update_command_1 = require("./../employee.update.command");
const employee_service_1 = require("./../../employee.service");
const context_1 = require("./../../../core/context");
let EmployeeUpdateHandler = exports.EmployeeUpdateHandler = class EmployeeUpdateHandler {
    _employeeService;
    constructor(_employeeService) {
        this._employeeService = _employeeService;
    }
    async execute(command) {
        const { id, input } = command;
        /**
         * If user/employee has only own profile edit permission
         */
        if (context_1.RequestContext.hasPermission(index_1.PermissionsEnum.PROFILE_EDIT) &&
            !context_1.RequestContext.hasPermission(index_1.PermissionsEnum.ORG_EMPLOYEES_EDIT)) {
            const user = context_1.RequestContext.currentUser();
            if (user.employeeId !== id) {
                throw new common_1.ForbiddenException();
            }
        }
        try {
            //We are using create here because create calls the method save()
            //We need save() to save ManyToMany relations
            return await this._employeeService.create({
                ...input,
                upworkId: input.upworkId || null,
                linkedInId: input.linkedInId || null,
                id
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.EmployeeUpdateHandler = EmployeeUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(employee_update_command_1.EmployeeUpdateCommand),
    __metadata("design:paramtypes", [employee_service_1.EmployeeService])
], EmployeeUpdateHandler);
//# sourceMappingURL=employee.update.handler.js.map