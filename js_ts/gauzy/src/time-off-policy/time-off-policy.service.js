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
exports.TimeOffPolicyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const time_off_policy_entity_1 = require("./time-off-policy.entity");
const crud_1 = require("./../core/crud");
const employee_entity_1 = require("../employee/employee.entity");
const type_orm_time_off_policy_repository_1 = require("./repository/type-orm-time-off-policy.repository");
const mikro_orm_time_off_policy_repository_1 = require("./repository/mikro-orm-time-off-policy.repository");
const type_orm_employee_repository_1 = require("../employee/repository/type-orm-employee.repository");
const mikro_orm_employee_repository_1 = require("../employee/repository/mikro-orm-employee.repository");
let TimeOffPolicyService = exports.TimeOffPolicyService = class TimeOffPolicyService extends crud_1.TenantAwareCrudService {
    typeOrmEmployeeRepository;
    constructor(typeOrmTimeOffPolicyRepository, mikroOrmTimeOffPolicyRepository, typeOrmEmployeeRepository, mikroOrmEmployeeRepository) {
        super(typeOrmTimeOffPolicyRepository, mikroOrmTimeOffPolicyRepository);
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
    }
    async create(entity) {
        const policy = new time_off_policy_entity_1.TimeOffPolicy();
        policy.name = entity.name;
        policy.organizationId = entity.organizationId;
        policy.tenantId = entity.tenantId;
        policy.requiresApproval = entity.requiresApproval;
        policy.paid = entity.paid;
        const employees = await this.typeOrmEmployeeRepository.find({
            where: {
                id: (0, typeorm_2.In)(entity.employees)
            },
            relations: {
                user: true
            }
        });
        policy.employees = employees;
        return this.typeOrmRepository.save(policy);
    }
    async update(id, entity) {
        try {
            await this.typeOrmRepository.delete(id);
            const policy = new time_off_policy_entity_1.TimeOffPolicy();
            policy.name = entity.name;
            policy.organizationId = entity.organizationId;
            policy.tenantId = entity.tenantId;
            policy.requiresApproval = entity.requiresApproval;
            policy.paid = entity.paid;
            const employees = await this.typeOrmEmployeeRepository.find({
                where: {
                    id: (0, typeorm_2.In)(entity.employees)
                },
                relations: {
                    user: true
                }
            });
            policy.employees = employees;
            return this.typeOrmRepository.save(policy);
        }
        catch (err /*: WriteError*/) {
            throw new common_1.BadRequestException(err);
        }
    }
};
exports.TimeOffPolicyService = TimeOffPolicyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(time_off_policy_entity_1.TimeOffPolicy)),
    __param(2, (0, typeorm_1.InjectRepository)(employee_entity_1.Employee)),
    __metadata("design:paramtypes", [type_orm_time_off_policy_repository_1.TypeOrmTimeOffPolicyRepository,
        mikro_orm_time_off_policy_repository_1.MikroOrmTimeOffPolicyRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        mikro_orm_employee_repository_1.MikroOrmEmployeeRepository])
], TimeOffPolicyService);
//# sourceMappingURL=time-off-policy.service.js.map