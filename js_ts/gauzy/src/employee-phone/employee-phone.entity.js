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
exports.EmployeePhone = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const internal_1 = require("../core/entities/internal");
const entity_1 = require("./../core/decorators/entity");
const mikro_orm_employee_phone_repository_1 = require("./repository/mikro-orm-employee-phone.repository");
let EmployeePhone = exports.EmployeePhone = class EmployeePhone extends internal_1.TenantOrganizationBaseEntity {
    type;
    phoneNumber;
    /*
    |--------------------------------------------------------------------------
    | @ManyToOne
    |--------------------------------------------------------------------------
    */
    employee;
    employeeId;
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, entity_1.MultiORMColumn)({ nullable: true }),
    __metadata("design:type", String)
], EmployeePhone.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String, minLength: 4, maxLength: 12 }),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)(),
    __metadata("design:type", String)
], EmployeePhone.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => internal_1.Employee }),
    (0, entity_1.MultiORMManyToOne)(() => internal_1.Employee, (employee) => employee.phoneNumbers, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Object)
], EmployeePhone.prototype, "employee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => String }),
    (0, typeorm_1.RelationId)((it) => it.employee),
    (0, entity_1.ColumnIndex)(),
    (0, entity_1.MultiORMColumn)({ relationId: true }),
    __metadata("design:type", Object)
], EmployeePhone.prototype, "employeeId", void 0);
exports.EmployeePhone = EmployeePhone = __decorate([
    (0, entity_1.MultiORMEntity)('employee_phone', { mikroOrmRepository: () => mikro_orm_employee_phone_repository_1.MikroOrmEmployeePhoneRepository })
], EmployeePhone);
//# sourceMappingURL=employee-phone.entity.js.map