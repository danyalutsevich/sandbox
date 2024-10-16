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
exports.TeamAlreadyExistConstraint = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const index_1 = require("../../../../plugins/common/dist/index");
const context_1 = require("../../../core/context");
const repository_1 = require("../../../organization-team/repository");
const utils_1 = require("../../../core/utils");
// Get the type of the Object-Relational Mapping (ORM) used in the application.
const ormType = (0, utils_1.getORMType)();
let TeamAlreadyExistConstraint = exports.TeamAlreadyExistConstraint = class TeamAlreadyExistConstraint {
    typeOrmOrganizationTeamRepository;
    mikroOrmOrganizationTeamRepository;
    constructor(typeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository) {
        this.typeOrmOrganizationTeamRepository = typeOrmOrganizationTeamRepository;
        this.mikroOrmOrganizationTeamRepository = mikroOrmOrganizationTeamRepository;
    }
    /**
     * Validates if a given name is not already in use in the specified organization.
     *
     * @param name - The name to validate.
     * @param args - Validation arguments, expected to contain organization ID and tenant ID.
     * @returns True if the name is not in use or if there's no organization ID, false otherwise.
     */
    async validate(name, args) {
        if ((0, index_1.isEmpty)(name)) {
            return true; // Empty value is considered valid
        }
        const payload = args.object;
        const organizationId = payload.organizationId || payload.organization?.id;
        if (!organizationId) {
            return true; // Validation is irrelevant without an organization ID
        }
        const tenantId = context_1.RequestContext.currentTenantId();
        const queryConditions = { name, organizationId, tenantId };
        if (payload.id) {
            queryConditions.id = (0, typeorm_1.Not)(payload.id); // Exclude current entity from check
        }
        try {
            switch (ormType) {
                case utils_1.MultiORMEnum.MikroORM:
                    const { where, mikroOptions } = (0, utils_1.parseTypeORMFindToMikroOrm)({ where: queryConditions });
                    return !await this.mikroOrmOrganizationTeamRepository.findOneOrFail(where, mikroOptions);
                case utils_1.MultiORMEnum.TypeORM:
                    return !await this.typeOrmOrganizationTeamRepository.findOneByOrFail(queryConditions);
                default:
                    throw new Error(`Not implemented for ${ormType}`);
            }
        }
        catch (error) {
            return true; // No existing team found, hence valid
        }
    }
    /**
     * Gets default message when validation for this constraint fail.
     */
    defaultMessage(validationArguments) {
        const { value } = validationArguments;
        return `The team name '${value}' is already in use. Please choose a different name.`;
    }
};
exports.TeamAlreadyExistConstraint = TeamAlreadyExistConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "IsTeamAlreadyExist", async: true }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.TypeOrmOrganizationTeamRepository,
        repository_1.MikroOrmOrganizationTeamRepository])
], TeamAlreadyExistConstraint);
//# sourceMappingURL=team-already-exist.constraint.js.map