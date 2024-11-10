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
exports.RoleAlreadyExistConstraint = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/common/dist/index");
const context_1 = require("../../../core/context");
const utils_1 = require("../../../core/utils");
const repository_1 = require("../../../role/repository");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
/**
 * Role already existed validation constraint
 *
 * @param validationOptions
 * @returns
 */
let RoleAlreadyExistConstraint = exports.RoleAlreadyExistConstraint = class RoleAlreadyExistConstraint {
    typeOrmRoleRepository;
    mikroOrmRoleRepository;
    constructor(typeOrmRoleRepository, mikroOrmRoleRepository) {
        this.typeOrmRoleRepository = typeOrmRoleRepository;
        this.mikroOrmRoleRepository = mikroOrmRoleRepository;
    }
    /**
     * Validates if a role with the given name does not exist for the current tenant.
     *
     * @param name - The name of the role to validate.
     * @returns True if the role does not exist (passes validation), false otherwise.
     */
    async validate(name) {
        if ((0, index_1.isEmpty)(name))
            return true;
        const tenantId = context_1.RequestContext.currentTenantId();
        try {
            switch (ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    return !await this.mikroOrmRoleRepository.findOneOrFail({ name, tenantId });
                case utils_1.MultiORMEnum.TypeORM:
                    return !await this.typeOrmRoleRepository.findOneByOrFail({ name, tenantId });
                default:
                    throw new Error(`Not implemented for ${ormType}`);
            }
        }
        catch (error) {
            // Check the specific error type (e.g., EntityNotFoundError) to ensure the error is due to the role not being found
            // Consider logging or handling other types of errors if necessary
            return true; // If the role is not found, validation passes
        }
    }
    /**
     * Gets default message when validation for this constraint fail.
     */
    defaultMessage(validationArguments) {
        const { value } = validationArguments;
        return `The role name '${value}' is already in use. Please choose a unique name for the new role.`;
    }
};
exports.RoleAlreadyExistConstraint = RoleAlreadyExistConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsRoleAlreadyExist", async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmRoleRepository,
        repository_1.MikroOrmRoleRepository])
], RoleAlreadyExistConstraint);
//# sourceMappingURL=role-already-exist.constraint.js.map