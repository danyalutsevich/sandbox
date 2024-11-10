"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UpworkModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpworkModule = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_1 = require("@mikro-orm/nestjs");
const index_1 = require("../../plugins/plugins/integration-upwork/dist/index");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const user_module_1 = require("../user/user.module");
const role_module_1 = require("../role/role.module");
const organization_module_1 = require("../organization/organization.module");
const organization_vendor_module_1 = require("organization-vendor/organization-vendor.module");
const expense_categories_module_1 = require("../expense-categories/expense-categories.module");
const upwork_transaction_service_1 = require("./upwork-transaction.service");
const employee_module_1 = require("../employee/employee.module");
const organization_contact_module_1 = require("./../organization-contact/organization-contact.module");
const integration_map_module_1 = require("./../integration-map/integration-map.module");
const time_slot_module_1 = require("../time-tracking/time-slot/time-slot.module");
const expense_module_1 = require("./../expense/expense.module");
const income_module_1 = require("./../income/income.module");
const internal_1 = require("./../core/entities/internal");
const upwork_controller_1 = require("./upwork.controller");
const upwork_service_1 = require("./upwork.service");
const upwork_authorization_controller_1 = require("./upwork-authorization.controller");
const forFeatureEntities = [internal_1.TimeSlot, internal_1.Activity, internal_1.TimeLog, internal_1.TimeSlotMinute];
let UpworkModule = exports.UpworkModule = UpworkModule_1 = class UpworkModule {
};
exports.UpworkModule = UpworkModule = UpworkModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/integrations/upwork', module: UpworkModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature(forFeatureEntities),
            nestjs_1.MikroOrmModule.forFeature(forFeatureEntities),
            role_permission_module_1.RolePermissionModule,
            user_module_1.UserModule,
            employee_module_1.EmployeeModule,
            role_module_1.RoleModule,
            organization_module_1.OrganizationModule,
            organization_vendor_module_1.OrganizationVendorModule,
            organization_contact_module_1.OrganizationContactModule,
            integration_map_module_1.IntegrationMapModule,
            income_module_1.IncomeModule,
            expense_module_1.ExpenseModule,
            expense_categories_module_1.ExpenseCategoriesModule,
            time_slot_module_1.TimeSlotModule,
            cqrs_1.CqrsModule
        ],
        controllers: [upwork_authorization_controller_1.UpworkAuthorizationController, upwork_controller_1.UpworkController],
        providers: [index_1.UpworkJobService, index_1.UpworkOffersService, upwork_transaction_service_1.UpworkTransactionService, index_1.UpworkReportService, upwork_service_1.UpworkService]
    })
], UpworkModule);
//# sourceMappingURL=upwork.module.js.map