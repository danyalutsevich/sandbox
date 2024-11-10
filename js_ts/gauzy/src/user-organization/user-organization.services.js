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
exports.UserOrganizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../plugins/contracts/dist/index");
const crud_1 = require("./../core/crud");
const internal_1 = require("./../core/entities/internal");
const repository_1 = require("../organization/repository");
const user_organization_entity_1 = require("./user-organization.entity");
const repository_2 = require("./repository");
const employee_service_1 = require("../employee/employee.service");
let UserOrganizationService = exports.UserOrganizationService = class UserOrganizationService extends crud_1.TenantAwareCrudService {
    typeOrmUserOrganizationRepository;
    mikroOrmUserOrganizationRepository;
    typeOrmOrganizationRepository;
    employeeService;
    constructor(typeOrmUserOrganizationRepository, mikroOrmUserOrganizationRepository, typeOrmOrganizationRepository, employeeService) {
        super(typeOrmUserOrganizationRepository, mikroOrmUserOrganizationRepository);
        this.typeOrmUserOrganizationRepository = typeOrmUserOrganizationRepository;
        this.mikroOrmUserOrganizationRepository = mikroOrmUserOrganizationRepository;
        this.typeOrmOrganizationRepository = typeOrmOrganizationRepository;
        this.employeeService = employeeService;
    }
    /**
     * Finds all user organizations based on the provided filter options.
     *
     * @param filter Optional filter options to apply when querying user organizations.
     * @returns A promise resolving to an array of user organizations.
     */
    async findAllUserOrganizations(filter, includeEmployee) {
        // Call the base class method to find all user organizations
        const { items, total } = await super.findAll(filter);
        // If 'includeEmployee' is set to true, fetch employee details associated with each user organization
        if (includeEmployee) {
            try {
                // Extract user IDs from the items array
                const userIds = items.map((organization) => organization.user.id);
                // Fetch all employee details in bulk for the extracted user IDs
                const employees = await this.employeeService.findEmployeesByUserIds(userIds);
                // Map employee details to a dictionary for easier lookup
                const employeeMap = new Map();
                employees.forEach((employee) => {
                    employeeMap.set(employee.userId, employee);
                });
                // Merge employee details into each user organization object
                const itemsWithEmployees = items.map(organization => {
                    const employee = employeeMap.get(organization.user.id);
                    return { ...organization, user: { ...organization.user, employee } };
                });
                // Return paginated result with employee details
                return { items: itemsWithEmployees, total };
            }
            catch (error) {
                console.error(`Error fetching employee details: ${error.message}`);
            }
        }
        // Return original items if 'includeEmployee' is false
        return { items, total };
    }
    /**
     * Adds a user to all organizations within a specific tenant.
     *
     * @param userId The unique identifier of the user to be added to the organizations.
     * @param tenantId The unique identifier of the tenant whose organizations the user will be added to.
     * @returns A promise that resolves to an array of IUserOrganization, where each element represents the user's association with an organization in the tenant.
     */
    async addUserToOrganization(user, organizationId) {
        /** If role is SUPER_ADMIN, add user to all organizations in the tenant */
        if (user.role.name === index_1.RolesEnum.SUPER_ADMIN) {
            return await this._addUserToAllOrganizations(user.id, user.tenantId);
        }
        const entity = new user_organization_entity_1.UserOrganization();
        entity.organizationId = organizationId;
        entity.tenantId = user.tenantId;
        entity.userId = user.id;
        return await this.typeOrmUserOrganizationRepository.save(entity);
    }
    /**
     * Adds a user to all organizations within a given tenant..
     *
     * @param userId The unique identifier of the user to be added to the organizations.
     * @param tenantId The unique identifier of the tenant whose organizations the user will be added to.
     * @returns A promise that resolves to an array of IUserOrganization, representing the user-organization relationships created.
     */
    async _addUserToAllOrganizations(userId, tenantId) {
        /** Add user to all organizations in the tenant */
        const organizations = await this.typeOrmOrganizationRepository.find({
            where: { tenantId }
        });
        const entities = organizations.map((organization) => {
            const entity = new user_organization_entity_1.UserOrganization();
            entity.organizationId = organization.id;
            entity.tenantId = tenantId;
            entity.userId = userId;
            return entity;
        });
        return await this.typeOrmUserOrganizationRepository.save(entities);
    }
};
exports.UserOrganizationService = UserOrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_organization_entity_1.UserOrganization)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.Organization)),
    __metadata("design:paramtypes", [repository_2.TypeOrmUserOrganizationRepository,
        repository_2.MikroOrmUserOrganizationRepository,
        repository_1.TypeOrmOrganizationRepository,
        employee_service_1.EmployeeService])
], UserOrganizationService);
//# sourceMappingURL=user-organization.services.js.map