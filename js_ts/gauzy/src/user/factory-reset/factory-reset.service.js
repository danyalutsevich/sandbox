"use strict";
// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta
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
exports.FactoryResetService = void 0;
const index_1 = require("../../../plugins/config/dist/index");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("core");
const typeorm_2 = require("typeorm");
const underscore_1 = require("underscore");
const internal_1 = require("../../core/entities/internal");
const type_orm_activity_repository_1 = require("../../time-tracking/activity/repository/type-orm-activity.repository");
const mikro_orm_activity_repository_1 = require("../../time-tracking/activity/repository/mikro-orm-activity.repository");
const mikro_orm_appointment_employee_repository_1 = require("../../appointment-employees/repository/mikro-orm-appointment-employee.repository");
const type_orm_appointment_employee_repository_1 = require("../../appointment-employees/repository/type-orm-appointment-employee.repository");
const mikro_orm_approval_policy_repository_1 = require("../../approval-policy/repository/mikro-orm-approval-policy.repository");
const type_orm_approval_policy_repository_1 = require("../../approval-policy/repository/type-orm-approval-policy.repository");
const mikro_orm_availability_slot_repository_1 = require("../../availability-slots/repository/mikro-orm-availability-slot.repository");
const type_orm_availability_slot_repository_1 = require("../../availability-slots/repository/type-orm-availability-slot.repository");
const mikro_orm_candidate_criterions_rating_repository_1 = require("../../candidate-criterions-rating/repository/mikro-orm-candidate-criterions-rating.repository");
const type_orm_candidate_criterions_rating_repository_1 = require("../../candidate-criterions-rating/repository/type-orm-candidate-criterions-rating.repository");
const mikro_orm_candidate_document_repository_1 = require("../../candidate-documents/repository/mikro-orm-candidate-document.repository");
const type_orm_candidate_document_repository_1 = require("../../candidate-documents/repository/type-orm-candidate-document.repository");
const mikro_orm_candidate_education_repository_1 = require("../../candidate-education/repository/mikro-orm-candidate-education.repository");
const type_orm_candidate_education_repository_1 = require("../../candidate-education/repository/type-orm-candidate-education.repository");
const mikro_orm_candidate_experience_repository_1 = require("../../candidate-experience/repository/mikro-orm-candidate-experience.repository");
const type_orm_candidate_experience_repository_1 = require("../../candidate-experience/repository/type-orm-candidate-experience.repository");
const mikro_orm_candidate_feedback_repository_1 = require("../../candidate-feedbacks/repository/mikro-orm-candidate-feedback.repository");
const type_orm_candidate_feedback_repository_1 = require("../../candidate-feedbacks/repository/type-orm-candidate-feedback.repository");
const mikro_orm_candidate_interview_repository_1 = require("../../candidate-interview/repository/mikro-orm-candidate-interview.repository");
const type_orm_candidate_interview_repository_1 = require("../../candidate-interview/repository/type-orm-candidate-interview.repository");
const mikro_orm_candidate_interviewers_repository_1 = require("../../candidate-interviewers/repository/mikro-orm-candidate-interviewers.repository");
const type_orm_candidate_interviewers_repository_1 = require("../../candidate-interviewers/repository/type-orm-candidate-interviewers.repository");
const mikro_orm_candidate_skill_repository_1 = require("../../candidate-skill/repository/mikro-orm-candidate-skill.repository");
const type_orm_candidate_skill_repository_1 = require("../../candidate-skill/repository/type-orm-candidate-skill.repository");
const mikro_orm_candidate_source_repository_1 = require("../../candidate-source/repository/mikro-orm-candidate-source.repository");
const type_orm_candidate_source_repository_1 = require("../../candidate-source/repository/type-orm-candidate-source.repository");
const mikro_orm_candidate_technologies_repository_1 = require("../../candidate-technologies/repository/mikro-orm-candidate-technologies.repository");
const type_orm_candidate_technologies_repository_1 = require("../../candidate-technologies/repository/type-orm-candidate-technologies.repository");
const mikro_orm_candidate_repository_1 = require("../../candidate/repository/mikro-orm-candidate.repository");
const type_orm_candidate_repository_1 = require("../../candidate/repository/type-orm-candidate.repository");
const mikro_orm_contact_repository_1 = require("../../contact/repository/mikro-orm-contact.repository");
const type_orm_contact_repository_1 = require("../../contact/repository/type-orm-contact.repository");
const mikro_orm_deal_repository_1 = require("../../deal/repository/mikro-orm-deal.repository");
const type_orm_deal_repository_1 = require("../../deal/repository/type-orm-deal.repository");
const mikro_orm_email_history_repository_1 = require("../../email-history/repository/mikro-orm-email-history.repository");
const type_orm_email_history_repository_1 = require("../../email-history/repository/type-orm-email-history.repository");
const mikro_orm_employee_appointment_repository_1 = require("../../employee-appointment/repository/mikro-orm-employee-appointment.repository");
const type_orm_employee_appointment_repository_1 = require("../../employee-appointment/repository/type-orm-employee-appointment.repository");
const mikro_orm_employee_award_repository_1 = require("../../employee-award/repository/mikro-orm-employee-award.repository");
const type_orm_employee_award_repository_1 = require("../../employee-award/repository/type-orm-employee-award.repository");
const mikro_orm_employee_level_repository_1 = require("../../employee-level/repository/mikro-orm-employee-level.repository");
const type_orm_employee_level_repository_1 = require("../../employee-level/repository/type-orm-employee-level.repository");
const mikro_orm_employee_recurring_expense_repository_1 = require("../../employee-recurring-expense/repository/mikro-orm-employee-recurring-expense.repository");
const type_orm_employee_recurring_expense_repository_1 = require("../../employee-recurring-expense/repository/type-orm-employee-recurring-expense.repository");
const mikro_orm_employee_setting_repository_1 = require("../../employee-setting/repository/mikro-orm-employee-setting.repository");
const type_orm_employee_setting_repository_1 = require("../../employee-setting/repository/type-orm-employee-setting.repository");
const mikro_orm_employee_repository_1 = require("../../employee/repository/mikro-orm-employee.repository");
const type_orm_employee_repository_1 = require("../../employee/repository/type-orm-employee.repository");
const mikro_orm_equipment_sharing_repository_1 = require("../../equipment-sharing/repository/mikro-orm-equipment-sharing.repository");
const type_orm_equipment_sharing_repository_1 = require("../../equipment-sharing/repository/type-orm-equipment-sharing.repository");
const mikro_orm_equipment_repository_1 = require("../../equipment/repository/mikro-orm-equipment.repository");
const type_orm_equipment_repository_1 = require("../../equipment/repository/type-orm-equipment.repository");
const mikro_orm_estimate_email_repository_1 = require("../../estimate-email/repository/mikro-orm-estimate-email.repository");
const type_orm_estimate_email_repository_1 = require("../../estimate-email/repository/type-orm-estimate-email.repository");
const mikro_orm_event_type_repository_1 = require("../../event-types/repository/mikro-orm-event-type.repository");
const type_orm_event_types_repository_1 = require("../../event-types/repository/type-orm-event-types.repository");
const mikro_orm_expense_category_repository_1 = require("../../expense-categories/repository/mikro-orm-expense-category.repository");
const type_orm_expense_category_repository_1 = require("../../expense-categories/repository/type-orm-expense-category.repository");
const mikro_orm_expense_repository_1 = require("../../expense/repository/mikro-orm-expense.repository");
const type_orm_expense_repository_1 = require("../../expense/repository/type-orm-expense.repository");
const mikro_orm_feature_organization_repository_1 = require("../../feature/repository/mikro-orm-feature-organization.repository");
const type_orm_feature_organization_repository_1 = require("../../feature/repository/type-orm-feature-organization.repository");
const mikro_orm_goal_kpi_template_repository_1 = require("../../goal-kpi-template/repository/mikro-orm-goal-kpi-template.repository");
const type_orm_goal_kpi_template_repository_1 = require("../../goal-kpi-template/repository/type-orm-goal-kpi-template.repository");
const mikro_orm_goal_kpi_repository_1 = require("../../goal-kpi/repository/mikro-orm-goal-kpi.repository");
const type_orm_goal_kpi_repository_1 = require("../../goal-kpi/repository/type-orm-goal-kpi.repository");
const mikro_orm_goal_template_repository_1 = require("../../goal-template/repository/mikro-orm-goal-template.repository");
const type_orm_goal_template_repository_1 = require("../../goal-template/repository/type-orm-goal-template.repository");
const mikro_orm_goal_time_frame_repository_1 = require("../../goal-time-frame/repository/mikro-orm-goal-time-frame.repository");
const type_orm_goal_time_frame_repository_1 = require("../../goal-time-frame/repository/type-orm-goal-time-frame.repository");
const mikro_orm_goal_repository_1 = require("../../goal/repository/mikro-orm-goal.repository");
const type_orm_goal_repository_1 = require("../../goal/repository/type-orm-goal.repository");
const mikro_orm_income_repository_1 = require("../../income/repository/mikro-orm-income.repository");
const type_orm_income_repository_1 = require("../../income/repository/type-orm-income.repository");
const mikro_orm_integration_entity_setting_tied_repository_1 = require("../../integration-entity-setting-tied/repository/mikro-orm-integration-entity-setting-tied.repository");
const type_orm_integration_entity_setting_tied_repository_1 = require("../../integration-entity-setting-tied/repository/type-orm-integration-entity-setting-tied.repository");
const mikro_orm_integration_entity_setting_repository_1 = require("../../integration-entity-setting/repository/mikro-orm-integration-entity-setting.repository");
const type_orm_integration_entity_setting_repository_1 = require("../../integration-entity-setting/repository/type-orm-integration-entity-setting.repository");
const mikro_orm_integration_map_repository_1 = require("../../integration-map/repository/mikro-orm-integration-map.repository");
const type_orm_integration_map_repository_1 = require("../../integration-map/repository/type-orm-integration-map.repository");
const mikro_orm_integration_setting_repository_1 = require("../../integration-setting/repository/mikro-orm-integration-setting.repository");
const type_orm_integration_setting_repository_1 = require("../../integration-setting/repository/type-orm-integration-setting.repository");
const mikro_orm_integration_tenant_repository_1 = require("../../integration-tenant/repository/mikro-orm-integration-tenant.repository");
const type_orm_integration_tenant_repository_1 = require("../../integration-tenant/repository/type-orm-integration-tenant.repository");
const mikro_orm_invite_repository_1 = require("../../invite/repository/mikro-orm-invite.repository");
const type_orm_invite_repository_1 = require("../../invite/repository/type-orm-invite.repository");
const mikro_orm_invoice_estimate_history_repository_1 = require("../../invoice-estimate-history/repository/mikro-orm-invoice-estimate-history.repository");
const type_orm_invoice_estimate_history_repository_1 = require("../../invoice-estimate-history/repository/type-orm-invoice-estimate-history.repository");
const mikro_orm_invoice_item_repository_1 = require("../../invoice-item/repository/mikro-orm-invoice-item.repository");
const type_orm_invoice_item_repository_1 = require("../../invoice-item/repository/type-orm-invoice-item.repository");
const mikro_orm_invoice_repository_1 = require("../../invoice/repository/mikro-orm-invoice.repository");
const type_orm_invoice_repository_1 = require("../../invoice/repository/type-orm-invoice.repository");
const mikro_orm_keyresult_template_repository_1 = require("../../keyresult-template/repository/mikro-orm-keyresult-template.repository");
const type_orm_keyresult_template_repository_1 = require("../../keyresult-template/repository/type-orm-keyresult-template.repository");
const mikro_orm_keyresult_update_repository_1 = require("../../keyresult-update/repository/mikro-orm-keyresult-update.repository");
const type_orm_keyresult_update_repository_1 = require("../../keyresult-update/repository/type-orm-keyresult-update.repository");
const mikro_orm_keyresult_repository_1 = require("../../keyresult/repository/mikro-orm-keyresult.repository");
const type_orm_keyresult_repository_1 = require("../../keyresult/repository/type-orm-keyresult.repository");
const mikro_orm_organization_award_repository_1 = require("../../organization-award/repository/mikro-orm-organization-award.repository");
const type_orm_organization_award_repository_1 = require("../../organization-award/repository/type-orm-organization-award.repository");
const mikro_orm_organization_contact_repository_1 = require("../../organization-contact/repository/mikro-orm-organization-contact.repository");
const type_orm_organization_contact_repository_1 = require("../../organization-contact/repository/type-orm-organization-contact.repository");
const mikro_orm_organization_department_repository_1 = require("../../organization-department/repository/mikro-orm-organization-department.repository");
const type_orm_organization_department_repository_1 = require("../../organization-department/repository/type-orm-organization-department.repository");
const mikro_orm_organization_document_repository_1 = require("../../organization-document/repository/mikro-orm-organization-document.repository");
const type_orm_organization_document_repository_1 = require("../../organization-document/repository/type-orm-organization-document.repository");
const mikro_orm_organization_employment_type_repository_1 = require("../../organization-employment-type/repository/mikro-orm-organization-employment-type.repository");
const type_orm_organization_employment_type_repository_1 = require("../../organization-employment-type/repository/type-orm-organization-employment-type.repository");
const mikro_orm_organization_language_repository_1 = require("../../organization-language/repository/mikro-orm-organization-language.repository");
const type_orm_organization_language_repository_1 = require("../../organization-language/repository/type-orm-organization-language.repository");
const mikro_orm_organization_position_repository_1 = require("../../organization-position/repository/mikro-orm-organization-position.repository");
const type_orm_organization_position_repository_1 = require("../../organization-position/repository/type-orm-organization-position.repository");
const mikro_orm_organization_project_repository_1 = require("../../organization-project/repository/mikro-orm-organization-project.repository");
const type_orm_organization_project_repository_1 = require("../../organization-project/repository/type-orm-organization-project.repository");
const mikro_orm_organization_recurring_expense_repository_1 = require("../../organization-recurring-expense/repository/mikro-orm-organization-recurring-expense.repository");
const type_orm_organization_recurring_expense_repository_1 = require("../../organization-recurring-expense/repository/type-orm-organization-recurring-expense.repository");
const mikro_orm_organization_sprint_repository_1 = require("../../organization-sprint/repository/mikro-orm-organization-sprint.repository");
const type_orm_organization_sprint_repository_1 = require("../../organization-sprint/repository/type-orm-organization-sprint.repository");
const mikro_orm_organization_team_employee_repository_1 = require("../../organization-team-employee/repository/mikro-orm-organization-team-employee.repository");
const type_orm_organization_team_employee_repository_1 = require("../../organization-team-employee/repository/type-orm-organization-team-employee.repository");
const mikro_orm_organization_team_repository_1 = require("../../organization-team/repository/mikro-orm-organization-team.repository");
const type_orm_organization_team_repository_1 = require("../../organization-team/repository/type-orm-organization-team.repository");
const mikro_orm_organization_vendor_repository_1 = require("../../organization-vendor/repository/mikro-orm-organization-vendor.repository");
const type_orm_organization_vendor_repository_1 = require("../../organization-vendor/repository/type-orm-organization-vendor.repository");
const mikro_orm_organization_repository_1 = require("../../organization/repository/mikro-orm-organization.repository");
const type_orm_organization_repository_1 = require("../../organization/repository/type-orm-organization.repository");
const mikro_orm_payment_repository_1 = require("../../payment/repository/mikro-orm-payment.repository");
const type_orm_payment_repository_1 = require("../../payment/repository/type-orm-payment.repository");
const mikro_orm_pipeline_stage_repository_1 = require("../../pipeline-stage/repository/mikro-orm-pipeline-stage.repository");
const type_orm_pipeline_stage_repository_1 = require("../../pipeline-stage/repository/type-orm-pipeline-stage.repository");
const mikro_orm_pipeline_repository_1 = require("../../pipeline/repository/mikro-orm-pipeline.repository");
const type_orm_pipeline_repository_1 = require("../../pipeline/repository/type-orm-pipeline.repository");
const mikro_orm_product_category_repository_1 = require("../../product-category/repository/mikro-orm-product-category.repository");
const type_orm_product_category_repository_1 = require("../../product-category/repository/type-orm-product-category.repository");
const mikro_orm_product_option_repository_1 = require("../../product-option/repository/mikro-orm-product-option.repository");
const type_orm_product_option_repository_1 = require("../../product-option/repository/type-orm-product-option.repository");
const mikro_orm_product_setting_repository_1 = require("../../product-setting/repository/mikro-orm-product-setting.repository");
const type_orm_product_setting_repository_1 = require("../../product-setting/repository/type-orm-product-setting.repository");
const mikro_orm_product_variant_price_repository_1 = require("../../product-variant-price/repository/mikro-orm-product-variant-price.repository");
const type_orm_product_variant_price_repository_1 = require("../../product-variant-price/repository/type-orm-product-variant-price.repository");
const mikro_orm_product_variant_repository_1 = require("../../product-variant/repository/mikro-orm-product-variant.repository");
const type_orm_product_variant_repository_1 = require("../../product-variant/repository/type-orm-product-variant.repository");
const mikro_orm_product_repository_1 = require("../../product/repository/mikro-orm-product.repository");
const type_orm_product_repository_1 = require("../../product/repository/type-orm-product.repository");
const mikro_orm_request_approval_repository_1 = require("../../request-approval/repository/mikro-orm-request-approval.repository");
const type_orm_request_approval_repository_1 = require("../../request-approval/repository/type-orm-request-approval.repository");
const mikro_orm_skill_repository_1 = require("../../skills/repository/mikro-orm-skill.repository");
const type_orm_skill_repository_1 = require("../../skills/repository/type-orm-skill.repository");
const mikro_orm_tag_repository_1 = require("../../tags/repository/mikro-orm-tag.repository");
const type_orm_tag_repository_1 = require("../../tags/repository/type-orm-tag.repository");
const mikro_orm_task_repository_1 = require("../../tasks/repository/mikro-orm-task.repository");
const type_orm_task_repository_1 = require("../../tasks/repository/type-orm-task.repository");
const mikro_orm_tenant_setting_repository_1 = require("../../tenant/tenant-setting/repository/mikro-orm-tenant-setting.repository");
const type_orm_tenant_setting_repository_1 = require("../../tenant/tenant-setting/repository/type-orm-tenant-setting.repository");
const mikro_orm_time_off_policy_repository_1 = require("../../time-off-policy/repository/mikro-orm-time-off-policy.repository");
const type_orm_time_off_policy_repository_1 = require("../../time-off-policy/repository/type-orm-time-off-policy.repository");
const mikro_orm_time_off_request_repository_1 = require("../../time-off-request/repository/mikro-orm-time-off-request.repository");
const type_orm_time_off_request_repository_1 = require("../../time-off-request/repository/type-orm-time-off-request.repository");
const mikro_orm_screenshot_repository_1 = require("../../time-tracking/screenshot/repository/mikro-orm-screenshot.repository");
const type_orm_screenshot_repository_1 = require("../../time-tracking/screenshot/repository/type-orm-screenshot.repository");
const mikro_orm_time_log_repository_1 = require("../../time-tracking/time-log/repository/mikro-orm-time-log.repository");
const type_orm_time_log_repository_1 = require("../../time-tracking/time-log/repository/type-orm-time-log.repository");
const mikro_orm_time_slot_repository_1 = require("../../time-tracking/time-slot/repository/mikro-orm-time-slot.repository");
const type_orm_time_slot_repository_1 = require("../../time-tracking/time-slot/repository/type-orm-time-slot.repository");
const mikro_orm_timesheet_repository_1 = require("../../time-tracking/timesheet/repository/mikro-orm-timesheet.repository");
const type_orm_timesheet_repository_1 = require("../../time-tracking/timesheet/repository/type-orm-timesheet.repository");
const mikro_orm_user_organization_repository_1 = require("../../user-organization/repository/mikro-orm-user-organization.repository");
const type_orm_user_organization_repository_1 = require("../../user-organization/repository/type-orm-user-organization.repository");
const mikro_orm_user_repository_1 = require("../../user/repository/mikro-orm-user.repository");
const type_orm_user_repository_1 = require("../../user/repository/type-orm-user.repository");
let FactoryResetService = exports.FactoryResetService = class FactoryResetService {
    typeOrmActivityRepository;
    mikroOrmActivityRepository;
    typeOrmAppointmentEmployeeRepository;
    typeOrmApprovalPolicyRepository;
    typeOrmAvailabilitySlotRepository;
    typeOrmCandidateRepository;
    typeOrmCandidateCriterionsRatingRepository;
    typeOrmCandidateDocumentRepository;
    typeOrmCandidateEducationRepository;
    typeOrmCandidateExperienceRepository;
    typeOrmCandidateFeedbackRepository;
    typeOrmCandidateInterviewRepository;
    typeOrmCandidateInterviewersRepository;
    typeOrmCandidateSkillRepository;
    typeOrmCandidateSourceRepository;
    typeOrmCandidateTechnologiesRepository;
    typeOrmContactRepository;
    typeOrmDealRepository;
    typeOrmEmailHistoryRepository;
    typeOrmEmployeeRepository;
    typeOrmEmployeeAppointmentRepository;
    typeOrmEmployeeAwardRepository;
    typeOrmEmployeeRecurringExpenseRepository;
    typeOrmEmployeeSettingRepository;
    typeOrmEquipmentRepository;
    typeOrmEquipmentSharingRepository;
    typeOrmEstimateEmailRepository;
    typeOrmEventTypeRepository;
    typeOrmExpenseRepository;
    typeOrmExpenseCategoryRepository;
    typeOrmFeatureOrganizationRepository;
    typeOrmGoalRepository;
    typeOrmGoalTemplateRepository;
    typeOrmGoalKPIRepository;
    typeOrmGoalKPITemplateRepository;
    typeOrmGoalTimeFrameRepository;
    typeOrmIncomeRepository;
    typeOrmIntegrationEntitySettingRepository;
    typeOrmIntegrationEntitySettingTiedRepository;
    typeOrmIntegrationMapRepository;
    typeOrmIntegrationSettingRepository;
    typeOrmIntegrationTenantRepository;
    typeOrmInviteRepository;
    typeOrmInvoiceRepository;
    typeOrmInvoiceEstimateHistoryRepository;
    typeOrmInvoiceItemRepository;
    typeOrmKeyResultRepository;
    typeOrmKeyResultTemplateRepository;
    typeOrmKeyResultUpdateRepository;
    typeOrmEmployeeLevelRepository;
    typeOrmOrganizationAwardRepository;
    typeOrmOrganizationRepository;
    typeOrmOrganizationContactRepository;
    typeOrmOrganizationDepartmentRepository;
    typeOrmOrganizationDocumentRepository;
    typeOrmOrganizationEmploymentTypeRepository;
    typeOrmOrganizationLanguageRepository;
    typeOrmOrganizationPositionRepository;
    typeOrmOrganizationProjectRepository;
    typeOrmOrganizationRecurringExpenseRepository;
    typeOrmOrganizationSprintRepository;
    typeOrmOrganizationTeamRepository;
    typeOrmOrganizationTeamEmployeeRepository;
    typeOrmOrganizationVendorRepository;
    typeOrmPaymentRepository;
    typeOrmPipelineRepository;
    typeOrmPipelineStageRepository;
    typeOrmProductRepository;
    typeOrmProductCategoryRepository;
    typeOrmProductOptionRepository;
    typeOrmProductVariantSettingRepository;
    typeOrmProductVariantRepository;
    typeOrmProductVariantPriceRepository;
    typeOrmSkillRepository;
    typeOrmScreenshotRepository;
    typeOrmRequestApprovalRepository;
    typeOrmTagRepository;
    typeOrmTaskRepository;
    typeOrmTimesheetRepository;
    typeOrmTimeLogRepository;
    typeOrmTimeSlotRepository;
    typeOrmTimeOffRequestRepository;
    typeOrmTimeOffPolicyRepository;
    typeOrmTenantSettingRepository;
    typeOrmUserRepository;
    typeOrmUserOrganizationRepository;
    configService;
    repositories;
    constructor(typeOrmActivityRepository, mikroOrmActivityRepository, typeOrmAppointmentEmployeeRepository, mikroOrmAppointmentEmployeeRepository, typeOrmApprovalPolicyRepository, mikroOrmApprovalPolicyRepository, typeOrmAvailabilitySlotRepository, mikroOrmAvailabilitySlotRepository, typeOrmCandidateRepository, mikroOrmCandidateRepository, typeOrmCandidateCriterionsRatingRepository, mikroOrmCandidateCriterionsRatingRepository, typeOrmCandidateDocumentRepository, mikroOrmCandidateDocumentRepository, typeOrmCandidateEducationRepository, mikroOrmCandidateEducationRepository, typeOrmCandidateExperienceRepository, mikroOrmCandidateExperienceRepository, typeOrmCandidateFeedbackRepository, mikroOrmCandidateFeedbackRepository, typeOrmCandidateInterviewRepository, mikroOrmCandidateInterviewRepository, typeOrmCandidateInterviewersRepository, mikroOrmCandidateInterviewersRepository, typeOrmCandidateSkillRepository, mikroOrmCandidateSkillRepository, typeOrmCandidateSourceRepository, mikroOrmCandidateSourceRepository, typeOrmCandidateTechnologiesRepository, mikroOrmCandidateTechnologiesRepository, typeOrmContactRepository, mikroOrmContactRepository, typeOrmDealRepository, mikroOrmDealRepository, typeOrmEmailHistoryRepository, mikroOrmEmailHistoryRepository, typeOrmEmployeeRepository, mikroOrmEmployeeRepository, typeOrmEmployeeAppointmentRepository, mikroOrmEmployeeAppointmentRepository, typeOrmEmployeeAwardRepository, mikroOrmEmployeeAwardRepository, typeOrmEmployeeRecurringExpenseRepository, mikroOrmEmployeeRecurringExpenseRepository, typeOrmEmployeeSettingRepository, mikroOrmEmployeeSettingRepository, typeOrmEquipmentRepository, mikroOrmEquipmentRepository, typeOrmEquipmentSharingRepository, mikroOrmEquipmentSharingRepository, typeOrmEstimateEmailRepository, mikroOrmEstimateEmailRepository, typeOrmEventTypeRepository, mikroOrmEventTypeRepository, typeOrmExpenseRepository, mikroOrmExpenseRepository, typeOrmExpenseCategoryRepository, mikroOrmExpenseCategoryRepository, typeOrmFeatureOrganizationRepository, mikroOrmFeatureOrganizationRepository, typeOrmGoalRepository, mikroOrmGoalRepository, typeOrmGoalTemplateRepository, mikroOrmGoalTemplateRepository, typeOrmGoalKPIRepository, mikroOrmGoalKPIRepository, typeOrmGoalKPITemplateRepository, mikroOrmGoalKPITemplateRepository, typeOrmGoalTimeFrameRepository, mikroOrmGoalTimeFrameRepository, typeOrmIncomeRepository, mikroOrmIncomeRepository, typeOrmIntegrationEntitySettingRepository, mikroOrmIntegrationEntitySettingRepository, typeOrmIntegrationEntitySettingTiedRepository, mikroOrmIntegrationEntitySettingTiedRepository, typeOrmIntegrationMapRepository, mikroOrmIntegrationMapRepository, typeOrmIntegrationSettingRepository, mikroOrmIntegrationSettingRepository, typeOrmIntegrationTenantRepository, mikroOrmIntegrationTenantRepository, typeOrmInviteRepository, mikroOrmInviteRepository, typeOrmInvoiceRepository, mikroOrmInvoiceRepository, typeOrmInvoiceEstimateHistoryRepository, mikroOrmInvoiceEstimateHistoryRepository, typeOrmInvoiceItemRepository, mikroOrmInvoiceItemRepository, typeOrmKeyResultRepository, mikroOrmKeyResultRepository, typeOrmKeyResultTemplateRepository, mikroOrmKeyResultTemplateRepository, typeOrmKeyResultUpdateRepository, mikroOrmKeyResultUpdateRepository, typeOrmEmployeeLevelRepository, mikroOrmEmployeeLevelRepository, typeOrmOrganizationAwardRepository, mikroOrmOrganizationAwardRepository, typeOrmOrganizationRepository, mikroOrmOrganizationRepository, typeOrmOrganizationContactRepository, mikroOrmOrganizationContactRepository, typeOrmOrganizationDepartmentRepository, mikroOrmOrganizationDepartmentRepository, typeOrmOrganizationDocumentRepository, mikroOrmOrganizationDocumentRepository, typeOrmOrganizationEmploymentTypeRepository, mikroOrmOrganizationEmploymentTypeRepository, typeOrmOrganizationLanguageRepository, mikroOrmOrganizationLanguageRepository, typeOrmOrganizationPositionRepository, mikroOrmOrganizationPositionRepository, typeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository, typeOrmOrganizationRecurringExpenseRepository, mikroOrmOrganizationRecurringExpenseRepository, typeOrmOrganizationSprintRepository, mikroOrmOrganizationSprintRepository, typeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository, typeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository, typeOrmOrganizationVendorRepository, mikroOrmOrganizationVendorRepository, typeOrmPaymentRepository, mikroOrmPaymentRepository, typeOrmPipelineRepository, mikroOrmPipelineRepository, typeOrmPipelineStageRepository, mikroOrmPipelineStageRepository, typeOrmProductRepository, mikroOrmProductRepository, typeOrmProductCategoryRepository, mikroOrmProductCategoryRepository, typeOrmProductOptionRepository, mikroOrmProductOptionRepository, typeOrmProductVariantSettingRepository, mikroOrmProductVariantSettingRepository, typeOrmProductVariantRepository, mikroOrmProductVariantRepository, typeOrmProductVariantPriceRepository, mikroOrmProductVariantPriceRepository, typeOrmSkillRepository, mikroOrmSkillRepository, typeOrmScreenshotRepository, mikroOrmScreenshotRepository, typeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository, typeOrmTagRepository, mikroOrmTagRepository, typeOrmTaskRepository, mikroOrmTaskRepository, typeOrmTimesheetRepository, mikroOrmTimesheetRepository, typeOrmTimeLogRepository, mikroOrmTimeLogRepository, typeOrmTimeSlotRepository, mikroOrmTimeSlotRepository, typeOrmTimeOffRequestRepository, mikroOrmTimeOffRequestRepository, typeOrmTimeOffPolicyRepository, mikroOrmTimeOffPolicyRepository, typeOrmTenantSettingRepository, mikroOrmTenantSettingRepository, typeOrmUserRepository, mikroOrmUserRepository, typeOrmUserOrganizationRepository, mikroOrmUserOrganizationRepository, configService) {
        this.typeOrmActivityRepository = typeOrmActivityRepository;
        this.mikroOrmActivityRepository = mikroOrmActivityRepository;
        this.typeOrmAppointmentEmployeeRepository = typeOrmAppointmentEmployeeRepository;
        this.typeOrmApprovalPolicyRepository = typeOrmApprovalPolicyRepository;
        this.typeOrmAvailabilitySlotRepository = typeOrmAvailabilitySlotRepository;
        this.typeOrmCandidateRepository = typeOrmCandidateRepository;
        this.typeOrmCandidateCriterionsRatingRepository = typeOrmCandidateCriterionsRatingRepository;
        this.typeOrmCandidateDocumentRepository = typeOrmCandidateDocumentRepository;
        this.typeOrmCandidateEducationRepository = typeOrmCandidateEducationRepository;
        this.typeOrmCandidateExperienceRepository = typeOrmCandidateExperienceRepository;
        this.typeOrmCandidateFeedbackRepository = typeOrmCandidateFeedbackRepository;
        this.typeOrmCandidateInterviewRepository = typeOrmCandidateInterviewRepository;
        this.typeOrmCandidateInterviewersRepository = typeOrmCandidateInterviewersRepository;
        this.typeOrmCandidateSkillRepository = typeOrmCandidateSkillRepository;
        this.typeOrmCandidateSourceRepository = typeOrmCandidateSourceRepository;
        this.typeOrmCandidateTechnologiesRepository = typeOrmCandidateTechnologiesRepository;
        this.typeOrmContactRepository = typeOrmContactRepository;
        this.typeOrmDealRepository = typeOrmDealRepository;
        this.typeOrmEmailHistoryRepository = typeOrmEmailHistoryRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.typeOrmEmployeeAppointmentRepository = typeOrmEmployeeAppointmentRepository;
        this.typeOrmEmployeeAwardRepository = typeOrmEmployeeAwardRepository;
        this.typeOrmEmployeeRecurringExpenseRepository = typeOrmEmployeeRecurringExpenseRepository;
        this.typeOrmEmployeeSettingRepository = typeOrmEmployeeSettingRepository;
        this.typeOrmEquipmentRepository = typeOrmEquipmentRepository;
        this.typeOrmEquipmentSharingRepository = typeOrmEquipmentSharingRepository;
        this.typeOrmEstimateEmailRepository = typeOrmEstimateEmailRepository;
        this.typeOrmEventTypeRepository = typeOrmEventTypeRepository;
        this.typeOrmExpenseRepository = typeOrmExpenseRepository;
        this.typeOrmExpenseCategoryRepository = typeOrmExpenseCategoryRepository;
        this.typeOrmFeatureOrganizationRepository = typeOrmFeatureOrganizationRepository;
        this.typeOrmGoalRepository = typeOrmGoalRepository;
        this.typeOrmGoalTemplateRepository = typeOrmGoalTemplateRepository;
        this.typeOrmGoalKPIRepository = typeOrmGoalKPIRepository;
        this.typeOrmGoalKPITemplateRepository = typeOrmGoalKPITemplateRepository;
        this.typeOrmGoalTimeFrameRepository = typeOrmGoalTimeFrameRepository;
        this.typeOrmIncomeRepository = typeOrmIncomeRepository;
        this.typeOrmIntegrationEntitySettingRepository = typeOrmIntegrationEntitySettingRepository;
        this.typeOrmIntegrationEntitySettingTiedRepository = typeOrmIntegrationEntitySettingTiedRepository;
        this.typeOrmIntegrationMapRepository = typeOrmIntegrationMapRepository;
        this.typeOrmIntegrationSettingRepository = typeOrmIntegrationSettingRepository;
        this.typeOrmIntegrationTenantRepository = typeOrmIntegrationTenantRepository;
        this.typeOrmInviteRepository = typeOrmInviteRepository;
        this.typeOrmInvoiceRepository = typeOrmInvoiceRepository;
        this.typeOrmInvoiceEstimateHistoryRepository = typeOrmInvoiceEstimateHistoryRepository;
        this.typeOrmInvoiceItemRepository = typeOrmInvoiceItemRepository;
        this.typeOrmKeyResultRepository = typeOrmKeyResultRepository;
        this.typeOrmKeyResultTemplateRepository = typeOrmKeyResultTemplateRepository;
        this.typeOrmKeyResultUpdateRepository = typeOrmKeyResultUpdateRepository;
        this.typeOrmEmployeeLevelRepository = typeOrmEmployeeLevelRepository;
        this.typeOrmOrganizationAwardRepository = typeOrmOrganizationAwardRepository;
        this.typeOrmOrganizationRepository = typeOrmOrganizationRepository;
        this.typeOrmOrganizationContactRepository = typeOrmOrganizationContactRepository;
        this.typeOrmOrganizationDepartmentRepository = typeOrmOrganizationDepartmentRepository;
        this.typeOrmOrganizationDocumentRepository = typeOrmOrganizationDocumentRepository;
        this.typeOrmOrganizationEmploymentTypeRepository = typeOrmOrganizationEmploymentTypeRepository;
        this.typeOrmOrganizationLanguageRepository = typeOrmOrganizationLanguageRepository;
        this.typeOrmOrganizationPositionRepository = typeOrmOrganizationPositionRepository;
        this.typeOrmOrganizationProjectRepository = typeOrmOrganizationProjectRepository;
        this.typeOrmOrganizationRecurringExpenseRepository = typeOrmOrganizationRecurringExpenseRepository;
        this.typeOrmOrganizationSprintRepository = typeOrmOrganizationSprintRepository;
        this.typeOrmOrganizationTeamRepository = typeOrmOrganizationTeamRepository;
        this.typeOrmOrganizationTeamEmployeeRepository = typeOrmOrganizationTeamEmployeeRepository;
        this.typeOrmOrganizationVendorRepository = typeOrmOrganizationVendorRepository;
        this.typeOrmPaymentRepository = typeOrmPaymentRepository;
        this.typeOrmPipelineRepository = typeOrmPipelineRepository;
        this.typeOrmPipelineStageRepository = typeOrmPipelineStageRepository;
        this.typeOrmProductRepository = typeOrmProductRepository;
        this.typeOrmProductCategoryRepository = typeOrmProductCategoryRepository;
        this.typeOrmProductOptionRepository = typeOrmProductOptionRepository;
        this.typeOrmProductVariantSettingRepository = typeOrmProductVariantSettingRepository;
        this.typeOrmProductVariantRepository = typeOrmProductVariantRepository;
        this.typeOrmProductVariantPriceRepository = typeOrmProductVariantPriceRepository;
        this.typeOrmSkillRepository = typeOrmSkillRepository;
        this.typeOrmScreenshotRepository = typeOrmScreenshotRepository;
        this.typeOrmRequestApprovalRepository = typeOrmRequestApprovalRepository;
        this.typeOrmTagRepository = typeOrmTagRepository;
        this.typeOrmTaskRepository = typeOrmTaskRepository;
        this.typeOrmTimesheetRepository = typeOrmTimesheetRepository;
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.typeOrmTimeOffRequestRepository = typeOrmTimeOffRequestRepository;
        this.typeOrmTimeOffPolicyRepository = typeOrmTimeOffPolicyRepository;
        this.typeOrmTenantSettingRepository = typeOrmTenantSettingRepository;
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.typeOrmUserOrganizationRepository = typeOrmUserOrganizationRepository;
        this.configService = configService;
    }
    async onModuleInit() {
        this.registerCoreRepositories();
    }
    async reset() {
        if (this.configService.get('demo') === true) {
            throw new common_1.ForbiddenException();
        }
        const userId = core_1.RequestContext.currentUserId();
        const tenantId = core_1.RequestContext.currentTenantId();
        const user = await this.typeOrmUserRepository.findOneBy({
            id: userId,
            tenantId
        });
        user.thirdPartyId = null;
        user.preferredLanguage = null;
        user.preferredComponentLayout = null;
        await this.typeOrmUserRepository.save(user);
        const oldOrganization = await this.typeOrmUserOrganizationRepository.findOne({
            order: {
                createdAt: 'ASC'
            },
            select: ['organizationId'],
            where: {
                userId: userId
            }
        });
        const organizations = await this.typeOrmUserOrganizationRepository.find({
            select: ['organizationId'],
            where: {
                userId: userId
            }
        });
        const allOrganizationsIds = (0, underscore_1.map)(organizations, (org) => {
            return org.organizationId;
        });
        const deleteOrganizationIds = (0, underscore_1.filter)(allOrganizationsIds, (organizationsId) => {
            return organizationsId != oldOrganization.organizationId;
        });
        const findInput = {
            organizationIds: allOrganizationsIds,
            tenantId: user.tenantId
        };
        await this.deleteSpecificTables(findInput);
        if (deleteOrganizationIds?.length > 0) {
            await this.typeOrmUserOrganizationRepository.delete({
                userId: userId,
                organizationId: (0, typeorm_2.In)(deleteOrganizationIds),
                tenantId: user.tenantId
            });
            await this.typeOrmOrganizationRepository.delete({
                id: (0, typeorm_2.In)(deleteOrganizationIds),
                tenantId: user.tenantId
            });
        }
        const firstOrganization = await this.typeOrmOrganizationRepository.findOneBy({
            id: oldOrganization.organizationId
        });
        return firstOrganization;
    }
    async deleteSpecificTables(findInput) {
        for (let i = 0; i < this.repositories.length; i++) {
            await this.deleteRepository(this.repositories[i], findInput);
        }
        return;
    }
    async deleteRepository(repository, findInput) {
        let conditions = {};
        const columns = repository.metadata.ownColumns.map((column) => column.propertyName);
        const tenantId = (0, underscore_1.some)(columns, (column) => {
            return column === 'tenantId';
        });
        const organizationId = (0, underscore_1.some)(columns, (column) => {
            return column === 'organizationId';
        });
        if (tenantId && organizationId) {
            conditions = {
                tenantId: findInput['tenantId'],
                organizationId: (0, typeorm_2.In)(findInput['organizationIds'])
            };
        }
        if (tenantId && !organizationId) {
            conditions = {
                tenantId: findInput['tenantId']
            };
        }
        return repository.delete(conditions);
    }
    registerCoreRepositories() {
        this.repositories = [
            this.typeOrmTagRepository,
            this.typeOrmActivityRepository,
            this.typeOrmApprovalPolicyRepository,
            this.typeOrmAppointmentEmployeeRepository,
            this.typeOrmAvailabilitySlotRepository,
            this.typeOrmCandidateCriterionsRatingRepository,
            this.typeOrmCandidateDocumentRepository,
            this.typeOrmCandidateEducationRepository,
            this.typeOrmCandidateExperienceRepository,
            this.typeOrmCandidateFeedbackRepository,
            this.typeOrmCandidateInterviewersRepository,
            this.typeOrmCandidateInterviewRepository,
            this.typeOrmCandidateRepository,
            this.typeOrmCandidateSkillRepository,
            this.typeOrmCandidateSourceRepository,
            this.typeOrmCandidateTechnologiesRepository,
            this.typeOrmDealRepository,
            this.typeOrmKeyResultRepository,
            this.typeOrmKeyResultTemplateRepository,
            this.typeOrmKeyResultUpdateRepository,
            this.typeOrmGoalKPIRepository,
            this.typeOrmGoalKPITemplateRepository,
            this.typeOrmGoalRepository,
            this.typeOrmGoalTemplateRepository,
            this.typeOrmGoalTimeFrameRepository,
            this.typeOrmEmailHistoryRepository,
            this.typeOrmTimeLogRepository,
            this.typeOrmTimeOffPolicyRepository,
            this.typeOrmTimeOffRequestRepository,
            this.typeOrmTimesheetRepository,
            this.typeOrmTimeSlotRepository,
            this.typeOrmInvoiceItemRepository,
            this.typeOrmInvoiceEstimateHistoryRepository,
            this.typeOrmInvoiceRepository,
            this.typeOrmFeatureOrganizationRepository,
            this.typeOrmEmployeeAppointmentRepository,
            this.typeOrmEmployeeAwardRepository,
            this.typeOrmEmployeeLevelRepository,
            this.typeOrmEmployeeRecurringExpenseRepository,
            this.typeOrmEmployeeRepository,
            this.typeOrmEmployeeSettingRepository,
            this.typeOrmEquipmentSharingRepository,
            this.typeOrmEquipmentRepository,
            this.typeOrmEstimateEmailRepository,
            this.typeOrmEventTypeRepository,
            this.typeOrmExpenseCategoryRepository,
            this.typeOrmExpenseRepository,
            this.typeOrmIncomeRepository,
            this.typeOrmIntegrationEntitySettingRepository,
            this.typeOrmIntegrationEntitySettingTiedRepository,
            this.typeOrmIntegrationMapRepository,
            this.typeOrmIntegrationSettingRepository,
            this.typeOrmIntegrationTenantRepository,
            this.typeOrmInviteRepository,
            this.typeOrmOrganizationAwardRepository,
            this.typeOrmOrganizationDepartmentRepository,
            this.typeOrmOrganizationDocumentRepository,
            this.typeOrmOrganizationEmploymentTypeRepository,
            this.typeOrmOrganizationLanguageRepository,
            this.typeOrmOrganizationPositionRepository,
            this.typeOrmOrganizationSprintRepository,
            this.typeOrmOrganizationTeamEmployeeRepository,
            this.typeOrmOrganizationTeamRepository,
            this.typeOrmOrganizationVendorRepository,
            this.typeOrmOrganizationRecurringExpenseRepository,
            this.typeOrmOrganizationProjectRepository,
            this.typeOrmOrganizationContactRepository,
            this.typeOrmProductCategoryRepository,
            this.typeOrmProductOptionRepository,
            this.typeOrmProductRepository,
            this.typeOrmProductVariantPriceRepository,
            this.typeOrmProductVariantRepository,
            this.typeOrmProductVariantSettingRepository,
            this.typeOrmPaymentRepository,
            this.typeOrmPipelineRepository,
            this.typeOrmRequestApprovalRepository,
            this.typeOrmScreenshotRepository,
            this.typeOrmSkillRepository,
            this.typeOrmPipelineStageRepository,
            this.typeOrmContactRepository,
            this.typeOrmTaskRepository,
            this.typeOrmTenantSettingRepository
        ];
    }
};
exports.FactoryResetService = FactoryResetService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.Activity)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.AppointmentEmployee)),
    __param(4, (0, typeorm_1.InjectRepository)(internal_1.ApprovalPolicy)),
    __param(6, (0, typeorm_1.InjectRepository)(internal_1.AvailabilitySlot)),
    __param(8, (0, typeorm_1.InjectRepository)(internal_1.Candidate)),
    __param(10, (0, typeorm_1.InjectRepository)(internal_1.CandidateCriterionsRating)),
    __param(12, (0, typeorm_1.InjectRepository)(internal_1.CandidateDocument)),
    __param(14, (0, typeorm_1.InjectRepository)(internal_1.CandidateEducation)),
    __param(16, (0, typeorm_1.InjectRepository)(internal_1.CandidateExperience)),
    __param(18, (0, typeorm_1.InjectRepository)(internal_1.CandidateFeedback)),
    __param(20, (0, typeorm_1.InjectRepository)(internal_1.CandidateInterview)),
    __param(22, (0, typeorm_1.InjectRepository)(internal_1.CandidateInterviewers)),
    __param(24, (0, typeorm_1.InjectRepository)(internal_1.CandidateSkill)),
    __param(26, (0, typeorm_1.InjectRepository)(internal_1.CandidateSource)),
    __param(28, (0, typeorm_1.InjectRepository)(internal_1.CandidateTechnologies)),
    __param(30, (0, typeorm_1.InjectRepository)(internal_1.Contact)),
    __param(32, (0, typeorm_1.InjectRepository)(internal_1.Deal)),
    __param(34, (0, typeorm_1.InjectRepository)(internal_1.EmailHistory)),
    __param(36, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __param(38, (0, typeorm_1.InjectRepository)(internal_1.EmployeeAppointment)),
    __param(40, (0, typeorm_1.InjectRepository)(internal_1.EmployeeAward)),
    __param(42, (0, typeorm_1.InjectRepository)(internal_1.EmployeeRecurringExpense)),
    __param(44, (0, typeorm_1.InjectRepository)(internal_1.EmployeeSetting)),
    __param(46, (0, typeorm_1.InjectRepository)(internal_1.Equipment)),
    __param(48, (0, typeorm_1.InjectRepository)(internal_1.EquipmentSharing)),
    __param(50, (0, typeorm_1.InjectRepository)(internal_1.EstimateEmail)),
    __param(52, (0, typeorm_1.InjectRepository)(internal_1.EventType)),
    __param(54, (0, typeorm_1.InjectRepository)(internal_1.Expense)),
    __param(56, (0, typeorm_1.InjectRepository)(internal_1.ExpenseCategory)),
    __param(58, (0, typeorm_1.InjectRepository)(internal_1.FeatureOrganization)),
    __param(60, (0, typeorm_1.InjectRepository)(internal_1.Goal)),
    __param(62, (0, typeorm_1.InjectRepository)(internal_1.GoalTemplate)),
    __param(64, (0, typeorm_1.InjectRepository)(internal_1.GoalKPI)),
    __param(66, (0, typeorm_1.InjectRepository)(internal_1.GoalKPITemplate)),
    __param(68, (0, typeorm_1.InjectRepository)(internal_1.GoalTimeFrame)),
    __param(70, (0, typeorm_1.InjectRepository)(internal_1.Income)),
    __param(72, (0, typeorm_1.InjectRepository)(internal_1.IntegrationEntitySetting)),
    __param(74, (0, typeorm_1.InjectRepository)(internal_1.IntegrationEntitySettingTied)),
    __param(76, (0, typeorm_1.InjectRepository)(internal_1.IntegrationMap)),
    __param(78, (0, typeorm_1.InjectRepository)(internal_1.IntegrationSetting)),
    __param(80, (0, typeorm_1.InjectRepository)(internal_1.IntegrationTenant)),
    __param(82, (0, typeorm_1.InjectRepository)(internal_1.Invite)),
    __param(84, (0, typeorm_1.InjectRepository)(internal_1.Invoice)),
    __param(86, (0, typeorm_1.InjectRepository)(internal_1.InvoiceEstimateHistory)),
    __param(88, (0, typeorm_1.InjectRepository)(internal_1.InvoiceItem)),
    __param(90, (0, typeorm_1.InjectRepository)(internal_1.KeyResult)),
    __param(92, (0, typeorm_1.InjectRepository)(internal_1.KeyResultTemplate)),
    __param(94, (0, typeorm_1.InjectRepository)(internal_1.KeyResultUpdate)),
    __param(96, (0, typeorm_1.InjectRepository)(internal_1.EmployeeLevel)),
    __param(98, (0, typeorm_1.InjectRepository)(internal_1.OrganizationAward)),
    __param(100, (0, typeorm_1.InjectRepository)(internal_1.Organization)),
    __param(102, (0, typeorm_1.InjectRepository)(internal_1.OrganizationContact)),
    __param(104, (0, typeorm_1.InjectRepository)(internal_1.OrganizationDepartment)),
    __param(106, (0, typeorm_1.InjectRepository)(internal_1.OrganizationDocument)),
    __param(108, (0, typeorm_1.InjectRepository)(internal_1.OrganizationEmploymentType)),
    __param(110, (0, typeorm_1.InjectRepository)(internal_1.OrganizationLanguage)),
    __param(112, (0, typeorm_1.InjectRepository)(internal_1.OrganizationPosition)),
    __param(114, (0, typeorm_1.InjectRepository)(internal_1.OrganizationProject)),
    __param(116, (0, typeorm_1.InjectRepository)(internal_1.OrganizationRecurringExpense)),
    __param(118, (0, typeorm_1.InjectRepository)(internal_1.OrganizationSprint)),
    __param(120, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeam)),
    __param(122, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeamEmployee)),
    __param(124, (0, typeorm_1.InjectRepository)(internal_1.OrganizationVendor)),
    __param(126, (0, typeorm_1.InjectRepository)(internal_1.Payment)),
    __param(128, (0, typeorm_1.InjectRepository)(internal_1.Pipeline)),
    __param(130, (0, typeorm_1.InjectRepository)(internal_1.PipelineStage)),
    __param(132, (0, typeorm_1.InjectRepository)(internal_1.Product)),
    __param(134, (0, typeorm_1.InjectRepository)(internal_1.ProductCategory)),
    __param(136, (0, typeorm_1.InjectRepository)(internal_1.ProductOption)),
    __param(138, (0, typeorm_1.InjectRepository)(internal_1.ProductVariantSetting)),
    __param(140, (0, typeorm_1.InjectRepository)(internal_1.ProductVariant)),
    __param(142, (0, typeorm_1.InjectRepository)(internal_1.ProductVariantPrice)),
    __param(144, (0, typeorm_1.InjectRepository)(internal_1.Skill)),
    __param(146, (0, typeorm_1.InjectRepository)(internal_1.Screenshot)),
    __param(148, (0, typeorm_1.InjectRepository)(internal_1.RequestApproval)),
    __param(150, (0, typeorm_1.InjectRepository)(internal_1.Tag)),
    __param(152, (0, typeorm_1.InjectRepository)(internal_1.Task)),
    __param(154, (0, typeorm_1.InjectRepository)(internal_1.Timesheet)),
    __param(156, (0, typeorm_1.InjectRepository)(internal_1.TimeLog)),
    __param(158, (0, typeorm_1.InjectRepository)(internal_1.TimeSlot)),
    __param(160, (0, typeorm_1.InjectRepository)(internal_1.TimeOffRequest)),
    __param(162, (0, typeorm_1.InjectRepository)(internal_1.TimeOffPolicy)),
    __param(164, (0, typeorm_1.InjectRepository)(internal_1.TenantSetting)),
    __param(166, (0, typeorm_1.InjectRepository)(internal_1.User)),
    __param(168, (0, typeorm_1.InjectRepository)(internal_1.UserOrganization)),
    __metadata("design:paramtypes", [type_orm_activity_repository_1.TypeOrmActivityRepository,
        mikro_orm_activity_repository_1.MikroOrmActivityRepository,
        type_orm_appointment_employee_repository_1.TypeOrmAppointmentEmployeeRepository,
        mikro_orm_appointment_employee_repository_1.MikroOrmAppointmentEmployeeRepository,
        type_orm_approval_policy_repository_1.TypeOrmApprovalPolicyRepository,
        mikro_orm_approval_policy_repository_1.MikroOrmApprovalPolicyRepository,
        type_orm_availability_slot_repository_1.TypeOrmAvailabilitySlotRepository,
        mikro_orm_availability_slot_repository_1.MikroOrmAvailabilitySlotRepository,
        type_orm_candidate_repository_1.TypeOrmCandidateRepository,
        mikro_orm_candidate_repository_1.MikroOrmCandidateRepository,
        type_orm_candidate_criterions_rating_repository_1.TypeOrmCandidateCriterionsRatingRepository,
        mikro_orm_candidate_criterions_rating_repository_1.MikroOrmCandidateCriterionsRatingRepository,
        type_orm_candidate_document_repository_1.TypeOrmCandidateDocumentRepository,
        mikro_orm_candidate_document_repository_1.MikroOrmCandidateDocumentRepository,
        type_orm_candidate_education_repository_1.TypeOrmCandidateEducationRepository,
        mikro_orm_candidate_education_repository_1.MikroOrmCandidateEducationRepository,
        type_orm_candidate_experience_repository_1.TypeOrmCandidateExperienceRepository,
        mikro_orm_candidate_experience_repository_1.MikroOrmCandidateExperienceRepository,
        type_orm_candidate_feedback_repository_1.TypeOrmCandidateFeedbackRepository,
        mikro_orm_candidate_feedback_repository_1.MikroOrmCandidateFeedbackRepository,
        type_orm_candidate_interview_repository_1.TypeOrmCandidateInterviewRepository,
        mikro_orm_candidate_interview_repository_1.MikroOrmCandidateInterviewRepository,
        type_orm_candidate_interviewers_repository_1.TypeOrmCandidateInterviewersRepository,
        mikro_orm_candidate_interviewers_repository_1.MikroOrmCandidateInterviewersRepository,
        type_orm_candidate_skill_repository_1.TypeOrmCandidateSkillRepository,
        mikro_orm_candidate_skill_repository_1.MikroOrmCandidateSkillRepository,
        type_orm_candidate_source_repository_1.TypeOrmCandidateSourceRepository,
        mikro_orm_candidate_source_repository_1.MikroOrmCandidateSourceRepository,
        type_orm_candidate_technologies_repository_1.TypeOrmCandidateTechnologiesRepository,
        mikro_orm_candidate_technologies_repository_1.MikroOrmCandidateTechnologiesRepository,
        type_orm_contact_repository_1.TypeOrmContactRepository,
        mikro_orm_contact_repository_1.MikroOrmContactRepository,
        type_orm_deal_repository_1.TypeOrmDealRepository,
        mikro_orm_deal_repository_1.MikroOrmDealRepository,
        type_orm_email_history_repository_1.TypeOrmEmailHistoryRepository,
        mikro_orm_email_history_repository_1.MikroOrmEmailHistoryRepository,
        type_orm_employee_repository_1.TypeOrmEmployeeRepository,
        mikro_orm_employee_repository_1.MikroOrmEmployeeRepository,
        type_orm_employee_appointment_repository_1.TypeOrmEmployeeAppointmentRepository,
        mikro_orm_employee_appointment_repository_1.MikroOrmEmployeeAppointmentRepository,
        type_orm_employee_award_repository_1.TypeOrmEmployeeAwardRepository,
        mikro_orm_employee_award_repository_1.MikroOrmEmployeeAwardRepository,
        type_orm_employee_recurring_expense_repository_1.TypeOrmEmployeeRecurringExpenseRepository,
        mikro_orm_employee_recurring_expense_repository_1.MikroOrmEmployeeRecurringExpenseRepository,
        type_orm_employee_setting_repository_1.TypeOrmEmployeeSettingRepository,
        mikro_orm_employee_setting_repository_1.MikroOrmEmployeeSettingRepository,
        type_orm_equipment_repository_1.TypeOrmEquipmentRepository,
        mikro_orm_equipment_repository_1.MikroOrmEquipmentRepository,
        type_orm_equipment_sharing_repository_1.TypeOrmEquipmentSharingRepository,
        mikro_orm_equipment_sharing_repository_1.MikroOrmEquipmentSharingRepository,
        type_orm_estimate_email_repository_1.TypeOrmEstimateEmailRepository,
        mikro_orm_estimate_email_repository_1.MikroOrmEstimateEmailRepository,
        type_orm_event_types_repository_1.TypeOrmEventTypeRepository,
        mikro_orm_event_type_repository_1.MikroOrmEventTypeRepository,
        type_orm_expense_repository_1.TypeOrmExpenseRepository,
        mikro_orm_expense_repository_1.MikroOrmExpenseRepository,
        type_orm_expense_category_repository_1.TypeOrmExpenseCategoryRepository,
        mikro_orm_expense_category_repository_1.MikroOrmExpenseCategoryRepository,
        type_orm_feature_organization_repository_1.TypeOrmFeatureOrganizationRepository,
        mikro_orm_feature_organization_repository_1.MikroOrmFeatureOrganizationRepository,
        type_orm_goal_repository_1.TypeOrmGoalRepository,
        mikro_orm_goal_repository_1.MikroOrmGoalRepository,
        type_orm_goal_template_repository_1.TypeOrmGoalTemplateRepository,
        mikro_orm_goal_template_repository_1.MikroOrmGoalTemplateRepository,
        type_orm_goal_kpi_repository_1.TypeOrmGoalKPIRepository,
        mikro_orm_goal_kpi_repository_1.MikroOrmGoalKPIRepository,
        type_orm_goal_kpi_template_repository_1.TypeOrmGoalKPITemplateRepository,
        mikro_orm_goal_kpi_template_repository_1.MikroOrmGoalKPITemplateRepository,
        type_orm_goal_time_frame_repository_1.TypeOrmGoalTimeFrameRepository,
        mikro_orm_goal_time_frame_repository_1.MikroOrmGoalTimeFrameRepository,
        type_orm_income_repository_1.TypeOrmIncomeRepository,
        mikro_orm_income_repository_1.MikroOrmIncomeRepository,
        type_orm_integration_entity_setting_repository_1.TypeOrmIntegrationEntitySettingRepository,
        mikro_orm_integration_entity_setting_repository_1.MikroOrmIntegrationEntitySettingRepository,
        type_orm_integration_entity_setting_tied_repository_1.TypeOrmIntegrationEntitySettingTiedRepository,
        mikro_orm_integration_entity_setting_tied_repository_1.MikroOrmIntegrationEntitySettingTiedRepository,
        type_orm_integration_map_repository_1.TypeOrmIntegrationMapRepository,
        mikro_orm_integration_map_repository_1.MikroOrmIntegrationMapRepository,
        type_orm_integration_setting_repository_1.TypeOrmIntegrationSettingRepository,
        mikro_orm_integration_setting_repository_1.MikroOrmIntegrationSettingRepository,
        type_orm_integration_tenant_repository_1.TypeOrmIntegrationTenantRepository,
        mikro_orm_integration_tenant_repository_1.MikroOrmIntegrationTenantRepository,
        type_orm_invite_repository_1.TypeOrmInviteRepository,
        mikro_orm_invite_repository_1.MikroOrmInviteRepository,
        type_orm_invoice_repository_1.TypeOrmInvoiceRepository,
        mikro_orm_invoice_repository_1.MikroOrmInvoiceRepository,
        type_orm_invoice_estimate_history_repository_1.TypeOrmInvoiceEstimateHistoryRepository,
        mikro_orm_invoice_estimate_history_repository_1.MikroOrmInvoiceEstimateHistoryRepository,
        type_orm_invoice_item_repository_1.TypeOrmInvoiceItemRepository,
        mikro_orm_invoice_item_repository_1.MikroOrmInvoiceItemRepository,
        type_orm_keyresult_repository_1.TypeOrmKeyResultRepository,
        mikro_orm_keyresult_repository_1.MikroOrmKeyResultRepository,
        type_orm_keyresult_template_repository_1.TypeOrmKeyResultTemplateRepository,
        mikro_orm_keyresult_template_repository_1.MikroOrmKeyResultTemplateRepository,
        type_orm_keyresult_update_repository_1.TypeOrmKeyResultUpdateRepository,
        mikro_orm_keyresult_update_repository_1.MikroOrmKeyResultUpdateRepository,
        type_orm_employee_level_repository_1.TypeOrmEmployeeLevelRepository,
        mikro_orm_employee_level_repository_1.MikroOrmEmployeeLevelRepository,
        type_orm_organization_award_repository_1.TypeOrmOrganizationAwardRepository,
        mikro_orm_organization_award_repository_1.MikroOrmOrganizationAwardRepository,
        type_orm_organization_repository_1.TypeOrmOrganizationRepository,
        mikro_orm_organization_repository_1.MikroOrmOrganizationRepository,
        type_orm_organization_contact_repository_1.TypeOrmOrganizationContactRepository,
        mikro_orm_organization_contact_repository_1.MikroOrmOrganizationContactRepository,
        type_orm_organization_department_repository_1.TypeOrmOrganizationDepartmentRepository,
        mikro_orm_organization_department_repository_1.MikroOrmOrganizationDepartmentRepository,
        type_orm_organization_document_repository_1.TypeOrmOrganizationDocumentRepository,
        mikro_orm_organization_document_repository_1.MikroOrmOrganizationDocumentRepository,
        type_orm_organization_employment_type_repository_1.TypeOrmOrganizationEmploymentTypeRepository,
        mikro_orm_organization_employment_type_repository_1.MikroOrmOrganizationEmploymentTypeRepository,
        type_orm_organization_language_repository_1.TypeOrmOrganizationLanguageRepository,
        mikro_orm_organization_language_repository_1.MikroOrmOrganizationLanguageRepository,
        type_orm_organization_position_repository_1.TypeOrmOrganizationPositionRepository,
        mikro_orm_organization_position_repository_1.MikroOrmOrganizationPositionRepository,
        type_orm_organization_project_repository_1.TypeOrmOrganizationProjectRepository,
        mikro_orm_organization_project_repository_1.MikroOrmOrganizationProjectRepository,
        type_orm_organization_recurring_expense_repository_1.TypeOrmOrganizationRecurringExpenseRepository,
        mikro_orm_organization_recurring_expense_repository_1.MikroOrmOrganizationRecurringExpenseRepository,
        type_orm_organization_sprint_repository_1.TypeOrmOrganizationSprintRepository,
        mikro_orm_organization_sprint_repository_1.MikroOrmOrganizationSprintRepository,
        type_orm_organization_team_repository_1.TypeOrmOrganizationTeamRepository,
        mikro_orm_organization_team_repository_1.MikroOrmOrganizationTeamRepository,
        type_orm_organization_team_employee_repository_1.TypeOrmOrganizationTeamEmployeeRepository,
        mikro_orm_organization_team_employee_repository_1.MikroOrmOrganizationTeamEmployeeRepository,
        type_orm_organization_vendor_repository_1.TypeOrmOrganizationVendorRepository,
        mikro_orm_organization_vendor_repository_1.MikroOrmOrganizationVendorRepository,
        type_orm_payment_repository_1.TypeOrmPaymentRepository,
        mikro_orm_payment_repository_1.MikroOrmPaymentRepository,
        type_orm_pipeline_repository_1.TypeOrmPipelineRepository,
        mikro_orm_pipeline_repository_1.MikroOrmPipelineRepository,
        type_orm_pipeline_stage_repository_1.TypeOrmPipelineStageRepository,
        mikro_orm_pipeline_stage_repository_1.MikroOrmPipelineStageRepository,
        type_orm_product_repository_1.TypeOrmProductRepository,
        mikro_orm_product_repository_1.MikroOrmProductRepository,
        type_orm_product_category_repository_1.TypeOrmProductCategoryRepository,
        mikro_orm_product_category_repository_1.MikroOrmProductCategoryRepository,
        type_orm_product_option_repository_1.TypeOrmProductOptionRepository,
        mikro_orm_product_option_repository_1.MikroOrmProductOptionRepository,
        type_orm_product_setting_repository_1.TypeOrmProductVariantSettingRepository,
        mikro_orm_product_setting_repository_1.MikroOrmProductVariantSettingRepository,
        type_orm_product_variant_repository_1.TypeOrmProductVariantRepository,
        mikro_orm_product_variant_repository_1.MikroOrmProductVariantRepository,
        type_orm_product_variant_price_repository_1.TypeOrmProductVariantPriceRepository,
        mikro_orm_product_variant_price_repository_1.MikroOrmProductVariantPriceRepository,
        type_orm_skill_repository_1.TypeOrmSkillRepository,
        mikro_orm_skill_repository_1.MikroOrmSkillRepository,
        type_orm_screenshot_repository_1.TypeOrmScreenshotRepository,
        mikro_orm_screenshot_repository_1.MikroOrmScreenshotRepository,
        type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository,
        mikro_orm_request_approval_repository_1.MikroOrmRequestApprovalRepository,
        type_orm_tag_repository_1.TypeOrmTagRepository,
        mikro_orm_tag_repository_1.MikroOrmTagRepository,
        type_orm_task_repository_1.TypeOrmTaskRepository,
        mikro_orm_task_repository_1.MikroOrmTaskRepository,
        type_orm_timesheet_repository_1.TypeOrmTimesheetRepository,
        mikro_orm_timesheet_repository_1.MikroOrmTimesheetRepository,
        type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        mikro_orm_time_log_repository_1.MikroOrmTimeLogRepository,
        type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        mikro_orm_time_slot_repository_1.MikroOrmTimeSlotRepository,
        type_orm_time_off_request_repository_1.TypeOrmTimeOffRequestRepository,
        mikro_orm_time_off_request_repository_1.MikroOrmTimeOffRequestRepository,
        type_orm_time_off_policy_repository_1.TypeOrmTimeOffPolicyRepository,
        mikro_orm_time_off_policy_repository_1.MikroOrmTimeOffPolicyRepository,
        type_orm_tenant_setting_repository_1.TypeOrmTenantSettingRepository,
        mikro_orm_tenant_setting_repository_1.MikroOrmTenantSettingRepository,
        type_orm_user_repository_1.TypeOrmUserRepository,
        mikro_orm_user_repository_1.MikroOrmUserRepository,
        type_orm_user_organization_repository_1.TypeOrmUserOrganizationRepository,
        mikro_orm_user_organization_repository_1.MikroOrmUserOrganizationRepository,
        index_1.ConfigService])
], FactoryResetService);
//# sourceMappingURL=factory-reset.service.js.map