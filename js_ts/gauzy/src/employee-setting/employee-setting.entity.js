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
exports.EmployeeSetting = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const index_1 = require("../../plugins/contracts/dist/index");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_employee_setting_repository_1 = require("./repository/mikro-orm-employee-setting.repository");
let EmployeeSetting = exports.EmployeeSetting = class EmployeeSetting extends internal_1.TenantOrganizationBaseEntity {
    month;
    year;
    settingType;
    value;
    currency;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    employee;
    employeeId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1, maximum: 12 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(12),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], EmployeeSetting.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number, minimum: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(0),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], EmployeeSetting.prototype, "year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], EmployeeSetting.prototype, "settingType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => Number }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", Number)
], EmployeeSetting.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, enum: index_1.CurrenciesEnum }),
    (0, class_validator_1.IsEnum)(index_1.CurrenciesEnum),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], EmployeeSetting.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (employee) => employee.settings, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], EmployeeSetting.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", String)
], EmployeeSetting.prototype, "employeeId", void 0);
exports.EmployeeSetting = EmployeeSetting = __decorate([
    (0, entity_1.MultiORMEntity)('employee_setting', { mikroOrmRepository: () => mikro_orm_employee_setting_repository_1.MikroOrmEmployeeSettingRepository })
], EmployeeSetting);
//# sourceMappingURL=employee-setting.entity.js.map