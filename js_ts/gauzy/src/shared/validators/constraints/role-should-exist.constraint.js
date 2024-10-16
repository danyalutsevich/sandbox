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
exports.RoleShouldExistConstraint = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const context_1 = require("../../../core/context");
const utils_1 = require("../../../core/utils");
const repository_1 = require("../../../role/repository");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
/**
 * Role should existed validation constraint
 *
 * @param validationOptions
 * @returns
 */
let RoleShouldExistConstraint = exports.RoleShouldExistConstraint = class RoleShouldExistConstraint {
    typeOrmRoleRepository;
    mikroOrmRoleRepository;
    constructor(typeOrmRoleRepository, mikroOrmRoleRepository) {
        this.typeOrmRoleRepository = typeOrmRoleRepository;
        this.mikroOrmRoleRepository = mikroOrmRoleRepository;
    }
    /**
     * Validates if the given role exists for the current tenant.
     *
     * @param role - The role to validate, either as a string ID or an IRole object.
     * @returns True if the role exists, false otherwise.
     */
    async validate(role) {
        if (!role)
            return false;
        const roleId = typeof role === 'string' ? role : role.id;
        if (!roleId)
            return false;
        const tenantId = context_1.RequestContext.currentTenantId();
        try {
            switch (ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    return !!await this.mikroOrmRoleRepository.findOneOrFail({ id: roleId, tenantId });
                case utils_1.MultiORMEnum.TypeORM:
                    return !!await this.typeOrmRoleRepository.findOneByOrFail({ id: roleId, tenantId });
                default:
                    throw new Error(`Not implemented for ${ormType}`);
            }
        }
        catch (error) {
            return false; // Role does not exist
        }
    }
    /**
     * Gets default message when validation for this constraint fail.
     */
    defaultMessage(validationArguments) {
        const { value } = validationArguments;
        return `Please provide a valid value for the role. The value '${JSON.stringify(value)}' is not recognized as a valid role identifier.`;
    }
};
exports.RoleShouldExistConstraint = RoleShouldExistConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsRoleShouldExist", async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmRoleRepository,
        repository_1.MikroOrmRoleRepository])
], RoleShouldExistConstraint);
//# sourceMappingURL=role-should-exist.constraint.js.map