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
exports.BulkActivitiesSaveHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("../../../../../plugins/contracts/dist/index");
;
const index_2 = require("../../../../../plugins/common/dist/index");
const activity_entity_1 = require("../../activity.entity");
const bulk_activities_save_command_1 = require("../bulk-activities-save.command");
const context_1 = require("../../../../core/context");
const internal_1 = require("./../../../../core/entities/internal");
const type_orm_activity_repository_1 = require("../../repository/type-orm-activity.repository");
const type_orm_employee_repository_1 = require("../../../../employee/repository/type-orm-employee.repository");
let BulkActivitiesSaveHandler = exports.BulkActivitiesSaveHandler = class BulkActivitiesSaveHandler {
    typeOrmActivityRepository;
    typeOrmEmployeeRepository;
    constructor(typeOrmActivityRepository, typeOrmEmployeeRepository) {
        this.typeOrmActivityRepository = typeOrmActivityRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
    }
    /**
     *
     * @param command
     * @returns
     */
    async execute(command) {
        const { input } = command;
        let { employeeId, organizationId, activities = [] } = input;
        const user = context_1.RequestContext.currentUser();
        const tenantId = context_1.RequestContext.currentTenantId();
        /**
         * Check logged user does not have employee selection permission
         */
        if (!context_1.RequestContext.hasPermission(index_1.PermissionsEnum.CHANGE_SELECTED_EMPLOYEE)) {
            try {
                let employee = await this.typeOrmEmployeeRepository.findOneByOrFail({
                    userId: user.id,
                    tenantId
                });
                employeeId = employee.id;
                organizationId = employee.organizationId;
            }
            catch (error) {
                console.log(`Error while finding logged in employee for (${user.name}) create bulk activities`, error);
            }
        }
        else if ((0, index_2.isEmpty)(employeeId) && context_1.RequestContext.currentEmployeeId()) {
            employeeId = context_1.RequestContext.currentEmployeeId();
        }
        /*
         * If organization not found in request then assign current logged user organization
         */
        if ((0, index_2.isEmpty)(organizationId)) {
            let employee = await this.typeOrmEmployeeRepository.findOneBy({
                id: employeeId
            });
            organizationId = employee ? employee.organizationId : null;
        }
        console.log(`Empty bulk App & URL's activities for employee (${user.name}): ${employeeId}`, activities.filter((activity) => Object.keys(activity).length === 0));
        activities = activities.filter((activity) => Object.keys(activity).length !== 0).map((activity) => new activity_entity_1.Activity({
            ...activity,
            ...(input.projectId ? { projectId: input.projectId } : {}),
            employeeId,
            organizationId,
            tenantId,
        }));
        console.log(`Activities should be insert into database for employee (${user.name})`, { activities });
        if ((0, index_2.isNotEmpty)(activities)) {
            return await this.typeOrmActivityRepository.save(activities);
        }
        else {
            return [];
        }
    }
};
exports.BulkActivitiesSaveHandler = BulkActivitiesSaveHandler = __decorate([
    (0, cqrs_1.CommandHandler)(bulk_activities_save_command_1.BulkActivitiesSaveCommand),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __param(1, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __metadata("design:paramtypes", [type_orm_activity_repository_1.TypeOrmActivityRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository])
], BulkActivitiesSaveHandler);
//# sourceMappingURL=bulk-activities-save.handler.js.map