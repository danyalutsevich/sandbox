"use strict";
// Modified code from https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit.
// MIT License, see https://github.com/alexitaylor/angular-graphql-nestjs-postgres-starter-kit/blob/master/LICENSE
// Copyright (c) 2019 Alexi Taylor
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedDataService = exports.SeederTypeEnum = void 0;
const rimraf_1 = __importDefault(require("rimraf"));
const path = __importStar(require("path"));
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typeorm_1 = require("typeorm");
const chalk = __importStar(require("chalk"));
const moment_1 = __importDefault(require("moment"));
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/plugin/dist/index");
const role_seed_1 = require("../../role/role.seed");
const skill_seed_1 = require("../../skills/skill.seed");
const language_seed_1 = require("../../language/language.seed");
const user_seed_1 = require("../../user/user.seed");
const employee_seed_1 = require("../../employee/employee.seed");
const organization_1 = require("../../organization");
const income_seed_1 = require("../../income/income.seed");
const expense_seed_1 = require("../../expense/expense.seed");
const user_organization_seed_1 = require("../../user-organization/user-organization.seed");
const country_seed_1 = require("../../country/country.seed");
const organization_team_seed_1 = require("../../organization-team/organization-team.seed");
const role_permission_seed_1 = require("../../role-permission/role-permission.seed");
const tenant_1 = require("../../tenant");
const tenant_setting_seed_1 = require("./../../tenant/tenant-setting/tenant-setting.seed");
const email_template_seed_1 = require("../../email-template/email-template.seed");
const organization_employment_type_seed_1 = require("../../organization-employment-type/organization-employment-type.seed");
const employee_level_seed_1 = require("../../employee-level/employee-level.seed");
const time_off_policy_seed_1 = require("../../time-off-policy/time-off-policy.seed");
const approval_policy_seed_1 = require("../../approval-policy/approval-policy.seed");
const expense_categories_seed_1 = require("../../expense-categories/expense-categories.seed");
const organization_vendor_seed_1 = require("../../organization-vendor/organization-vendor.seed");
const candidate_seed_1 = require("../../candidate/candidate.seed");
const candidate_source_seed_1 = require("../../candidate-source/candidate-source.seed");
const integration_type_seed_1 = require("../../integration/integration-type.seed");
const integration_seed_1 = require("../../integration/integration.seed");
const product_seed_1 = require("../../product/product.seed");
const candidate_documents_seed_1 = require("../../candidate-documents/candidate-documents.seed");
const candidate_feedbacks_seed_1 = require("../../candidate-feedbacks/candidate-feedbacks.seed");
const timesheet_seed_1 = require("./../../time-tracking/timesheet/timesheet.seed");
const task_seed_1 = require("../../tasks/task.seed");
const organization_project_seed_1 = require("../../organization-project/organization-project.seed");
const goal_time_frame_seed_1 = require("../../goal-time-frame/goal-time-frame.seed");
const goal_seed_1 = require("../../goal/goal.seed");
const keyresult_seed_1 = require("../../keyresult/keyresult.seed");
const keyresult_update_seed_1 = require("../../keyresult-update/keyresult-update.seed");
const organization_department_seed_1 = require("../../organization-department/organization-department.seed");
const organization_position_seed_1 = require("../../organization-position/organization-position.seed");
const tag_seed_1 = require("../../tags/tag.seed");
const email_history_seed_1 = require("../../email-history/email-history.seed");
const invite_seed_1 = require("../../invite/invite.seed");
const request_approval_seed_1 = require("../../request-approval/request-approval.seed");
const time_off_request_seed_1 = require("../../time-off-request/time-off-request.seed");
const organization_document_seed_1 = require("../../organization-document/organization-document.seed");
const equipment_seed_1 = require("../../equipment/equipment.seed");
const equipment_sharing_seed_1 = require("../../equipment-sharing/equipment-sharing.seed");
const invoice_item_seed_1 = require("../../invoice-item/invoice-item.seed");
const invoice_seed_1 = require("../../invoice/invoice.seed");
const candidate_skill_seed_1 = require("../../candidate-skill/candidate-skill.seed");
const candidate_experience_seed_1 = require("../../candidate-experience/candidate-experience.seed");
const candidate_education_seed_1 = require("../../candidate-education/candidate-education.seed");
const contact_seed_1 = require("../../contact/contact.seed");
const organization_contact_seed_1 = require("../../organization-contact/organization-contact.seed");
const availability_slots_seed_1 = require("../../availability-slots/availability-slots.seed");
const candidate_personal_qualities_seed_1 = require("../../candidate-personal-qualities/candidate-personal-qualities.seed");
const candidate_technologies_seed_1 = require("../../candidate-technologies/candidate-technologies.seed");
const candidate_interview_seed_1 = require("../../candidate-interview/candidate-interview.seed");
const organization_award_seed_1 = require("../../organization-award/organization-award.seed");
const goal_general_setting_seed_1 = require("../../goal-general-setting/goal-general-setting.seed");
const candidate_criterion_rating_seed_1 = require("../../candidate-criterions-rating/candidate-criterion-rating.seed");
const goal_kpi_seed_1 = require("../../goal-kpi/goal-kpi.seed");
const employee_setting_seed_1 = require("../../employee-setting/employee-setting.seed");
const employee_recurring_expense_seed_1 = require("../../employee-recurring-expense/employee-recurring-expense.seed");
const candidate_interviewers_seed_1 = require("../../candidate-interviewers/candidate-interviewers.seed");
const pipeline_stage_seed_1 = require("../../pipeline-stage/pipeline-stage.seed");
const pipeline_seed_1 = require("../../pipeline/pipeline.seed");
const organization_recurring_expense_seed_1 = require("../../organization-recurring-expense/organization-recurring-expense.seed");
const organization_language_seed_1 = require("../../organization-language/organization-language.seed");
const organization_sprint_seed_1 = require("../../organization-sprint/organization-sprint.seed");
const organization_team_employee_seed_1 = require("../../organization-team-employee/organization-team-employee.seed");
const appointment_employees_seed_1 = require("../../appointment-employees/appointment-employees.seed");
const employee_appointment_seed_1 = require("../../employee-appointment/employee-appointment.seed");
const deal_seed_1 = require("../../deal/deal.seed");
const integration_setting_seed_1 = require("../../integration-setting/integration-setting.seed");
const integration_map_seed_1 = require("../../integration-map/integration-map.seed");
const integration_tenant_seed_1 = require("../../integration-tenant/integration-tenant.seed");
const integration_entity_setting_seed_1 = require("../../integration-entity-setting/integration-entity-setting.seed");
const integration_entity_setting_tied_seed_1 = require("../../integration-entity-setting-tied/integration-entity-setting-tied.seed");
const request_approval_team_seed_1 = require("../../request-approval-team/request-approval-team.seed");
const request_approval_employee_seed_1 = require("../../request-approval-employee/request-approval-employee.seed");
const payment_seed_1 = require("../../payment/payment.seed");
const event_type_seed_1 = require("../../event-types/event-type.seed");
const equipment_sharing_policy_seed_1 = require("../../equipment-sharing-policy/equipment-sharing-policy.seed");
const product_option_seed_1 = require("../../product-option/product-option.seed");
const product_setting_seed_1 = require("../../product-setting/product-setting.seed");
const product_variant_seed_1 = require("../../product-variant/product-variant.seed");
const product_variant_price_seed_1 = require("../../product-variant-price/product-variant-price.seed");
const category_seed_1 = require("../../product-category/category.seed");
const type_seed_1 = require("../../product-type/type.seed");
const goal_template_seed_1 = require("../../goal-template/goal-template.seed");
const keyresult_template_seed_1 = require("../../keyresult-template/keyresult-template.seed");
const employee_award_seed_1 = require("../../employee-award/employee-award.seed");
const goal_kpi_template_seed_1 = require("../../goal-kpi-template/goal-kpi-template.seed");
const random_seed_config_1 = require("./random-seed-config");
const report_seed_1 = require("../../reports/report.seed");
const currency_seed_1 = require("../../currency/currency.seed");
const feature_seed_1 = require("../../feature/feature.seed");
const accounting_template_seed_1 = require("./../../accounting-template/accounting-template.seed");
const employee_1 = require("./../../employee");
const merchant_seed_1 = require("./../../merchant/merchant.seed");
const warehouse_seed_1 = require("./../../warehouse/warehouse.seed");
const status_seed_1 = require("./../../tasks/statuses/status.seed");
const priority_seed_1 = require("./../../tasks/priorities/priority.seed");
const size_seed_1 = require("./../../tasks/sizes/size.seed");
const issue_type_seed_1 = require("./../../tasks/issue-type/issue-type.seed");
const utils_1 = require("./../../core/utils");
var SeederTypeEnum;
(function (SeederTypeEnum) {
    SeederTypeEnum["ALL"] = "all";
    SeederTypeEnum["EVER"] = "ever";
    SeederTypeEnum["DEFAULT"] = "default";
})(SeederTypeEnum || (exports.SeederTypeEnum = SeederTypeEnum = {}));
let SeedDataService = exports.SeedDataService = class SeedDataService {
    moduleRef;
    configService;
    dataSource;
    log = console.log;
    defaultOrganization;
    tenant;
    seedType;
    organizations = [];
    defaultProjects = [];
    roles = [];
    superAdminUsers = [];
    defaultCandidateUsers = [];
    defaultEmployees = [];
    /** */
    randomTenants;
    randomTenantOrganizationsMap;
    randomOrganizationEmployeesMap;
    constructor(moduleRef, configService) {
        this.moduleRef = moduleRef;
        this.configService = configService;
    }
    /**
     * This config is applied only for `yarn seed:*` type calls because
     * that is when connection is created by this service itself.
     */
    overrideDbConfig = {
        logging: 'all',
        logger: 'file', //Removes console logging, instead logs all queries in a file ormlogs.log
        // dropSchema: !env.production //Drops the schema each time connection is being established in development mode.
    };
    /**
     * Seed All Data
     */
    async runAllSeed() {
        try {
            this.seedType = SeederTypeEnum.ALL;
            await this.cleanUpPreviousRuns();
            // Connect to database
            await this.createConnection();
            // Reset database to start with new, fresh data
            await this.resetDatabase();
            // Seed basic default data for default tenant
            await this.seedBasicDefaultData();
            // Seed reports related data
            await this.seedReportsData();
            // Seed data with mock / fake data for default tenant
            await this.seedDefaultData();
            // Seed data with mock / fake data for random tenants
            await this.seedRandomData();
            // Disconnect to database
            await this.closeConnection();
            console.log('Database All Seed Completed');
        }
        catch (error) {
            this.handleError(error);
        }
    }
    /**
     * Seed Default Data
     */
    async runDefaultSeed(fromAPI) {
        try {
            if (this.configService.get('demo') === true && fromAPI === true) {
                this.seedType = SeederTypeEnum.ALL;
            }
            else {
                this.seedType = SeederTypeEnum.DEFAULT;
            }
            await this.cleanUpPreviousRuns();
            // Connect to database
            await this.createConnection();
            // Reset database to start with new, fresh data
            await this.resetDatabase();
            // Seed basic default data for default tenant
            await this.seedBasicDefaultData();
            // Seed reports related data
            await this.seedReportsData();
            // Disconnect to database
            await this.closeConnection();
            console.log('Database Default Seed Completed');
        }
        catch (error) {
            this.handleError(error);
        }
    }
    /**
     * Seed Default Ever Data
     */
    async runEverSeed() {
        try {
            this.seedType = SeederTypeEnum.EVER;
            await this.cleanUpPreviousRuns();
            // Connect to database
            await this.createConnection();
            // Reset database to start with new, fresh data
            await this.resetDatabase();
            // Seed basic default data for default tenant
            await this.seedBasicDefaultData();
            // Seed reports related data
            await this.seedReportsData();
            // Disconnect to database
            await this.closeConnection();
            console.log('Database Ever Seed Completed');
        }
        catch (error) {
            this.handleError(error);
        }
    }
    /**
     * Seed Default Report Data
     */
    async runReportsSeed() {
        try {
            // Connect to database
            await this.createConnection();
            // Seed reports related data
            await this.seedReportsData();
            // Disconnect to database
            await this.closeConnection();
            console.log('Database Reports Seed Completed');
        }
        catch (error) {
            this.handleError(error);
        }
        return;
    }
    /**
     * Seed Default & Random Data
     */
    async executeDemoSeed() {
        try {
            console.log('Database Demo Seed Started');
            // Connect to database
            await this.createConnection();
            // Seed reports related data
            await this.seedReportsData();
            // Seed default data
            await this.seedDefaultData();
            // Seed random data
            await this.seedRandomData();
            // Disconnect to database
            await this.closeConnection();
            console.log('Database Demo Seed Completed');
        }
        catch (error) {
            this.handleError(error);
        }
    }
    /**
     * Populate database with report related data
     */
    async seedReportsData() {
        try {
            this.log(chalk.green(`🌱 SEEDING ${index_1.environment.production ? 'PRODUCTION' : ''} REPORTS DATABASE...`));
            await this.tryExecute('Default Report Category & Report', (0, report_seed_1.createDefaultReport)(this.dataSource, this.configService.config, this.tenant));
            this.log(chalk.green(`✅ SEEDED ${index_1.environment.production ? 'PRODUCTION' : ''} REPORTS DATABASE`));
        }
        catch (error) {
            this.handleError(error);
        }
    }
    /**
     * Seed Default Job Data
     */
    async runJobsSeed() {
        try {
            this.seedType = SeederTypeEnum.ALL;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    /**
     * Populate Database with Basic Default Data
     */
    async seedBasicDefaultData() {
        this.log(chalk.magenta(`🌱 SEEDING BASIC ${index_1.environment.production ? 'PRODUCTION' : ''} DATABASE...`));
        // Seed data which only needs connection
        await this.tryExecute('Countries', (0, country_seed_1.createCountries)(this.dataSource));
        await this.tryExecute('Currencies', (0, currency_seed_1.createCurrencies)(this.dataSource));
        await this.tryExecute('Languages', (0, language_seed_1.createLanguages)(this.dataSource));
        await this.tryExecute('Statuses', (0, status_seed_1.createDefaultStatuses)(this.dataSource));
        await this.tryExecute('Priorities', (0, priority_seed_1.createDefaultPriorities)(this.dataSource));
        await this.tryExecute('Sizes', (0, size_seed_1.createDefaultSizes)(this.dataSource));
        await this.tryExecute('Issue Types', (0, issue_type_seed_1.createDefaultIssueTypes)(this.dataSource));
        // default and internal tenant
        const tenantName = this.seedType !== SeederTypeEnum.DEFAULT
            ? tenant_1.DEFAULT_EVER_TENANT
            : tenant_1.DEFAULT_TENANT;
        this.tenant = (await this.tryExecute('Tenant', (0, tenant_1.createDefaultTenant)(this.dataSource, tenantName)));
        this.roles = await (0, role_seed_1.createRoles)(this.dataSource, [this.tenant]);
        await (0, tenant_setting_seed_1.createDefaultTenantSetting)(this.dataSource, [this.tenant]);
        await (0, role_permission_seed_1.createRolePermissions)(this.dataSource, this.roles, [this.tenant]);
        // Tenant level inserts which only need connection, tenant, roles
        const organizations = this.seedType !== SeederTypeEnum.DEFAULT
            ? organization_1.DEFAULT_EVER_ORGANIZATIONS
            : organization_1.DEFAULT_ORGANIZATIONS;
        this.organizations = (await this.tryExecute('Organizations', (0, organization_1.createDefaultOrganizations)(this.dataSource, this.tenant, organizations)));
        // default organization set as main organization
        this.defaultOrganization = this.organizations.find((organization) => organization.isDefault);
        await this.tryExecute('Default Feature Toggle', (0, feature_seed_1.createDefaultFeatureToggle)(this.dataSource, this.configService.config, this.tenant));
        await this.tryExecute('Default Email Templates', (0, email_template_seed_1.createDefaultEmailTemplates)(this.dataSource));
        await this.tryExecute('Default Accounting Templates', (0, accounting_template_seed_1.createDefaultAccountingTemplates)(this.dataSource));
        await this.tryExecute('Skills', (0, skill_seed_1.createDefaultSkills)(this.dataSource, this.tenant, this.defaultOrganization));
        const { defaultSuperAdminUsers, defaultAdminUsers } = await (0, user_seed_1.createDefaultAdminUsers)(this.dataSource, this.tenant);
        this.superAdminUsers.push(...defaultSuperAdminUsers);
        const { defaultEmployeeUsers } = await (0, user_seed_1.createDefaultEmployeesUsers)(this.dataSource, this.tenant);
        if (this.seedType !== SeederTypeEnum.DEFAULT) {
            const { defaultEverEmployeeUsers, defaultCandidateUsers } = await (0, user_seed_1.createDefaultUsers)(this.dataSource, this.tenant);
            this.defaultCandidateUsers.push(...defaultCandidateUsers);
            defaultEmployeeUsers.push(...defaultEverEmployeeUsers);
        }
        const defaultUsers = [
            ...this.superAdminUsers,
            ...defaultAdminUsers,
            ...defaultEmployeeUsers,
        ];
        await this.tryExecute('Users', (0, user_organization_seed_1.createDefaultUsersOrganizations)(this.dataSource, this.tenant, this.organizations, defaultUsers));
        const allDefaultEmployees = employee_1.DEFAULT_EMPLOYEES.concat(employee_1.DEFAULT_EVER_EMPLOYEES);
        //User level data that needs dataSource, tenant, organization, role, users
        this.defaultEmployees = await (0, employee_seed_1.createDefaultEmployees)(this.dataSource, this.tenant, this.defaultOrganization, defaultEmployeeUsers, allDefaultEmployees);
        await this.tryExecute('Default General Goal Setting', (0, goal_general_setting_seed_1.createDefaultGeneralGoalSetting)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Goal Template', (0, goal_template_seed_1.createDefaultGoalTemplates)(this.dataSource, this.tenant, this.defaultOrganization));
        await this.tryExecute('Default Goal KPI Template', (0, goal_kpi_template_seed_1.createDefaultGoalKpiTemplate)(this.dataSource, this.tenant, this.defaultOrganization));
        await this.tryExecute('Default Key Result Template', (0, keyresult_template_seed_1.createDefaultKeyResultTemplates)(this.dataSource, this.tenant));
        await this.tryExecute('Default Time Off Policy', (0, time_off_policy_seed_1.createDefaultTimeOffPolicy)(this.dataSource, this.tenant, this.defaultOrganization, this.defaultEmployees));
        // seed default integrations with types
        const integrationTypes = await this.tryExecute('Default Integration Types', (0, integration_type_seed_1.createDefaultIntegrationTypes)(this.dataSource));
        await this.tryExecute('Default Integrations', (0, integration_seed_1.createDefaultIntegrations)(this.dataSource, integrationTypes));
        await this.tryExecute('Default Event Types', (0, event_type_seed_1.createDefaultEventTypes)(this.dataSource, this.tenant, this.organizations));
        // run all plugins random seed method
        await this.bootstrapPluginSeedMethods('onPluginBasicSeed', (instance) => {
            const pluginName = instance.constructor.name || '(anonymous plugin)';
            console.log(chalk.green(`SEEDED Basic Plugin [${pluginName}]`));
        });
        this.log(chalk.magenta(`✅ SEEDED BASIC ${index_1.environment.production ? 'PRODUCTION' : ''} DATABASE`));
    }
    /**
     * Populate default data for default tenant
     */
    async seedDefaultData() {
        this.log(chalk.magenta(`🌱 SEEDING DEFAULT ${index_1.environment.production ? 'PRODUCTION' : ''} DATABASE...`));
        await this.tryExecute('Default Employee Invite', (0, invite_seed_1.createDefaultEmployeeInviteSent)(this.dataSource, this.tenant, this.organizations, this.superAdminUsers));
        await this.tryExecute('Default Tags', (0, tag_seed_1.createDefaultTags)(this.dataSource, this.tenant, this.organizations));
        // Organization level inserts which need connection, tenant, role, organizations
        const categories = await this.tryExecute('Default Expense Categories', (0, expense_categories_seed_1.createExpenseCategories)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Employee Levels', (0, employee_level_seed_1.createEmployeeLevels)(this.dataSource, this.tenant, this.organizations));
        // TODO: needs to fix error of seeding Product Category
        await this.tryExecute('Default Product Categories', (0, category_seed_1.createCategories)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Product Types', (0, type_seed_1.createDefaultProductType)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Contacts', (0, contact_seed_1.createRandomContacts)(this.dataSource, this.tenant, this.organizations, random_seed_config_1.randomSeedConfig.noOfRandomContacts || 5));
        await this.tryExecute('Default Organization Contacts', (0, organization_contact_seed_1.createDefaultOrganizationContact)(this.dataSource, this.tenant, random_seed_config_1.randomSeedConfig.noOfContactsPerOrganization));
        // Employee level data that need connection, tenant, organization, role, users, employee
        await this.tryExecute('Default Teams', (0, organization_team_seed_1.createDefaultTeams)(this.dataSource, this.defaultOrganization, this.defaultEmployees, this.roles));
        this.defaultProjects = await this.tryExecute('Default Organization Projects', (0, organization_project_seed_1.createDefaultOrganizationProjects)(this.dataSource, this.tenant, this.defaultOrganization));
        await this.tryExecute('Default Projects Task', (0, task_seed_1.createDefaultTask)(this.dataSource, this.tenant, this.defaultOrganization));
        await this.tryExecute('Default Organization Departments', (0, organization_department_seed_1.createDefaultOrganizationDepartments)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Products', (0, product_seed_1.createDefaultProducts)(this.dataSource, this.tenant, this.defaultOrganization));
        await this.tryExecute('Default Merchants', (0, merchant_seed_1.createDefaultMerchants)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Time Frames', (0, goal_time_frame_seed_1.createDefaultTimeFrames)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Equipments', (0, equipment_seed_1.createDefaultEquipments)(this.dataSource, this.tenant, this.defaultOrganization));
        const organizationVendors = await this.tryExecute('Default Organization Vendors', (0, organization_vendor_seed_1.createOrganizationVendors)(this.dataSource, this.tenant, this.organizations));
        const defaultCandidates = await this.tryExecute('Default Candidates', (0, candidate_seed_1.createDefaultCandidates)(this.dataSource, this.tenant, this.defaultOrganization, this.defaultCandidateUsers));
        await this.tryExecute('Default Candidate Sources', (0, candidate_source_seed_1.createCandidateSources)(this.dataSource, this.tenant, defaultCandidates, this.defaultOrganization));
        await this.tryExecute('Default Candidate Documents', (0, candidate_documents_seed_1.createCandidateDocuments)(this.dataSource, this.tenant, defaultCandidates, this.defaultOrganization));
        await this.tryExecute('Default Candidate Interview', (0, candidate_interview_seed_1.createDefaultCandidateInterview)(this.dataSource, this.tenant, this.defaultOrganization, defaultCandidates));
        await this.tryExecute('Default Candidate Interviewers', (0, candidate_interviewers_seed_1.createDefaultCandidateInterviewers)(this.dataSource, this.tenant, this.defaultOrganization, this.defaultEmployees, defaultCandidates));
        await this.tryExecute('Default Candidate Feedbacks', (0, candidate_feedbacks_seed_1.createCandidateFeedbacks)(this.dataSource, this.tenant, this.defaultOrganization, defaultCandidates));
        await this.tryExecute('Default Candidate Educations', (0, candidate_education_seed_1.createCandidateEducations)(this.dataSource, this.tenant, defaultCandidates));
        await this.tryExecute('Default Candidate Skills', (0, candidate_skill_seed_1.createCandidateSkills)(this.dataSource, this.tenant, defaultCandidates, this.defaultOrganization));
        await this.tryExecute('Default Incomes', (0, income_seed_1.createDefaultIncomes)(this.dataSource, this.tenant, [this.defaultOrganization], this.defaultEmployees));
        await this.tryExecute('Default Expenses', (0, expense_seed_1.createDefaultExpenses)(this.dataSource, this.organizations, this.tenant, this.defaultEmployees, categories, organizationVendors));
        await this.tryExecute('Default Employment Types', (0, organization_employment_type_seed_1.seedDefaultEmploymentTypes)(this.dataSource, this.tenant, this.defaultEmployees, this.defaultOrganization));
        await this.tryExecute('Default Goal KPIs', (0, goal_kpi_seed_1.createDefaultGoalKpi)(this.dataSource, this.tenant, this.organizations, this.defaultEmployees));
        const goals = await this.tryExecute('Default Goals', (0, goal_seed_1.createDefaultGoals)(this.dataSource, this.tenant, this.organizations, this.defaultEmployees));
        const keyResults = await this.tryExecute('Default Key Results', (0, keyresult_seed_1.createDefaultKeyResults)(this.dataSource, this.tenant, this.defaultEmployees, goals));
        await this.tryExecute('Default Key Result Updates', (0, keyresult_update_seed_1.createDefaultKeyResultUpdates)(this.dataSource, this.tenant, this.defaultOrganization, keyResults));
        await this.tryExecute('Default Key Result Progress', (0, keyresult_seed_1.updateDefaultKeyResultProgress)(this.dataSource));
        await this.tryExecute('Default Goal Progress', (0, goal_seed_1.updateDefaultGoalProgress)(this.dataSource));
        const approvalPolicies = await this.tryExecute('Default Approval Policies', (0, approval_policy_seed_1.createDefaultApprovalPolicyForOrg)(this.dataSource, {
            orgs: this.organizations,
        }));
        await this.tryExecute('Default Request Approval Employee', (0, request_approval_seed_1.createDefaultRequestApprovalEmployee)(this.dataSource, {
            employees: this.defaultEmployees,
            orgs: this.organizations,
            approvalPolicies
        }));
        await this.tryExecute('Default Equipment Sharing Policies', (0, equipment_sharing_policy_seed_1.createDefaultEquipmentSharingPolicy)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Organization Languages', (0, organization_language_seed_1.createDefaultOrganizationLanguage)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Awards', (0, organization_award_seed_1.createDefaultAwards)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Employee Awards', (0, employee_award_seed_1.createDefaultEmployeeAwards)(this.dataSource, this.tenant, this.defaultEmployees[0]));
        await this.tryExecute('Default Invoices', (0, invoice_seed_1.createDefaultInvoice)(this.dataSource, this.tenant, this.organizations, random_seed_config_1.randomSeedConfig.numberOfInvoicePerOrganization || 50));
        await this.tryExecute('Default Invoice Items', (0, invoice_item_seed_1.createDefaultInvoiceItem)(this.dataSource, this.tenant, this.organizations, random_seed_config_1.randomSeedConfig.numberOfInvoiceItemPerInvoice || 5));
        await this.tryExecute('Default Payment', (0, payment_seed_1.createDefaultPayment)(this.dataSource, this.tenant, this.defaultEmployees, this.organizations));
        await this.tryExecute('Default Pipelines', (0, pipeline_seed_1.createDefaultPipeline)(this.dataSource, this.tenant, this.defaultOrganization));
        await this.tryExecute('Default Employee Appointment', (0, employee_appointment_seed_1.createDefaultEmployeeAppointment)(this.dataSource, this.tenant, this.defaultEmployees, this.defaultOrganization));
        await this.tryExecute('Default Organization Position', (0, organization_position_seed_1.seedDefaultOrganizationPosition)(this.dataSource, this.tenant, this.defaultOrganization));
        await this.tryExecute('Default Organization Documents', (0, organization_document_seed_1.createOrganizationDocuments)(this.dataSource, this.tenant, this.organizations));
        await this.tryExecute('Default Employee TimeOff', (0, time_off_request_seed_1.createDefaultEmployeeTimeOff)(this.dataSource, this.tenant, this.defaultOrganization, this.defaultEmployees, random_seed_config_1.randomSeedConfig.employeeTimeOffPerOrganization || 20));
        await this.tryExecute('Default Candidate Personal Qualities', (0, candidate_personal_qualities_seed_1.createDefaultCandidatePersonalQualities)(this.dataSource, this.tenant, this.defaultOrganization, defaultCandidates));
        await this.tryExecute('Default Candidate Technologies', (0, candidate_technologies_seed_1.createDefaultCandidateTechnologies)(this.dataSource, this.tenant, this.defaultOrganization, defaultCandidates));
        await this.tryExecute('Default Candidate Criterion Rating', (0, candidate_criterion_rating_seed_1.createDefaultCandidateCriterionRating)(this.dataSource, this.tenant, this.defaultOrganization, defaultCandidates));
        await this.tryExecute('Default Equipment Sharing', (0, equipment_sharing_seed_1.createDefaultEquipmentSharing)(this.dataSource, this.tenant, this.defaultOrganization, this.defaultEmployees, random_seed_config_1.randomSeedConfig.equipmentSharingPerTenant || 20));
        await this.tryExecute('Default Organization Recurring Expense', (0, organization_recurring_expense_seed_1.createDefaultOrganizationRecurringExpense)(this.dataSource, this.tenant, this.defaultOrganization));
        await this.tryExecute('Default Availability Slots', (0, availability_slots_seed_1.createDefaultAvailabilitySlots)(this.dataSource, [this.tenant], this.defaultOrganization, this.defaultEmployees, random_seed_config_1.randomSeedConfig.availabilitySlotsPerOrganization || 20));
        await this.tryExecute('Default Email Sent', (0, email_history_seed_1.createDefaultEmailSent)(this.dataSource, this.tenant, this.defaultOrganization, random_seed_config_1.randomSeedConfig.emailsPerOrganization || 20));
        await this.tryExecute('Default TimeSheets', (0, timesheet_seed_1.createDefaultTimeSheet)(this.dataSource, this.configService.config, this.tenant, this.defaultOrganization, this.defaultEmployees));
        // run all plugins default seed method
        await this.bootstrapPluginSeedMethods('onPluginDefaultSeed', (instance) => {
            const pluginName = instance.constructor.name || '(anonymous plugin)';
            console.log(chalk.green(`SEEDED Default Plugin [${pluginName}]`));
        });
        this.log(chalk.magenta(`✅ SEEDED DEFAULT ${index_1.environment.production ? 'PRODUCTION' : ''} DATABASE`));
    }
    /**
     * Populate database with random generated data
     */
    async seedRandomData() {
        this.log(chalk.magenta(`🌱 SEEDING RANDOM ${index_1.environment.production ? 'PRODUCTION' : ''} DATABASE...`));
        await this.tryExecute('Random Tags', (0, tag_seed_1.createTags)(this.dataSource));
        // Platform level data which only need database connection
        this.randomTenants = await (0, tenant_1.createRandomTenants)(this.dataSource, random_seed_config_1.randomSeedConfig.tenants || 1);
        await this.tryExecute('Random Tenant Settings', (0, tenant_setting_seed_1.createDefaultTenantSetting)(this.dataSource, this.randomTenants));
        await this.tryExecute('Random Feature Reports', (0, report_seed_1.createRandomTenantOrganizationsReport)(this.dataSource, this.randomTenants));
        await this.tryExecute('Random Feature Toggle', (0, feature_seed_1.createRandomFeatureToggle)(this.dataSource, this.randomTenants));
        // Independent roles and role permissions for each tenant
        const roles = await (0, role_seed_1.createRoles)(this.dataSource, this.randomTenants);
        await this.tryExecute('Random Tenant Role Permissions', (0, role_permission_seed_1.createRolePermissions)(this.dataSource, roles, this.randomTenants));
        // Tenant level inserts which only need connection, tenant, role
        this.randomTenantOrganizationsMap = await (0, organization_1.createRandomOrganizations)(this.dataSource, this.randomTenants, random_seed_config_1.randomSeedConfig.organizationsPerTenant || 1);
        const tenantSuperAdminsMap = await (0, user_seed_1.createRandomSuperAdminUsers)(this.dataSource, this.randomTenants, 1);
        const tenantUsersMap = await (0, user_seed_1.createRandomUsers)(this.dataSource, this.randomTenants, random_seed_config_1.randomSeedConfig.adminPerOrganization || 1, random_seed_config_1.randomSeedConfig.organizationsPerTenant || 1, random_seed_config_1.randomSeedConfig.employeesPerOrganization || 1, random_seed_config_1.randomSeedConfig.candidatesPerOrganization || 1, random_seed_config_1.randomSeedConfig.managersPerOrganization || 1, random_seed_config_1.randomSeedConfig.dataEntriesPerOrganization || 1, random_seed_config_1.randomSeedConfig.viewersPerOrganization || 1);
        // Organization level inserts which need connection, tenant, organizations, users
        const organizationUsersMap = await (0, user_organization_seed_1.createRandomUsersOrganizations)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, tenantSuperAdminsMap, tenantUsersMap, random_seed_config_1.randomSeedConfig.employeesPerOrganization || 1, random_seed_config_1.randomSeedConfig.adminPerOrganization || 1);
        this.randomOrganizationEmployeesMap = await (0, employee_seed_1.createRandomEmployees)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, organizationUsersMap);
        const tags = await this.tryExecute('Random Organization Tags', (0, tag_seed_1.createRandomOrganizationTags)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Organization Documents', (0, organization_document_seed_1.createRandomOrganizationDocuments)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Product Categories', (0, category_seed_1.createRandomProductCategories)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Product Types', (0, type_seed_1.createRandomProductType)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Products', (0, product_seed_1.createRandomProduct)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Product Option Groups', (0, product_option_seed_1.createRandomProductOptionGroups)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, random_seed_config_1.randomSeedConfig.numberOfOptionGroupPerProduct || 5));
        await this.tryExecute('Random Product Options', (0, product_option_seed_1.createRandomProductOption)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, random_seed_config_1.randomSeedConfig.numberOfOptionPerProduct || 5));
        await this.tryExecute('Random Product Variants', (0, product_variant_seed_1.createRandomProductVariant)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, random_seed_config_1.randomSeedConfig.numberOfVariantPerProduct || 5));
        await this.tryExecute('Random Product Variant Prices', (0, product_variant_price_seed_1.createRandomProductVariantPrice)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Warehouses', (0, warehouse_seed_1.createRandomWarehouses)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Merchants', (0, merchant_seed_1.createRandomMerchants)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Product Variant Settings', (0, product_setting_seed_1.createRandomProductVariantSettings)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Incomes', (0, income_seed_1.createRandomIncomes)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Organization Teams', (0, organization_team_seed_1.createRandomTeam)(this.dataSource, this.randomTenants, roles, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        const randomGoals = await this.tryExecute('Random Goals', (0, goal_seed_1.createRandomGoal)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Key Results', (0, keyresult_seed_1.createRandomKeyResult)(this.dataSource, this.randomTenants, randomGoals, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        const tenantCandidatesMap = await this.tryExecute('Random Candidates', (0, candidate_seed_1.createRandomCandidates)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, tenantUsersMap, random_seed_config_1.randomSeedConfig.candidatesPerOrganization || 1));
        await this.tryExecute('Random Candidate Sources', (0, candidate_source_seed_1.createRandomCandidateSources)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        await this.tryExecute('Random Candidate Documents', (0, candidate_documents_seed_1.createRandomCandidateDocuments)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        await this.tryExecute('Random Candidate Experiences', (0, candidate_experience_seed_1.createRandomCandidateExperience)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        await this.tryExecute('Random Candidate Skills', (0, candidate_skill_seed_1.createRandomCandidateSkills)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        const organizationVendorsMap = await this.tryExecute('Random Organization Vendors', (0, organization_vendor_seed_1.createRandomOrganizationVendors)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Time Off Policies', (0, time_off_policy_seed_1.createRandomTimeOffPolicies)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        const categoriesMap = await this.tryExecute('Random Expense Categories', (0, expense_categories_seed_1.createRandomExpenseCategories)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Expenses', (0, expense_seed_1.createRandomExpenses)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap, organizationVendorsMap, categoriesMap));
        await this.tryExecute('Random Equipments', (0, equipment_seed_1.createRandomEquipments)(this.dataSource, this.randomTenants, random_seed_config_1.randomSeedConfig.equipmentPerTenant || 20));
        await this.tryExecute('Random Equipment Sharing', (0, equipment_sharing_seed_1.createRandomEquipmentSharing)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap, random_seed_config_1.randomSeedConfig.equipmentSharingPerTenant || 20));
        await this.tryExecute('Random Employment Types', (0, organization_employment_type_seed_1.seedRandomEmploymentTypes)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Organization Departments', (0, organization_department_seed_1.seedRandomOrganizationDepartments)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Employee Invites', (0, invite_seed_1.createRandomEmployeeInviteSent)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, tenantSuperAdminsMap, random_seed_config_1.randomSeedConfig.invitePerOrganization || 20));
        await this.tryExecute('Random Organization Positions', (0, organization_position_seed_1.seedRandomOrganizationPosition)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Approval Policies', (0, approval_policy_seed_1.createRandomApprovalPolicyForOrg)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Equipment Sharing Policies', (0, equipment_sharing_policy_seed_1.createRandomEquipmentSharingPolicy)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Request Approvals', (0, request_approval_seed_1.createRandomRequestApproval)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap, random_seed_config_1.randomSeedConfig.requestApprovalPerOrganization || 20));
        await this.tryExecute('Random Organization Projects', (0, organization_project_seed_1.createRandomOrganizationProjects)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, tags, random_seed_config_1.randomSeedConfig.projectsPerOrganization || 10));
        await this.tryExecute('Random Employee Time Off', (0, time_off_request_seed_1.createRandomEmployeeTimeOff)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap, random_seed_config_1.randomSeedConfig.employeeTimeOffPerOrganization || 20));
        await this.tryExecute('Random Email Sent', (0, email_history_seed_1.createRandomEmailSent)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, random_seed_config_1.randomSeedConfig.emailsPerOrganization || 20));
        await this.tryExecute('Random Tasks', (0, task_seed_1.createRandomTask)(this.dataSource, this.randomTenants));
        await this.tryExecute('Random Organization Contacts', (0, organization_contact_seed_1.createRandomOrganizationContact)(this.dataSource, this.randomTenants, random_seed_config_1.randomSeedConfig.noOfContactsPerOrganization));
        await this.tryExecute('Random Invoices', (0, invoice_seed_1.createRandomInvoice)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, random_seed_config_1.randomSeedConfig.numberOfInvoicePerOrganization || 50));
        await this.tryExecute('Random Invoice Items', (0, invoice_item_seed_1.createRandomInvoiceItem)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, random_seed_config_1.randomSeedConfig.numberOfInvoiceItemPerInvoice || 5));
        await this.tryExecute('Random Availability Slots', (0, availability_slots_seed_1.createRandomAvailabilitySlots)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap, random_seed_config_1.randomSeedConfig.availabilitySlotsPerOrganization || 20));
        await this.tryExecute('Random Payments', (0, payment_seed_1.createRandomPayment)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Candidate Educations', (0, candidate_education_seed_1.createRandomCandidateEducations)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        await this.tryExecute('Random Candidate Interviews', (0, candidate_interview_seed_1.createRandomCandidateInterview)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        await this.tryExecute('Random Candidate Technologies', (0, candidate_technologies_seed_1.createRandomCandidateTechnologies)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        await this.tryExecute('Random Candidate Personal Qualities', (0, candidate_personal_qualities_seed_1.createRandomCandidatePersonalQualities)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        await this.tryExecute('Random Awards', (0, organization_award_seed_1.createRandomAwards)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Candidate Interviewers', (0, candidate_interviewers_seed_1.createRandomCandidateInterviewers)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap, tenantCandidatesMap));
        await this.tryExecute('Random Candidate Feedbacks', (0, candidate_feedbacks_seed_1.createRandomCandidateFeedbacks)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        await this.tryExecute('Random Employee Recurring Expenses', (0, employee_recurring_expense_seed_1.createRandomEmployeeRecurringExpense)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Employee Settings', (0, employee_setting_seed_1.createRandomEmployeeSetting)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Organization Languages', (0, organization_language_seed_1.createRandomOrganizationLanguage)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Organization Recurring Expenses', (0, organization_recurring_expense_seed_1.createRandomOrganizationRecurringExpense)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Organization Sprints', (0, organization_sprint_seed_1.createRandomOrganizationSprint)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Organization Team Employees', (0, organization_team_employee_seed_1.createRandomOrganizationTeamEmployee)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Appointment Employees', (0, appointment_employees_seed_1.createRandomAppointmentEmployees)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Employee Appointments', (0, employee_appointment_seed_1.createRandomEmployeeAppointment)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Pipelines', (0, pipeline_seed_1.createRandomPipeline)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Pipeline Stages', (0, pipeline_stage_seed_1.createRandomPipelineStage)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Deals', (0, deal_seed_1.createRandomDeal)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Integrations', (0, integration_tenant_seed_1.createRandomIntegrationTenant)(this.dataSource, this.randomTenants));
        await this.tryExecute('Random Integration Settings', (0, integration_setting_seed_1.createRandomIntegrationSetting)(this.dataSource, this.randomTenants));
        await this.tryExecute('Random Integration Map', (0, integration_map_seed_1.createRandomIntegrationMap)(this.dataSource, this.randomTenants));
        await this.tryExecute('Random Integration Entity Settings', (0, integration_entity_setting_seed_1.createRandomIntegrationEntitySetting)(this.dataSource, this.randomTenants));
        await this.tryExecute('Random Integration Entity Settings Tied Entity', (0, integration_entity_setting_tied_seed_1.createRandomIntegrationEntitySettingTied)(this.dataSource, this.randomTenants));
        await this.tryExecute('Random Request Approval Employee', (0, request_approval_employee_seed_1.createRandomRequestApprovalEmployee)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random Request Approval Team', (0, request_approval_team_seed_1.createRandomRequestApprovalTeam)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap));
        await this.tryExecute('Random Candidate Criterion Ratings', (0, candidate_criterion_rating_seed_1.createRandomCandidateCriterionRating)(this.dataSource, this.randomTenants, tenantCandidatesMap));
        await this.tryExecute('Random Event Types', (0, event_type_seed_1.createRandomEventType)(this.dataSource, this.randomTenants, this.randomTenantOrganizationsMap, this.randomOrganizationEmployeesMap));
        await this.tryExecute('Random TimeSheets', (0, timesheet_seed_1.createRandomTimesheet)(this.dataSource, this.configService.config, this.randomTenants));
        // run all plugins random seed method
        await this.bootstrapPluginSeedMethods('onPluginRandomSeed', (instance) => {
            const pluginName = instance.constructor.name || '(anonymous plugin)';
            console.log(chalk.green(`SEEDED Random Plugin [${pluginName}]`));
        });
        this.log(chalk.magenta(`✅ SEEDED RANDOM ${index_1.environment.production ? 'PRODUCTION' : ''} DATABASE`));
    }
    /**
     * Cleans all the previous generate screenshots, reports etc
     */
    async cleanUpPreviousRuns() {
        this.log(chalk.green(`CLEANING UP FROM PREVIOUS RUNS...`));
        await new Promise((resolve) => {
            const assetOptions = this.configService.assetOptions;
            const dir = index_1.environment.isElectron
                ? path.join(path.resolve(index_1.environment.gauzyUserPath, ...['public']), 'screenshots')
                : path.join(assetOptions.assetPublicPath, 'screenshots');
            // delete old generated screenshots
            (0, rimraf_1.default)(`${dir}/!(rimraf|.gitkeep)`, () => {
                this.log(chalk.green(`✅ CLEANED UP`));
                resolve(true);
            });
        });
    }
    /**
     * Create connection from database
     */
    async createConnection() {
        if (!this.dataSource) {
            this.log('NOTE: DATABASE CONNECTION DOES NOT EXIST YET. NEW ONE WILL BE CREATED!');
        }
        const { dbConnectionOptions } = this.configService;
        if (!this.dataSource || !this.dataSource.isInitialized) {
            try {
                this.log(chalk.green(`CONNECTING TO DATABASE...`));
                const options = {
                    ...dbConnectionOptions,
                    ...this.overrideDbConfig,
                };
                const dataSource = new typeorm_1.DataSource({
                    ...options,
                });
                if (!dataSource.isInitialized) {
                    this.dataSource = await dataSource.initialize();
                    this.log(chalk.green(`✅ CONNECTED TO DATABASE!`));
                }
            }
            catch (error) {
                this.handleError(error, 'Unable to connect to database');
            }
        }
    }
    /**
     * Close connection from database
     */
    async closeConnection() {
        try {
            if (this.dataSource && this.dataSource.isInitialized) {
                await this.dataSource.destroy();
                this.log(chalk.green(`✅ DISCONNECTED TO DATABASE!`));
            }
        }
        catch (error) {
            this.log('NOTE: DATABASE CONNECTION DOES NOT EXIST YET. CANT CLOSE CONNECTION!');
        }
    }
    /**
     * Reset the database, truncate all tables (remove all data)
     */
    async resetDatabase() {
        this.log(chalk.green(`RESETTING DATABASE...`));
        const entities = await this.getEntities();
        await this.cleanAll(entities);
        this.log(chalk.green(`✅ RESET DATABASE SUCCESSFUL`));
    }
    /**
     * Retrieve entities metadata
     */
    async getEntities() {
        const entities = [];
        try {
            this.dataSource.entityMetadatas.forEach((entity) => entities.push({
                name: entity.name,
                tableName: entity.tableName,
            }));
            return entities;
        }
        catch (error) {
            this.handleError(error, 'Unable to retrieve database metadata');
        }
    }
    /**
     * Cleans all the entities
     * Removes all data from database
     */
    async cleanAll(entities) {
        try {
            const manager = this.dataSource.manager;
            const databaseType = (0, utils_1.getDBType)(this.configService.dbConnectionOptions);
            switch (databaseType) {
                case index_1.DatabaseTypeEnum.postgres:
                    const tables = entities.map((entity) => '"' + entity.tableName + '"');
                    const truncateSql = `TRUNCATE TABLE ${tables.join(',')} RESTART IDENTITY CASCADE;`;
                    await manager.query(truncateSql);
                    break;
                case index_1.DatabaseTypeEnum.mysql:
                    // -- disable foreign_key_checks to avoid query failing when there is a foreign key in the table
                    await manager.query(`SET foreign_key_checks = 0;`);
                    for (const entity of entities) {
                        await manager.query(`DELETE FROM \`${entity.tableName}\`;`);
                    }
                    await manager.query(`SET foreign_key_checks = 1;`);
                    break;
                case index_1.DatabaseTypeEnum.sqlite:
                case index_1.DatabaseTypeEnum.betterSqlite3:
                    await manager.query(`PRAGMA foreign_keys = OFF;`);
                    for (const entity of entities) {
                        await manager.query(`DELETE FROM "${entity.tableName}";`);
                    }
                    ;
                    break;
                default:
                    throw Error(`Unsupported database type: ${databaseType}`);
            }
        }
        catch (error) {
            this.handleError(error, 'Unable to clean database');
        }
    }
    /**
     * Bootstrap Plugins Seed Methods
     *
     * @param lifecycleMethod
     * @param closure
     */
    async bootstrapPluginSeedMethods(lifecycleMethod, closure) {
        const plugins = (0, index_2.getPluginModules)(this.configService.plugins);
        for (const plugin of plugins) {
            let classInstance;
            try {
                classInstance = this.moduleRef.get(plugin, { strict: false });
            }
            catch (e) {
                console.log(`Could not find ${plugin.name}`, undefined, e.stack);
            }
            if (classInstance && (0, index_2.hasLifecycleMethod)(classInstance, lifecycleMethod)) {
                await classInstance[lifecycleMethod]();
                if (typeof closure === 'function') {
                    closure(classInstance);
                }
            }
        }
    }
    /**
     * Use this wrapper function for all seed functions which are not essential.
     * Essentials seeds are ONLY those which are required to start the UI/login
     */
    tryExecute(name, p) {
        this.log(chalk.green(`${(0, moment_1.default)().format('DD.MM.YYYY HH:mm:ss')} SEEDING ${name}`));
        return p.then((x) => x, (error) => {
            this.log(chalk.bgRed(`🛑 ERROR: ${error ? error.message : 'unknown'}`));
        });
    }
    handleError(error, message) {
        this.log(chalk.bgRed(`🛑 ERROR: ${message ? message + '-> ' : ''} ${error ? error.message : ''}`));
        throw error;
    }
};
exports.SeedDataService = SeedDataService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.ModuleRef,
        index_1.ConfigService])
], SeedDataService);
//# sourceMappingURL=seed-data.service.js.map