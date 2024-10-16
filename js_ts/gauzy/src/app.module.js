"use strict";
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
exports.AppModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const throttler_1 = require("@nestjs/throttler");
const throttler_behind_proxy_guard_1 = require("throttler/throttler-behind-proxy.guard");
const serve_static_1 = require("@nestjs/serve-static");
const nestjs_cls_1 = require("nestjs-cls");
const nestjs_i18n_1 = require("nestjs-i18n");
const unleash_client_1 = require("unleash-client");
const path = __importStar(require("path"));
const moment_1 = __importDefault(require("moment"));
const contracts_1 = require("../plugins/contracts");
const config_1 = require("../plugins/config");
const integration_github_1 = require("../plugins/plugins/integration-github");
const integration_jira_1 = require("../plugins/plugins/integration-jira");
const core_module_1 = require("./core/core.module");
const request_context_1 = require("./core/context/request-context");
const shared_module_1 = require("./shared/shared.module");
const health_module_1 = require("./health/health.module");
const candidate_interviewers_module_1 = require("./candidate-interviewers/candidate-interviewers.module");
const candidate_skill_module_1 = require("./candidate-skill/candidate-skill.module");
const invoice_module_1 = require("./invoice/invoice.module");
const invoice_item_module_1 = require("./invoice-item/invoice-item.module");
const tag_module_1 = require("./tags/tag.module");
const status_module_1 = require("./tasks/statuses/status.module");
const version_module_1 = require("./tasks/versions/version.module");
const skill_module_1 = require("./skills/skill.module");
const language_module_1 = require("./language/language.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const employee_module_1 = require("./employee/employee.module");
const role_module_1 = require("./role/role.module");
const organization_module_1 = require("./organization/organization.module");
const income_module_1 = require("./income/income.module");
const expense_module_1 = require("./expense/expense.module");
const employee_setting_module_1 = require("./employee-setting/employee-setting.module");
const employee_appointment_module_1 = require("./employee-appointment/employee-appointment.module");
const auth_module_1 = require("./auth/auth.module");
const user_organization_module_1 = require("./user-organization/user-organization.module");
const employee_statistics_module_1 = require("./employee-statistics/employee-statistics.module");
const organization_department_module_1 = require("./organization-department/organization-department.module");
const organization_recurring_expense_module_1 = require("./organization-recurring-expense/organization-recurring-expense.module");
const employee_recurring_expense_module_1 = require("./employee-recurring-expense/employee-recurring-expense.module");
const organization_contact_module_1 = require("./organization-contact/organization-contact.module");
const organization_position_module_1 = require("./organization-position/organization-position.module");
const organization_project_module_1 = require("./organization-project/organization-project.module");
const organization_vendor_module_1 = require("./organization-vendor/organization-vendor.module");
const organization_team_module_1 = require("./organization-team/organization-team.module");
const organization_team_employee_module_1 = require("./organization-team-employee/organization-team-employee.module");
const organization_team_join_request_module_1 = require("./organization-team-join-request/organization-team-join-request.module");
const organization_award_module_1 = require("./organization-award/organization-award.module");
const organization_language_module_1 = require("./organization-language/organization-language.module");
const organization_document_module_1 = require("./organization-document/organization-document.module");
const country_module_1 = require("./country/country.module");
const currency_module_1 = require("./currency/currency.module");
const invite_module_1 = require("./invite/invite.module");
const email_history_module_1 = require("./email-history/email-history.module");
const time_off_policy_module_1 = require("./time-off-policy/time-off-policy.module");
const role_permission_module_1 = require("./role-permission/role-permission.module");
const tenant_module_1 = require("./tenant/tenant.module");
const email_template_module_1 = require("./email-template/email-template.module");
const equipment_module_1 = require("./equipment/equipment.module");
const employee_level_module_1 = require("./employee-level/employee-level.module");
const export_module_1 = require("./export-import/export/export.module");
const import_module_1 = require("./export-import/import/import.module");
const issue_type_module_1 = require("./tasks/issue-type/issue-type.module");
const task_module_1 = require("./tasks/task.module");
const priority_module_1 = require("./tasks/priorities/priority.module");
const related_issue_type_module_1 = require("./tasks/related-issue-type/related-issue-type.module");
const size_module_1 = require("./tasks/sizes/size.module");
const equipment_sharing_module_1 = require("./equipment-sharing/equipment-sharing.module");
const organization_employment_type_module_1 = require("./organization-employment-type/organization-employment-type.module");
const time_tracking_module_1 = require("./time-tracking/time-tracking.module");
const expense_categories_module_1 = require("./expense-categories/expense-categories.module");
const upwork_module_1 = require("./upwork/upwork.module");
const candidate_module_1 = require("./candidate/candidate.module");
const product_category_module_1 = require("./product-category/product-category.module");
const product_type_module_1 = require("./product-type/product-type.module");
const product_module_1 = require("./product/product.module");
const integration_setting_module_1 = require("./integration-setting/integration-setting.module");
const integration_map_module_1 = require("./integration-map/integration-map.module");
const product_variant_price_module_1 = require("./product-variant-price/product-variant-price-module");
const product_variant_module_1 = require("./product-variant/product-variant.module");
const integration_entity_setting_module_1 = require("./integration-entity-setting/integration-entity-setting.module");
const integration_entity_setting_tied_module_1 = require("./integration-entity-setting-tied/integration-entity-setting-tied.module");
const candidate_education_module_1 = require("./candidate-education/candidate-education.module");
const candidate_source_module_1 = require("./candidate-source/candidate-source.module");
const candidate_documents_module_1 = require("./candidate-documents/candidate-documents.module");
const candidate_experience_module_1 = require("./candidate-experience/candidate-experience.module");
const candidate_feedbacks_module_1 = require("./candidate-feedbacks/candidate-feedbacks.module");
const product_setting_module_1 = require("./product-setting/product-setting.module");
const integration_module_1 = require("./integration/integration.module");
const integration_tenant_module_1 = require("./integration-tenant/integration-tenant.module");
const candidate_interview_module_1 = require("./candidate-interview/candidate-interview.module");
const appointment_employees_module_1 = require("./appointment-employees/appointment-employees.module");
const approval_policy_module_1 = require("./approval-policy/approval-policy.module");
const request_approval_employee_module_1 = require("./request-approval-employee/request-approval-employee.module");
const request_approval_module_1 = require("./request-approval/request-approval.module");
const event_type_module_1 = require("./event-types/event-type.module");
const availability_slots_module_1 = require("./availability-slots/availability-slots.module");
const pipeline_module_1 = require("./pipeline/pipeline.module");
const payment_module_1 = require("./payment/payment.module");
const candidate_personal_qualities_module_1 = require("./candidate-personal-qualities/candidate-personal-qualities.module");
const pipeline_stage_module_1 = require("./pipeline-stage/pipeline-stage.module");
const candidate_technologies_module_1 = require("./candidate-technologies/candidate-technologies.module");
const goal_module_1 = require("./goal/goal.module");
const keyresult_module_1 = require("./keyresult/keyresult.module");
const request_approval_team_module_1 = require("./request-approval-team/request-approval-team.module");
const keyresult_update_module_1 = require("./keyresult-update/keyresult-update.module");
const candidate_criterion_rating_module_1 = require("./candidate-criterions-rating/candidate-criterion-rating.module");
const goal_time_frame_module_1 = require("./goal-time-frame/goal-time-frame.module");
const estimate_email_module_1 = require("./estimate-email/estimate-email.module");
const time_off_request_module_1 = require("./time-off-request/time-off-request.module");
const deal_module_1 = require("./deal/deal.module");
const organization_sprint_module_1 = require("./organization-sprint/organization-sprint.module");
const goal_kpi_module_1 = require("./goal-kpi/goal-kpi.module");
const goal_general_setting_module_1 = require("./goal-general-setting/goal-general-setting.module");
const equipment_sharing_policy_module_1 = require("./equipment-sharing-policy/equipment-sharing-policy.module");
const goal_template_module_1 = require("./goal-template/goal-template.module");
const keyresult_template_module_1 = require("./keyresult-template/keyresult-template.module");
const employee_award_module_1 = require("./employee-award/employee-award.module");
const invoice_estimate_history_module_1 = require("./invoice-estimate-history/invoice-estimate-history.module");
const goal_kpi_template_module_1 = require("./goal-kpi-template/goal-kpi-template.module");
const tenant_setting_module_1 = require("./tenant/tenant-setting/tenant-setting.module");
const report_module_1 = require("./reports/report.module");
const custom_smtp_module_1 = require("./custom-smtp/custom-smtp.module");
const feature_module_1 = require("./feature/feature.module");
const image_asset_module_1 = require("./image-asset/image-asset.module");
const helper_1 = require("./helper");
const accounting_template_module_1 = require("./accounting-template/accounting-template.module");
const seeder_module_1 = require("./core/seeds/seeder.module");
const warehouse_module_1 = require("./warehouse/warehouse.module");
const merchant_module_1 = require("./merchant/merchant.module");
const gauzy_cloud_module_1 = require("./gauzy-cloud/gauzy-cloud.module");
const contact_module_1 = require("./contact/contact.module");
const public_share_module_1 = require("./public-share/public-share.module");
const interceptors_1 = require("./core/interceptors");
const email_reset_module_1 = require("./email-reset/email-reset.module");
const task_linked_issue_module_1 = require("./tasks/linked-issue/task-linked-issue.module");
const organization_task_setting_module_1 = require("./organization-task-setting/organization-task-setting.module");
const task_estimation_module_1 = require("./tasks/estimation/task-estimation.module");
const daily_plan_module_1 = require("./tasks/daily-plan/daily-plan.module");
const social_account_module_1 = require("./auth/social-account/social-account.module");
const { unleashConfig, github, jira } = config_1.environment;
if (unleashConfig.url) {
    const unleashInstanceConfig = {
        appName: unleashConfig.appName,
        url: unleashConfig.url,
        instanceId: unleashConfig.instanceId,
        refreshInterval: unleashConfig.refreshInterval,
        metricsInterval: unleashConfig.metricsInterval,
        // we may disable Metrics completely in production or in demo env
        disableMetrics: false,
        // we may use Redis storage provider instead of in memory
        storageProvider: new unleash_client_1.InMemStorageProvider()
    };
    if (unleashConfig.apiKey) {
        unleashInstanceConfig.customHeaders = {
            Authorization: unleashConfig.apiKey
        };
    }
    console.log(`Using Unleash Config: ${JSON.stringify(unleashInstanceConfig)}`);
    const instance = (0, unleash_client_1.initialize)(unleashInstanceConfig);
    // metrics hooks
    instance.on('registered', (client) => {
        console.log('Unleash Client Registered');
    });
    instance.on('error', console.error);
    instance.on('warn', console.log);
}
else {
    console.log('Unleash Client Not Registered. UNLEASH_API_URL configuration is not provided.');
}
if (config_1.environment.THROTTLE_ENABLED) {
    console.log('Throttle Enabled');
    const ttlValue = config_1.environment.THROTTLE_TTL;
    console.log('Throttle TTL: ', ttlValue);
    const limit = config_1.environment.THROTTLE_LIMIT;
    console.log('Throttle Limit: ', limit);
}
let AppModule = exports.AppModule = class AppModule {
    clsService;
    constructor(clsService) {
        this.clsService = clsService;
        // Set Monday as start of the week
        moment_1.default.updateLocale(contracts_1.LanguagesEnum.ENGLISH, {
            week: {
                dow: 1
            }
        });
    }
    onModuleInit() {
        // Set the ClsService in RequestContext one time on app start before any request
        request_context_1.RequestContext.setClsService(this.clsService);
        console.log('AppModule initialized, ClsService set in RequestContext.');
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_cls_1.ClsModule.forRoot({
                global: true,
                middleware: { mount: false }
            }),
            ...(process.env.REDIS_ENABLED === 'true'
                ? [
                    cache_manager_1.CacheModule.registerAsync({
                        isGlobal: true,
                        useFactory: async () => {
                            const url = process.env.REDIS_URL ||
                                (process.env.REDIS_TLS === 'true'
                                    ? `rediss://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
                                    : `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
                            console.log('REDIS_URL: ', url);
                            let host, port, username, password;
                            const isTls = url.startsWith('rediss://');
                            // Removing the protocol part
                            let authPart = url.split('://')[1];
                            // Check if the URL contains '@' (indicating the presence of username/password)
                            if (authPart.includes('@')) {
                                // Splitting user:password and host:port
                                let [userPass, hostPort] = authPart.split('@');
                                [username, password] = userPass.split(':');
                                [host, port] = hostPort.split(':');
                            }
                            else {
                                // If there is no '@', it means there is no username/password
                                [host, port] = authPart.split(':');
                            }
                            port = parseInt(port);
                            const storeOptions = {
                                url: url,
                                username: username,
                                password: password,
                                isolationPoolOptions: {
                                    min: 1,
                                    max: 100
                                },
                                socket: {
                                    tls: isTls,
                                    host: host,
                                    port: port,
                                    passphrase: password,
                                    rejectUnauthorized: process.env.NODE_ENV === 'production'
                                },
                                ttl: 60 * 60 * 24 * 7 // 1 week,
                            };
                            const store = await (0, cache_manager_redis_yet_1.redisStore)(storeOptions);
                            store.client
                                .on('error', (err) => {
                                console.log('Redis Cache Client Error: ', err);
                            })
                                .on('connect', () => {
                                console.log('Redis Cache Client Connected');
                            })
                                .on('ready', () => {
                                console.log('Redis Cache Client Ready');
                            })
                                .on('reconnecting', () => {
                                console.log('Redis Cache Client Reconnecting');
                            })
                                .on('end', () => {
                                console.log('Redis Cache Client End');
                            });
                            // ping Redis
                            const res = await store.client.ping();
                            console.log('Redis Cache Client Cache Ping: ', res);
                            return {
                                store: () => store
                            };
                        }
                    })
                ]
                : [cache_manager_1.CacheModule.register({ isGlobal: true })]),
            serve_static_1.ServeStaticModule.forRootAsync({
                useFactory: async (configService) => {
                    console.log('Serve Static Module Creating');
                    return await (0, helper_1.resolveServeStaticPath)(configService);
                },
                inject: [config_1.ConfigService],
                imports: []
            }),
            platform_express_1.MulterModule.register(),
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: contracts_1.LanguagesEnum.ENGLISH,
                loaderOptions: {
                    path: path.resolve(__dirname, 'i18n/'),
                    watch: !config_1.environment.production
                },
                resolvers: [new nestjs_i18n_1.HeaderResolver(['language'])]
            }),
            // Probot Configuration
            integration_github_1.ProbotModule.forRoot({
                isGlobal: true,
                // Webhook URL in GitHub will be: https://api.gauzy.co/api/integration/github/webhook
                path: 'integration/github/webhook',
                config: {
                    /** Client Configuration */
                    clientId: github.clientId,
                    clientSecret: github.clientSecret,
                    appId: github.appId,
                    privateKey: github.appPrivateKey,
                    webhookSecret: github.webhookSecret
                }
            }),
            integration_jira_1.JiraModule.forRoot({
                isGlobal: true,
                config: {
                    appName: jira.appName,
                    appDescription: jira.appDescription,
                    appKey: jira.appKey,
                    baseUrl: jira.baseUrl,
                    vendorName: jira.vendorName,
                    vendorUrl: jira.vendorUrl
                }
            }),
            ...(config_1.environment.THROTTLE_ENABLED
                ? [
                    throttler_1.ThrottlerModule.forRootAsync({
                        inject: [config_1.ConfigService],
                        useFactory: () => {
                            return [
                                {
                                    ttl: config_1.environment.THROTTLE_TTL,
                                    limit: config_1.environment.THROTTLE_LIMIT
                                }
                            ];
                        }
                    })
                ]
                : []),
            health_module_1.HealthModule,
            core_module_1.CoreModule,
            shared_module_1.SharedModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            social_account_module_1.SocialAccountModule,
            employee_module_1.EmployeeModule,
            employee_recurring_expense_module_1.EmployeeRecurringExpenseModule,
            employee_award_module_1.EmployeeAwardModule,
            candidate_module_1.CandidateModule,
            candidate_documents_module_1.CandidateDocumentsModule,
            candidate_source_module_1.CandidateSourceModule,
            candidate_education_module_1.CandidateEducationModule,
            candidate_experience_module_1.CandidateExperienceModule,
            candidate_skill_module_1.CandidateSkillModule,
            candidate_feedbacks_module_1.CandidateFeedbacksModule,
            candidate_interview_module_1.CandidateInterviewModule,
            candidate_interviewers_module_1.CandidateInterviewersModule,
            candidate_personal_qualities_module_1.CandidatePersonalQualitiesModule,
            candidate_technologies_module_1.CandidateTechnologiesModule,
            candidate_criterion_rating_module_1.CandidateCriterionsRatingModule,
            custom_smtp_module_1.CustomSmtpModule,
            export_module_1.ExportModule,
            import_module_1.ImportModule,
            employee_setting_module_1.EmployeeSettingModule,
            employee_statistics_module_1.EmployeeStatisticsModule,
            employee_appointment_module_1.EmployeeAppointmentModule,
            appointment_employees_module_1.AppointmentEmployeesModule,
            role_module_1.RoleModule,
            organization_module_1.OrganizationModule,
            income_module_1.IncomeModule,
            expense_module_1.ExpenseModule,
            user_organization_module_1.UserOrganizationModule,
            organization_department_module_1.OrganizationDepartmentModule,
            organization_recurring_expense_module_1.OrganizationRecurringExpenseModule,
            organization_contact_module_1.OrganizationContactModule,
            organization_position_module_1.OrganizationPositionModule,
            organization_project_module_1.OrganizationProjectModule,
            organization_vendor_module_1.OrganizationVendorModule,
            organization_award_module_1.OrganizationAwardModule,
            organization_language_module_1.OrganizationLanguageModule,
            organization_sprint_module_1.OrganizationSprintModule,
            organization_team_module_1.OrganizationTeamModule,
            organization_team_employee_module_1.OrganizationTeamEmployeeModule,
            organization_team_join_request_module_1.OrganizationTeamJoinRequestModule,
            organization_document_module_1.OrganizationDocumentModule,
            request_approval_employee_module_1.RequestApprovalEmployeeModule,
            request_approval_team_module_1.RequestApprovalTeamModule,
            email_history_module_1.EmailHistoryModule,
            email_template_module_1.EmailTemplateModule,
            country_module_1.CountryModule,
            currency_module_1.CurrencyModule,
            invite_module_1.InviteModule,
            time_off_policy_module_1.TimeOffPolicyModule,
            time_off_request_module_1.TimeOffRequestModule,
            approval_policy_module_1.ApprovalPolicyModule,
            equipment_sharing_policy_module_1.EquipmentSharingPolicyModule,
            request_approval_module_1.RequestApprovalModule,
            role_permission_module_1.RolePermissionModule,
            tenant_module_1.TenantModule,
            tenant_setting_module_1.TenantSettingModule,
            tag_module_1.TagModule,
            skill_module_1.SkillModule,
            language_module_1.LanguageModule,
            invoice_module_1.InvoiceModule,
            invoice_item_module_1.InvoiceItemModule,
            payment_module_1.PaymentModule,
            estimate_email_module_1.EstimateEmailModule,
            goal_module_1.GoalModule,
            goal_time_frame_module_1.GoalTimeFrameModule,
            goal_general_setting_module_1.GoalGeneralSettingModule,
            keyresult_module_1.KeyResultModule,
            keyresult_update_module_1.KeyResultUpdateModule,
            employee_level_module_1.EmployeeLevelModule,
            event_type_module_1.EventTypeModule,
            availability_slots_module_1.AvailabilitySlotsModule,
            pipeline_module_1.PipelineModule,
            pipeline_stage_module_1.StageModule,
            deal_module_1.DealModule,
            invoice_estimate_history_module_1.InvoiceEstimateHistoryModule,
            equipment_module_1.EquipmentModule,
            equipment_sharing_module_1.EquipmentSharingModule,
            task_module_1.TaskModule,
            priority_module_1.TaskPriorityModule,
            related_issue_type_module_1.TaskRelatedIssueTypeModule,
            size_module_1.TaskSizeModule,
            status_module_1.TaskStatusModule,
            version_module_1.TaskVersionModule,
            daily_plan_module_1.DailyPlanModule,
            organization_employment_type_module_1.OrganizationEmploymentTypeModule,
            time_tracking_module_1.TimeTrackingModule,
            feature_module_1.FeatureModule,
            report_module_1.ReportModule,
            upwork_module_1.UpworkModule,
            expense_categories_module_1.ExpenseCategoriesModule,
            product_category_module_1.ProductCategoryModule,
            product_type_module_1.ProductTypeModule,
            product_module_1.ProductModule,
            image_asset_module_1.ImageAssetModule,
            integration_module_1.IntegrationModule,
            integration_setting_module_1.IntegrationSettingModule,
            integration_tenant_module_1.IntegrationTenantModule,
            integration_map_module_1.IntegrationMapModule,
            product_variant_price_module_1.ProductVariantPriceModule,
            product_variant_module_1.ProductVariantModule,
            product_setting_module_1.ProductVariantSettingModule,
            integration_entity_setting_module_1.IntegrationEntitySettingModule,
            integration_entity_setting_tied_module_1.IntegrationEntitySettingTiedModule,
            goal_kpi_module_1.GoalKpiModule,
            goal_template_module_1.GoalTemplateModule,
            keyresult_template_module_1.KeyresultTemplateModule,
            goal_kpi_template_module_1.GoalKpiTemplateModule,
            accounting_template_module_1.AccountingTemplateModule,
            seeder_module_1.SeederModule,
            warehouse_module_1.WarehouseModule,
            merchant_module_1.MerchantModule,
            gauzy_cloud_module_1.GauzyCloudModule,
            contact_module_1.ContactModule,
            public_share_module_1.PublicShareModule,
            email_reset_module_1.EmailResetModule,
            issue_type_module_1.IssueTypeModule,
            task_linked_issue_module_1.TaskLinkedIssueModule,
            organization_task_setting_module_1.OrganizationTaskSettingModule,
            task_estimation_module_1.TaskEstimationModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            ...(config_1.environment.THROTTLE_ENABLED
                ? [
                    {
                        provide: core_1.APP_GUARD,
                        useClass: throttler_behind_proxy_guard_1.ThrottlerBehindProxyGuard
                    }
                ]
                : []),
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.TransformInterceptor
            }
        ],
        exports: []
    }),
    __metadata("design:paramtypes", [nestjs_cls_1.ClsService])
], AppModule);
//# sourceMappingURL=app.module.js.map