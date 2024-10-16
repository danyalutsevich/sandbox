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
exports.EmployeeAppointmentController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const nestjs_i18n_1 = require("nestjs-i18n");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../../plugins/contracts/dist/index");
const employee_appointment_service_1 = require("./employee-appointment.service");
const commands_1 = require("./commands");
const employee_appointment_entity_1 = require("./employee-appointment.entity");
const pipes_1 = require("./../shared/pipes");
const guards_1 = require("./../shared/guards");
const crud_1 = require("./../core/crud");
let EmployeeAppointmentController = exports.EmployeeAppointmentController = class EmployeeAppointmentController extends crud_1.CrudController {
    employeeAppointmentService;
    commandBus;
    constructor(employeeAppointmentService, commandBus) {
        super(employeeAppointmentService);
        this.employeeAppointmentService = employeeAppointmentService;
        this.commandBus = commandBus;
    }
    /**
     * GET sign appointment
     *
     * @param id
     * @returns
     */
    async signAppointment(id) {
        return this.employeeAppointmentService.signAppointmentId(id);
    }
    /**
     * GET verify token
     *
     * @param token
     * @returns
     */
    async decodeToken(token) {
        const decoded = this.employeeAppointmentService.decode(token);
        return decoded['appointmentId'];
    }
    /**
     * GET employee appointment by pagination
     *
     * @param filter
     * @returns
     */
    async pagination(filter) {
        return this.employeeAppointmentService.paginate(filter);
    }
    /**
     * GET all employee appointments
     *
     * @param data
     * @returns
     */
    async findAll(data) {
        const { relations, findInput } = data;
        return this.employeeAppointmentService.findAll({
            where: findInput,
            relations
        });
    }
    /**
     * GET employee appointment by id
     *
     * @param id
     * @returns
     */
    async findById(id) {
        return this.employeeAppointmentService.findOneByIdString(id);
    }
    /**
     * CREATE employee create
     *
     * @param entity
     * @param languageCode
     * @returns
     */
    async create(entity, languageCode) {
        return await this.commandBus.execute(new commands_1.EmployeeAppointmentCreateCommand(entity, languageCode));
    }
    /**
     * UPDATE employee appointment
     *
     * @param id
     * @param entity
     * @returns
     */
    async update(id, entity) {
        return await this.commandBus.execute(new commands_1.EmployeeAppointmentUpdateCommand(id, entity));
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Sign appointment id payload' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Token generated',
        type: String
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.EXPECTATION_FAILED,
        description: 'Token generation failure'
    }),
    (0, common_1.Get)('sign/:id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeAppointmentController.prototype, "signAppointment", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Verify token' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Token verified',
        type: String
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.EXPECTATION_FAILED,
        description: 'Token verification failure'
    }),
    (0, common_1.Get)('decode/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeAppointmentController.prototype, "decodeToken", null);
__decorate([
    (0, common_1.Get)('pagination'),
    (0, pipes_1.UseValidationPipe)({ transform: true }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crud_1.PaginationParams]),
    __metadata("design:returntype", Promise)
], EmployeeAppointmentController.prototype, "pagination", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Find all employee appointments'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found employee appointments',
        type: employee_appointment_entity_1.EmployeeAppointment
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('data', pipes_1.ParseJsonPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeAppointmentController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Find Employee appointment by id.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Found one record',
        type: employee_appointment_entity_1.EmployeeAppointment
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeAppointmentController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create new record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully created.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, nestjs_i18n_1.I18nLang)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EmployeeAppointmentController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing record' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'The record has been successfully edited.'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: 'Record not found'
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input, The response body may contain clues as to what went wrong'
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.ACCEPTED),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', pipes_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EmployeeAppointmentController.prototype, "update", null);
exports.EmployeeAppointmentController = EmployeeAppointmentController = __decorate([
    (0, swagger_1.ApiTags)('EmployeeAppointment'),
    (0, common_1.UseGuards)(guards_1.TenantPermissionGuard),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [employee_appointment_service_1.EmployeeAppointmentService,
        cqrs_1.CommandBus])
], EmployeeAppointmentController);
//# sourceMappingURL=employee-appointment.controller.js.map