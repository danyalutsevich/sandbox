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
exports.OrganizationBelongsToUserConstraint = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/common/dist/index");
const context_1 = require("../../../core/context");
const utils_1 = require("../../../core/utils");
const repository_1 = require("../../../user-organization/repository");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
/**
 * Validator constraint for checking if a user belongs to the organization.
 */
let OrganizationBelongsToUserConstraint = exports.OrganizationBelongsToUserConstraint = class OrganizationBelongsToUserConstraint {
    typeOrmUserOrganizationRepository;
    mikroOrmUserOrganizationRepository;
    constructor(typeOrmUserOrganizationRepository, mikroOrmUserOrganizationRepository) {
        this.typeOrmUserOrganizationRepository = typeOrmUserOrganizationRepository;
        this.mikroOrmUserOrganizationRepository = mikroOrmUserOrganizationRepository;
    }
    /**
     * Validates if the user belongs to the organization.
     *
     * @param value - The organization ID or organization object.
     * @returns {Promise<boolean>} - True if the user belongs to the organization, otherwise false.
     */
    async validate(value) {
        if ((0, index_1.isEmpty)(value)) {
            return true;
        }
        // 'value' can be either a string (organization ID) or an organization object.
        const organizationId = (typeof value === 'string') ? value : value.id;
        // Use the consolidated ORM logic function
        return await this.checkOrganizationExistence(organizationId);
    }
    /**
     * Checks if the given organization exists for the current user in the database.
     *
     * @param organizationId The ID of the organization.
     * @returns {Promise<boolean>} - True if found, false otherwise.
     */
    async checkOrganizationExistence(organizationId) {
        const tenantId = context_1.RequestContext.currentTenantId();
        const userId = context_1.RequestContext.currentUserId();
        try {
            switch (ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    return !!await this.mikroOrmUserOrganizationRepository.findOneOrFail({ tenantId, userId, organizationId });
                case utils_1.MultiORMEnum.TypeORM:
                    return !!await this.typeOrmUserOrganizationRepository.findOneByOrFail({ tenantId, userId, organizationId });
                default:
                    throw new Error(`Not implemented for ${ormType}`);
            }
        }
        catch (error) {
            return false;
        }
    }
    /**
     * Gets the default error message when the validation fails.
     * @param validationArguments - Validation arguments containing the value.
     * @returns {string} - Default error message.
     */
    defaultMessage(validationArguments) {
        const { value } = validationArguments;
        return `The user with ID ${context_1.RequestContext.currentUserId()} is not associated with the specified organization (${JSON.stringify(value)}).`;
    }
};
exports.OrganizationBelongsToUserConstraint = OrganizationBelongsToUserConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsOrganizationBelongsToUser", async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmUserOrganizationRepository,
        repository_1.MikroOrmUserOrganizationRepository])
], OrganizationBelongsToUserConstraint);
//# sourceMappingURL=organization-belongs-to-user.constraint.js.map