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
exports.PublicEmployeeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const internal_1 = require("./../../core/entities/internal");
const type_orm_employee_repository_1 = require("../../employee/repository/type-orm-employee.repository");
const mikro_orm_employee_repository_1 = require("../../employee/repository/mikro-orm-employee.repository");
let PublicEmployeeService = exports.PublicEmployeeService = class PublicEmployeeService {
    typeOrmEmployeeRepository;
    constructor(typeOrmEmployeeRepository, mikroOrmEmployeeRepository) {
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
    }
    /**
     * GET all public employees by organization condition
     *
     * @param where
     * @param relations
     * @returns
     */
    async findPublicEmployeeByOrganization(where, relations = []) {
        try {
            const [items = [], total = 0] = await this.typeOrmEmployeeRepository.findAndCount({
                where,
                relations
            });
            return { items, total };
        }
        catch (error) {
            throw new common_1.BadRequestException(error, `Error while gettting public employees`);
        }
    }
    /**
     * GET employee by profile link & primary ID
     *
     * @param where
     * @param relations
     * @returns
     */
    async findOneByConditions(where, relations) {
        try {
            return await this.typeOrmEmployeeRepository.findOneOrFail({
                where,
                relations
            });
        }
        catch (error) {
            throw new common_1.NotFoundException(`The requested record was not found`);
        }
    }
};
exports.PublicEmployeeService = PublicEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __metadata("design:paramtypes", [type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        mikro_orm_employee_repository_1.MikroOrmEmployeeRepository])
], PublicEmployeeService);
//# sourceMappingURL=public-employee.service.js.map