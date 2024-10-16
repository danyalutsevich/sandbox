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
exports.EmployeeBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const employee_bulk_create_command_1 = require("../employee.bulk.create.command");
const employee_create_command_1 = require("../employee.create.command");
let EmployeeBulkCreateHandler = exports.EmployeeBulkCreateHandler = class EmployeeBulkCreateHandler {
    commandBus;
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async execute(command) {
        try {
            const { input, languageCode, originUrl } = command;
            return await Promise.all(input.map(async (entity) => {
                return await this.commandBus.execute(new employee_create_command_1.EmployeeCreateCommand(entity, languageCode, originUrl));
            }));
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.EmployeeBulkCreateHandler = EmployeeBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(employee_bulk_create_command_1.EmployeeBulkCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], EmployeeBulkCreateHandler);
//# sourceMappingURL=employee.bulk.create.handler.js.map