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
exports.EmployeeBelongsToOrganizationConstraint = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/common/dist/index");
const context_1 = require("../../../core/context");
const utils_1 = require("../../../core/utils");
const repository_1 = require("../../../employee/repository");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
/**
 * Validator constraint for employee belonging to organization validation.
 */
let EmployeeBelongsToOrganizationConstraint = exports.EmployeeBelongsToOrganizationConstraint = class EmployeeBelongsToOrganizationConstraint {
    typeOrmEmployeeRepository;
    mikroOrmEmployeeRepository;
    constructor(typeOrmEmployeeRepository, mikroOrmEmployeeRepository) {
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.mikroOrmEmployeeRepository = mikroOrmEmployeeRepository;
    }
    /**
     * Validates if the employee belongs to the organization.
     * @param value - The employee ID or employee object.
     * @param args - Validation arguments containing the object with organization details.
     * @returns {Promise<boolean>} - True if the employee belongs to the organization, otherwise false.
     */
    async validate(value, args) {
        if ((0, index_1.isEmpty)(value))
            return true;
        const employeeId = typeof value === 'string' ? value : value.id;
        const object = args.object;
        const organizationId = object.organizationId || object.organization?.id;
        if (!organizationId)
            return true; // No organization ID provided
        try {
            const tenantId = context_1.RequestContext.currentTenantId();
            return !!await this.findOneByOrFail(employeeId, organizationId, tenantId);
        }
        catch (error) {
            // Handle different types of errors if needed, for now assuming not found means false
            return false;
        }
    }
    /**
     * Fetches an employee entity based on the employee ID, organization ID, and tenant ID.
     * It uses the appropriate ORM repository to perform the find operation.
     *
     * @param employeeId - The ID of the employee.
     * @param organizationId - The ID of the organization the employee belongs to.
     * @param tenantId - The tenant ID.
     * @returns A Promise that resolves to the employee entity if found, or undefined.
     */
    async findOneByOrFail(employeeId, organizationId, tenantId) {
        switch (ormType) {
            case utils_1.MultiORMEnum.MikroORM:
                return await this.mikroOrmEmployeeRepository.findOneOrFail({ id: employeeId, organizationId, tenantId });
            case utils_1.MultiORMEnum.TypeORM:
                return await this.typeOrmEmployeeRepository.findOneByOrFail({ id: employeeId, organizationId, tenantId });
            default:
                throw new Error(`Not implemented for ${ormType}`);
        }
    }
    /**
     * Gets default message when validation for this constraint fail.
     */
    defaultMessage(validationArguments) {
        const { value } = validationArguments;
        return `This employee (${JSON.stringify(value)}) does not belong to the specified organization.`;
    }
};
exports.EmployeeBelongsToOrganizationConstraint = EmployeeBelongsToOrganizationConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsEmployeeBelongsToOrganization", async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmEmployeeRepository,
        repository_1.MikroOrmEmployeeRepository])
], EmployeeBelongsToOrganizationConstraint);
//# sourceMappingURL=employee-belongs-to-organization.constraint.js.map