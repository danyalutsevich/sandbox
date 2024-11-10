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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_2 = require("typeorm");
const StringUtils_1 = require("typeorm/util/StringUtils");
const fs = __importStar(require("fs"));
const unzipper = __importStar(require("unzipper"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const rimraf = __importStar(require("rimraf"));
const path = __importStar(require("path"));
const chalk = __importStar(require("chalk"));
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/plugin/dist/index");
const index_3 = require("../../../plugins/common/dist/index");
const connection_entity_manager_1 = require("../../database/connection-entity-manager");
const utils_1 = require("../../core/utils");
const file_storage_1 = require("../../core/file-storage");
const internal_1 = require("../../core/entities/internal");
const core_1 = require("../../core");
const commands_1 = require("./commands");
const import_record_1 = require("../import-record");
const mikro_orm_accounting_template_repository_1 = require("../../accounting-template/repository/mikro-orm-accounting-template.repository");
const type_orm_accounting_template_repository_1 = require("../../accounting-template/repository/type-orm-accounting-template.repository");
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
const mikro_orm_candidate_personal_qualities_repository_1 = require("../../candidate-personal-qualities/repository/mikro-orm-candidate-personal-qualities.repository");
const type_orm_candidate_personal_qualities_repository_1 = require("../../candidate-personal-qualities/repository/type-orm-candidate-personal-qualities.repository");
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
const mikro_orm_custom_smtp_repository_1 = require("../../custom-smtp/repository/mikro-orm-custom-smtp.repository");
const type_orm_custom_smtp_repository_1 = require("../../custom-smtp/repository/type-orm-custom-smtp.repository");
const mikro_orm_deal_repository_1 = require("../../deal/repository/mikro-orm-deal.repository");
const type_orm_deal_repository_1 = require("../../deal/repository/type-orm-deal.repository");
const mikro_orm_email_history_repository_1 = require("../../email-history/repository/mikro-orm-email-history.repository");
const type_orm_email_history_repository_1 = require("../../email-history/repository/type-orm-email-history.repository");
const mikro_orm_email_template_repository_1 = require("../../email-template/repository/mikro-orm-email-template.repository");
const type_orm_email_template_repository_1 = require("../../email-template/repository/type-orm-email-template.repository");
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
const mikro_orm_equipment_sharing_policy_repository_1 = require("../../equipment-sharing-policy/repository/mikro-orm-equipment-sharing-policy.repository");
const type_orm_equipment_sharing_policy_repository_1 = require("../../equipment-sharing-policy/repository/type-orm-equipment-sharing-policy.repository");
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
const mikro_orm_feature_repository_1 = require("../../feature/repository/mikro-orm-feature.repository");
const type_orm_feature_repository_1 = require("../../feature/repository/type-orm-feature.repository");
const type_orm_feature_organization_repository_1 = require("../../feature/repository/type-orm-feature-organization.repository");
const mikro_orm_goal_general_setting_repository_1 = require("../../goal-general-setting/repository/mikro-orm-goal-general-setting.repository");
const type_orm_goal_general_setting_repository_1 = require("../../goal-general-setting/repository/type-orm-goal-general-setting.repository");
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
const mikro_orm_image_asset_repository_1 = require("../../image-asset/repository/mikro-orm-image-asset.repository");
const type_orm_image_asset_repository_1 = require("../../image-asset/repository/type-orm-image-asset.repository");
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
const mikro_orm_integration_type_repository_1 = require("../../integration/repository/mikro-orm-integration-type.repository");
const mikro_orm_integration_repository_1 = require("../../integration/repository/mikro-orm-integration.repository");
const type_orm_integration_type_repository_1 = require("../../integration/repository/type-orm-integration-type.repository");
const type_orm_integration_repository_1 = require("../../integration/repository/type-orm-integration.repository");
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
const mikro_orm_language_repository_1 = require("../../language/repository/mikro-orm-language.repository");
const type_orm_language_repository_1 = require("../../language/repository/type-orm-language.repository");
const mikro_orm_merchant_repository_1 = require("../../merchant/repository/mikro-orm-merchant.repository");
const type_orm_merchant_repository_1 = require("../../merchant/repository/type-orm-merchant.repository");
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
const mikro_orm_product_category_translation_repository_1 = require("../../product-category/repository/mikro-orm-product-category-translation.repository");
const mikro_orm_product_category_repository_1 = require("../../product-category/repository/mikro-orm-product-category.repository");
const type_orm_product_category_translation_repository_1 = require("../../product-category/repository/type-orm-product-category-translation.repository");
const type_orm_product_category_repository_1 = require("../../product-category/repository/type-orm-product-category.repository");
const mikro_orm_product_option_group_translation_repository_1 = require("../../product-option/repository/mikro-orm-product-option-group-translation.repository");
const mikro_orm_product_option_group_repository_1 = require("../../product-option/repository/mikro-orm-product-option-group.repository");
const mikro_orm_product_option_translation_repository_1 = require("../../product-option/repository/mikro-orm-product-option-translation.repository");
const mikro_orm_product_option_repository_1 = require("../../product-option/repository/mikro-orm-product-option.repository");
const type_orm_product_option_group_translation_repository_1 = require("../../product-option/repository/type-orm-product-option-group-translation.repository");
const type_orm_product_option_group_repository_1 = require("../../product-option/repository/type-orm-product-option-group.repository");
const type_orm_product_option_translation_repository_1 = require("../../product-option/repository/type-orm-product-option-translation.repository");
const type_orm_product_option_repository_1 = require("../../product-option/repository/type-orm-product-option.repository");
const mikro_orm_product_setting_repository_1 = require("../../product-setting/repository/mikro-orm-product-setting.repository");
const type_orm_product_setting_repository_1 = require("../../product-setting/repository/type-orm-product-setting.repository");
const mikro_orm_product_type_translation_repository_1 = require("../../product-type/repository/mikro-orm-product-type-translation.repository");
const mikro_orm_product_type_repository_1 = require("../../product-type/repository/mikro-orm-product-type.repository");
const type_orm_product_type_translation_repository_1 = require("../../product-type/repository/type-orm-product-type-translation.repository");
const type_orm_product_type_repository_1 = require("../../product-type/repository/type-orm-product-type.repository");
const mikro_orm_product_variant_price_repository_1 = require("../../product-variant-price/repository/mikro-orm-product-variant-price.repository");
const type_orm_product_variant_price_repository_1 = require("../../product-variant-price/repository/type-orm-product-variant-price.repository");
const mikro_orm_product_variant_repository_1 = require("../../product-variant/repository/mikro-orm-product-variant.repository");
const type_orm_product_variant_repository_1 = require("../../product-variant/repository/type-orm-product-variant.repository");
const mikro_orm_product_translation_repository_1 = require("../../product/repository/mikro-orm-product-translation.repository");
const mikro_orm_product_repository_1 = require("../../product/repository/mikro-orm-product.repository");
const type_orm_product_translation_repository_1 = require("../../product/repository/type-orm-product-translation.repository");
const type_orm_product_repository_1 = require("../../product/repository/type-orm-product.repository");
const mikro_orm_report_category_repository_1 = require("../../reports/repository/mikro-orm-report-category.repository");
const mikro_orm_report_organization_repository_1 = require("../../reports/repository/mikro-orm-report-organization.repository");
const mikro_orm_report_repository_1 = require("../../reports/repository/mikro-orm-report.repository");
const type_orm_report_category_repository_1 = require("../../reports/repository/type-orm-report-category.repository");
const type_orm_report_organization_repository_1 = require("../../reports/repository/type-orm-report-organization.repository");
const type_orm_report_repository_1 = require("../../reports/repository/type-orm-report.repository");
const mikro_orm_request_approval_employee_repository_1 = require("../../request-approval-employee/repository/mikro-orm-request-approval-employee.repository");
const type_orm_request_approval_employee_repository_1 = require("../../request-approval-employee/repository/type-orm-request-approval-employee.repository");
const mikro_orm_request_approval_team_repository_1 = require("../../request-approval-team/repository/mikro-orm-request-approval-team.repository");
const type_orm_request_approval_team_repository_1 = require("../../request-approval-team/repository/type-orm-request-approval-team.repository");
const mikro_orm_request_approval_repository_1 = require("../../request-approval/repository/mikro-orm-request-approval.repository");
const type_orm_request_approval_repository_1 = require("../../request-approval/repository/type-orm-request-approval.repository");
const mikro_orm_role_permission_repository_1 = require("../../role-permission/repository/mikro-orm-role-permission.repository");
const type_orm_role_permission_repository_1 = require("../../role-permission/repository/type-orm-role-permission.repository");
const mikro_orm_role_repository_1 = require("../../role/repository/mikro-orm-role.repository");
const type_orm_role_repository_1 = require("../../role/repository/type-orm-role.repository");
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
const mikro_orm_activity_repository_1 = require("../../time-tracking/activity/repository/mikro-orm-activity.repository");
const type_orm_activity_repository_1 = require("../../time-tracking/activity/repository/type-orm-activity.repository");
const mikro_orm_screenshot_repository_1 = require("../../time-tracking/screenshot/repository/mikro-orm-screenshot.repository");
const type_orm_screenshot_repository_1 = require("../../time-tracking/screenshot/repository/type-orm-screenshot.repository");
const mikro_orm_time_log_repository_1 = require("../../time-tracking/time-log/repository/mikro-orm-time-log.repository");
const type_orm_time_log_repository_1 = require("../../time-tracking/time-log/repository/type-orm-time-log.repository");
const mikro_orm_time_slot_minute_repository_1 = require("../../time-tracking/time-slot/repository/mikro-orm-time-slot-minute.repository");
const mikro_orm_time_slot_repository_1 = require("../../time-tracking/time-slot/repository/mikro-orm-time-slot.repository");
const type_orm_time_slot_minute_repository_1 = require("../../time-tracking/time-slot/repository/type-orm-time-slot-minute.repository");
const type_orm_time_slot_repository_1 = require("../../time-tracking/time-slot/repository/type-orm-time-slot.repository");
const mikro_orm_timesheet_repository_1 = require("../../time-tracking/timesheet/repository/mikro-orm-timesheet.repository");
const type_orm_timesheet_repository_1 = require("../../time-tracking/timesheet/repository/type-orm-timesheet.repository");
const mikro_orm_user_organization_repository_1 = require("../../user-organization/repository/mikro-orm-user-organization.repository");
const type_orm_user_organization_repository_1 = require("../../user-organization/repository/type-orm-user-organization.repository");
const mikro_orm_user_repository_1 = require("../../user/repository/mikro-orm-user.repository");
const type_orm_user_repository_1 = require("../../user/repository/type-orm-user.repository");
const mikro_orm_warehouse_product_variant_repository_1 = require("../../warehouse/repository/mikro-orm-warehouse-product-variant.repository");
const mikro_orm_warehouse_product_repository_1 = require("../../warehouse/repository/mikro-orm-warehouse-product.repository ");
const mikro_orm_warehouse_repository_1 = require("../../warehouse/repository/mikro-orm-warehouse.repository");
const type_orm_warehouse_product_variant_repository_1 = require("../../warehouse/repository/type-orm-warehouse-product-variant.repository");
const type_orm_warehouse_product_repository_1 = require("../../warehouse/repository/type-orm-warehouse-product.repository ");
const type_orm_warehouse_repository_1 = require("../../warehouse/repository/type-orm-warehouse.repository");
let ImportService = exports.ImportService = class ImportService {
    typeOrmAccountingTemplateRepository;
    typeOrmActivityRepository;
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
    typeOrmCandidatePersonalQualitiesRepository;
    typeOrmCandidateSkillRepository;
    typeOrmCandidateSourceRepository;
    typeOrmCandidateTechnologiesRepository;
    typeOrmContactRepository;
    typeOrmCustomSmtpRepository;
    typeOrmDealRepository;
    typeOrmEmailHistoryRepository;
    typeOrmEmailTemplateRepository;
    typeOrmEmployeeRepository;
    typeOrmEmployeeAppointmentRepository;
    typeOrmEmployeeAwardRepository;
    typeOrmEmployeeRecurringExpenseRepository;
    typeOrmEmployeeSettingRepository;
    typeOrmEquipmentRepository;
    typeOrmEquipmentSharingRepository;
    typeOrmEquipmentSharingPolicyRepository;
    typeOrmEstimateEmailRepository;
    typeOrmEventTypeRepository;
    typeOrmExpenseRepository;
    typeOrmExpenseCategoryRepository;
    typeOrmFeatureRepository;
    typeOrmFeatureOrganizationRepository;
    typeOrmGoalRepository;
    typeOrmGoalTemplateRepository;
    typeOrmGoalKPIRepository;
    typeOrmGoalKPITemplateRepository;
    typeOrmGoalTimeFrameRepository;
    typeOrmGoalGeneralSettingRepository;
    typeOrmIncomeRepository;
    typeOrmIntegrationRepository;
    typeOrmIntegrationTypeRepository;
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
    typeOrmLanguageRepository;
    typeOrmOrganizationRepository;
    typeOrmEmployeeLevelRepository;
    typeOrmOrganizationAwardRepository;
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
    typeOrmProductTranslationRepository;
    typeOrmProductCategoryRepository;
    typeOrmProductCategoryTranslationRepository;
    typeOrmProductOptionRepository;
    typeOrmProductOptionTranslationRepository;
    typeOrmProductOptionGroupRepository;
    typeOrmProductOptionGroupTranslationRepository;
    typeOrmProductVariantSettingRepository;
    typeOrmProductTypeRepository;
    typeOrmProductTypeTranslationRepository;
    typeOrmProductVariantRepository;
    typeOrmProductVariantPriceRepository;
    typeOrmImageAssetRepository;
    typeOrmWarehouseRepository;
    typeOrmMerchantRepository;
    typeOrmWarehouseProductRepository;
    typeOrmWarehouseProductVariantRepository;
    typeOrmSkillRepository;
    typeOrmScreenshotRepository;
    typeOrmRequestApprovalRepository;
    typeOrmRequestApprovalEmployeeRepository;
    typeOrmRequestApprovalTeamRepository;
    typeOrmRoleRepository;
    typeOrmRolePermissionRepository;
    typeOrmReportRepository;
    typeOrmReportCategoryRepository;
    typeOrmReportOrganizationRepository;
    typeOrmTagRepository;
    typeOrmTaskRepository;
    typeOrmTenantSettingRepository;
    typeOrmTimesheetRepository;
    typeOrmTimeLogRepository;
    typeOrmTimeSlotRepository;
    typeOrmTimeSlotMinuteRepository;
    typeOrmTimeOffRequestRepository;
    typeOrmTimeOffPolicyRepository;
    typeOrmUserRepository;
    typeOrmUserOrganizationRepository;
    configService;
    _connectionEntityManager;
    commandBus;
    _dirname;
    _extractPath;
    dynamicEntitiesClassMap = [];
    repositories = [];
    constructor(typeOrmAccountingTemplateRepository, mikroOrmAccountingTemplateRepository, typeOrmActivityRepository, mikroOrmActivityRepository, typeOrmAppointmentEmployeeRepository, mikroOrmAppointmentEmployeeRepository, typeOrmApprovalPolicyRepository, mikroOrmApprovalPolicyRepository, typeOrmAvailabilitySlotRepository, mikroOrmAvailabilitySlotRepository, typeOrmCandidateRepository, mikroOrmCandidateRepository, typeOrmCandidateCriterionsRatingRepository, mikroOrmCandidateCriterionsRatingRepository, typeOrmCandidateDocumentRepository, mikroOrmCandidateDocumentRepository, typeOrmCandidateEducationRepository, mikroOrmCandidateEducationRepository, typeOrmCandidateExperienceRepository, mikroOrmCandidateExperienceRepository, typeOrmCandidateFeedbackRepository, mikroOrmCandidateFeedbackRepository, typeOrmCandidateInterviewRepository, mikroOrmCandidateInterviewRepository, typeOrmCandidateInterviewersRepository, mikroOrmCandidateInterviewersRepository, typeOrmCandidatePersonalQualitiesRepository, mikroOrmCandidatePersonalQualitiesRepository, typeOrmCandidateSkillRepository, mikroOrmCandidateSkillRepository, typeOrmCandidateSourceRepository, mikroOrmCandidateSourceRepository, typeOrmCandidateTechnologiesRepository, mikroOrmCandidateTechnologiesRepository, typeOrmContactRepository, mikroOrmContactRepository, typeOrmCustomSmtpRepository, mikroOrmCustomSmtpRepository, typeOrmDealRepository, mikroOrmDealRepository, typeOrmEmailHistoryRepository, mikroOrmEmailHistoryRepository, typeOrmEmailTemplateRepository, mikroOrmEmailTemplateRepository, typeOrmEmployeeRepository, mikroOrmEmployeeRepository, typeOrmEmployeeAppointmentRepository, mikroOrmEmployeeAppointmentRepository, typeOrmEmployeeAwardRepository, mikroOrmEmployeeAwardRepository, typeOrmEmployeeRecurringExpenseRepository, mikroOrmEmployeeRecurringExpenseRepository, typeOrmEmployeeSettingRepository, mikroOrmEmployeeSettingRepository, typeOrmEquipmentRepository, mikroOrmEquipmentRepository, typeOrmEquipmentSharingRepository, mikroOrmEquipmentSharingRepository, typeOrmEquipmentSharingPolicyRepository, mikroOrmEquipmentSharingPolicyRepository, typeOrmEstimateEmailRepository, mikroOrmEstimateEmailRepository, typeOrmEventTypeRepository, mikroOrmEventTypeRepository, typeOrmExpenseRepository, mikroOrmExpenseRepository, typeOrmExpenseCategoryRepository, mikroOrmExpenseCategoryRepository, typeOrmFeatureRepository, mikroOrmFeatureRepository, typeOrmFeatureOrganizationRepository, mikroOrmFeatureOrganizationRepository, typeOrmGoalRepository, mikroOrmGoalRepository, typeOrmGoalTemplateRepository, mikroOrmGoalTemplateRepository, typeOrmGoalKPIRepository, mikroOrmGoalKPIRepository, typeOrmGoalKPITemplateRepository, mikroOrmGoalKPITemplateRepository, typeOrmGoalTimeFrameRepository, mikroOrmGoalTimeFrameRepository, typeOrmGoalGeneralSettingRepository, mikroOrmGoalGeneralSettingRepository, typeOrmIncomeRepository, mikroOrmIncomeRepository, typeOrmIntegrationRepository, mikroOrmIntegrationRepository, typeOrmIntegrationTypeRepository, mikroOrmIntegrationTypeRepository, typeOrmIntegrationEntitySettingRepository, mikroOrmIntegrationEntitySettingRepository, typeOrmIntegrationEntitySettingTiedRepository, mikroOrmIntegrationEntitySettingTiedRepository, typeOrmIntegrationMapRepository, mikroOrmIntegrationMapRepository, typeOrmIntegrationSettingRepository, mikroOrmIntegrationSettingRepository, typeOrmIntegrationTenantRepository, mikroOrmIntegrationTenantRepository, typeOrmInviteRepository, mikroOrmInviteRepository, typeOrmInvoiceRepository, mikroOrmInvoiceRepository, typeOrmInvoiceEstimateHistoryRepository, mikroOrmInvoiceEstimateHistoryRepository, typeOrmInvoiceItemRepository, mikroOrmInvoiceItemRepository, typeOrmKeyResultRepository, mikroOrmKeyResultRepository, typeOrmKeyResultTemplateRepository, mikroOrmKeyResultTemplateRepository, typeOrmKeyResultUpdateRepository, mikroOrmKeyResultUpdateRepository, typeOrmLanguageRepository, mikroOrmLanguageRepository, typeOrmOrganizationRepository, mikroOrmOrganizationRepository, typeOrmEmployeeLevelRepository, mikroOrmEmployeeLevelRepository, typeOrmOrganizationAwardRepository, mikroOrmOrganizationAwardRepository, typeOrmOrganizationContactRepository, mikroOrmOrganizationContactRepository, typeOrmOrganizationDepartmentRepository, mikroOrmOrganizationDepartmentRepository, typeOrmOrganizationDocumentRepository, mikroOrmOrganizationDocumentRepository, typeOrmOrganizationEmploymentTypeRepository, mikroOrmOrganizationEmploymentTypeRepository, typeOrmOrganizationLanguageRepository, mikroOrmOrganizationLanguageRepository, typeOrmOrganizationPositionRepository, mikroOrmOrganizationPositionRepository, typeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository, typeOrmOrganizationRecurringExpenseRepository, mikroOrmOrganizationRecurringExpenseRepository, typeOrmOrganizationSprintRepository, mikroOrmOrganizationSprintRepository, typeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository, typeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository, typeOrmOrganizationVendorRepository, mikroOrmOrganizationVendorRepository, typeOrmPaymentRepository, mikroOrmPaymentRepository, typeOrmPipelineRepository, mikroOrmPipelineRepository, typeOrmPipelineStageRepository, mikroOrmPipelineStageRepository, typeOrmProductRepository, mikroOrmProductRepository, typeOrmProductTranslationRepository, mikroOrmProductTranslationRepository, typeOrmProductCategoryRepository, mikroOrmProductCategoryRepository, typeOrmProductCategoryTranslationRepository, mikroOrmProductCategoryTranslationRepository, typeOrmProductOptionRepository, mikroOrmProductOptionRepository, typeOrmProductOptionTranslationRepository, mikroOrmProductOptionTranslationRepository, typeOrmProductOptionGroupRepository, mikroOrmProductOptionGroupRepository, typeOrmProductOptionGroupTranslationRepository, mikroOrmProductOptionGroupTranslationRepository, typeOrmProductVariantSettingRepository, mikroOrmProductVariantSettingRepository, typeOrmProductTypeRepository, mikroOrmProductTypeRepository, typeOrmProductTypeTranslationRepository, mikroOrmProductTypeTranslationRepository, typeOrmProductVariantRepository, mikroOrmProductVariantRepository, typeOrmProductVariantPriceRepository, mikroOrmProductVariantPriceRepository, typeOrmImageAssetRepository, mikroOrmImageAssetRepository, typeOrmWarehouseRepository, mikroOrmWarehouseRepository, typeOrmMerchantRepository, mikroOrmMerchantRepository, typeOrmWarehouseProductRepository, mikroOrmWarehouseProductRepository, typeOrmWarehouseProductVariantRepository, mikroOrmWarehouseProductVariantRepository, typeOrmSkillRepository, mikroOrmSkillRepository, typeOrmScreenshotRepository, mikroOrmScreenshotRepository, typeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository, typeOrmRequestApprovalEmployeeRepository, mikroOrmRequestApprovalEmployeeRepository, typeOrmRequestApprovalTeamRepository, mikroOrmRequestApprovalTeamRepository, typeOrmRoleRepository, mikroOrmRoleRepository, typeOrmRolePermissionRepository, mikroOrmRolePermissionRepository, typeOrmReportRepository, mikroOrmReportRepository, typeOrmReportCategoryRepository, mikroOrmReportCategoryRepository, typeOrmReportOrganizationRepository, mikroOrmReportOrganizationRepository, typeOrmTagRepository, mikroOrmTagRepository, typeOrmTaskRepository, mikroOrmTaskRepository, typeOrmTenantSettingRepository, mikroOrmTenantSettingRepository, typeOrmTimesheetRepository, mikroOrmTimesheetRepository, typeOrmTimeLogRepository, mikroOrmTimeLogRepository, typeOrmTimeSlotRepository, mikroOrmTimeSlotRepository, typeOrmTimeSlotMinuteRepository, mikroOrmTimeSlotMinuteRepository, typeOrmTimeOffRequestRepository, mikroOrmTimeOffRequestRepository, typeOrmTimeOffPolicyRepository, mikroOrmTimeOffPolicyRepository, typeOrmUserRepository, mikroOrmUserRepository, typeOrmUserOrganizationRepository, mikroOrmUserOrganizationRepository, configService, _connectionEntityManager, commandBus) {
        this.typeOrmAccountingTemplateRepository = typeOrmAccountingTemplateRepository;
        this.typeOrmActivityRepository = typeOrmActivityRepository;
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
        this.typeOrmCandidatePersonalQualitiesRepository = typeOrmCandidatePersonalQualitiesRepository;
        this.typeOrmCandidateSkillRepository = typeOrmCandidateSkillRepository;
        this.typeOrmCandidateSourceRepository = typeOrmCandidateSourceRepository;
        this.typeOrmCandidateTechnologiesRepository = typeOrmCandidateTechnologiesRepository;
        this.typeOrmContactRepository = typeOrmContactRepository;
        this.typeOrmCustomSmtpRepository = typeOrmCustomSmtpRepository;
        this.typeOrmDealRepository = typeOrmDealRepository;
        this.typeOrmEmailHistoryRepository = typeOrmEmailHistoryRepository;
        this.typeOrmEmailTemplateRepository = typeOrmEmailTemplateRepository;
        this.typeOrmEmployeeRepository = typeOrmEmployeeRepository;
        this.typeOrmEmployeeAppointmentRepository = typeOrmEmployeeAppointmentRepository;
        this.typeOrmEmployeeAwardRepository = typeOrmEmployeeAwardRepository;
        this.typeOrmEmployeeRecurringExpenseRepository = typeOrmEmployeeRecurringExpenseRepository;
        this.typeOrmEmployeeSettingRepository = typeOrmEmployeeSettingRepository;
        this.typeOrmEquipmentRepository = typeOrmEquipmentRepository;
        this.typeOrmEquipmentSharingRepository = typeOrmEquipmentSharingRepository;
        this.typeOrmEquipmentSharingPolicyRepository = typeOrmEquipmentSharingPolicyRepository;
        this.typeOrmEstimateEmailRepository = typeOrmEstimateEmailRepository;
        this.typeOrmEventTypeRepository = typeOrmEventTypeRepository;
        this.typeOrmExpenseRepository = typeOrmExpenseRepository;
        this.typeOrmExpenseCategoryRepository = typeOrmExpenseCategoryRepository;
        this.typeOrmFeatureRepository = typeOrmFeatureRepository;
        this.typeOrmFeatureOrganizationRepository = typeOrmFeatureOrganizationRepository;
        this.typeOrmGoalRepository = typeOrmGoalRepository;
        this.typeOrmGoalTemplateRepository = typeOrmGoalTemplateRepository;
        this.typeOrmGoalKPIRepository = typeOrmGoalKPIRepository;
        this.typeOrmGoalKPITemplateRepository = typeOrmGoalKPITemplateRepository;
        this.typeOrmGoalTimeFrameRepository = typeOrmGoalTimeFrameRepository;
        this.typeOrmGoalGeneralSettingRepository = typeOrmGoalGeneralSettingRepository;
        this.typeOrmIncomeRepository = typeOrmIncomeRepository;
        this.typeOrmIntegrationRepository = typeOrmIntegrationRepository;
        this.typeOrmIntegrationTypeRepository = typeOrmIntegrationTypeRepository;
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
        this.typeOrmLanguageRepository = typeOrmLanguageRepository;
        this.typeOrmOrganizationRepository = typeOrmOrganizationRepository;
        this.typeOrmEmployeeLevelRepository = typeOrmEmployeeLevelRepository;
        this.typeOrmOrganizationAwardRepository = typeOrmOrganizationAwardRepository;
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
        this.typeOrmProductTranslationRepository = typeOrmProductTranslationRepository;
        this.typeOrmProductCategoryRepository = typeOrmProductCategoryRepository;
        this.typeOrmProductCategoryTranslationRepository = typeOrmProductCategoryTranslationRepository;
        this.typeOrmProductOptionRepository = typeOrmProductOptionRepository;
        this.typeOrmProductOptionTranslationRepository = typeOrmProductOptionTranslationRepository;
        this.typeOrmProductOptionGroupRepository = typeOrmProductOptionGroupRepository;
        this.typeOrmProductOptionGroupTranslationRepository = typeOrmProductOptionGroupTranslationRepository;
        this.typeOrmProductVariantSettingRepository = typeOrmProductVariantSettingRepository;
        this.typeOrmProductTypeRepository = typeOrmProductTypeRepository;
        this.typeOrmProductTypeTranslationRepository = typeOrmProductTypeTranslationRepository;
        this.typeOrmProductVariantRepository = typeOrmProductVariantRepository;
        this.typeOrmProductVariantPriceRepository = typeOrmProductVariantPriceRepository;
        this.typeOrmImageAssetRepository = typeOrmImageAssetRepository;
        this.typeOrmWarehouseRepository = typeOrmWarehouseRepository;
        this.typeOrmMerchantRepository = typeOrmMerchantRepository;
        this.typeOrmWarehouseProductRepository = typeOrmWarehouseProductRepository;
        this.typeOrmWarehouseProductVariantRepository = typeOrmWarehouseProductVariantRepository;
        this.typeOrmSkillRepository = typeOrmSkillRepository;
        this.typeOrmScreenshotRepository = typeOrmScreenshotRepository;
        this.typeOrmRequestApprovalRepository = typeOrmRequestApprovalRepository;
        this.typeOrmRequestApprovalEmployeeRepository = typeOrmRequestApprovalEmployeeRepository;
        this.typeOrmRequestApprovalTeamRepository = typeOrmRequestApprovalTeamRepository;
        this.typeOrmRoleRepository = typeOrmRoleRepository;
        this.typeOrmRolePermissionRepository = typeOrmRolePermissionRepository;
        this.typeOrmReportRepository = typeOrmReportRepository;
        this.typeOrmReportCategoryRepository = typeOrmReportCategoryRepository;
        this.typeOrmReportOrganizationRepository = typeOrmReportOrganizationRepository;
        this.typeOrmTagRepository = typeOrmTagRepository;
        this.typeOrmTaskRepository = typeOrmTaskRepository;
        this.typeOrmTenantSettingRepository = typeOrmTenantSettingRepository;
        this.typeOrmTimesheetRepository = typeOrmTimesheetRepository;
        this.typeOrmTimeLogRepository = typeOrmTimeLogRepository;
        this.typeOrmTimeSlotRepository = typeOrmTimeSlotRepository;
        this.typeOrmTimeSlotMinuteRepository = typeOrmTimeSlotMinuteRepository;
        this.typeOrmTimeOffRequestRepository = typeOrmTimeOffRequestRepository;
        this.typeOrmTimeOffPolicyRepository = typeOrmTimeOffPolicyRepository;
        this.typeOrmUserRepository = typeOrmUserRepository;
        this.typeOrmUserOrganizationRepository = typeOrmUserOrganizationRepository;
        this.configService = configService;
        this._connectionEntityManager = _connectionEntityManager;
        this.commandBus = commandBus;
    }
    async onModuleInit() {
        //base import csv directory path
        this._dirname = path.join(this.configService.assetOptions.assetPublicPath || __dirname);
        await this.createDynamicInstanceForPluginEntities();
        await this.registerCoreRepositories();
    }
    removeExtractedFiles() {
        try {
            rimraf.sync(this._extractPath);
        }
        catch (error) {
            console.log(error);
        }
    }
    async unzipAndParse(filePath, cleanup = false) {
        //extracted import csv directory path
        this._extractPath = path.join(path.join(this._dirname, filePath), '../csv');
        const file = await new file_storage_1.FileStorage().getProvider().getFile(filePath);
        await unzipper.Open.buffer(file).then((d) => d.extract({ path: this._extractPath }));
        await this.parse(cleanup);
    }
    async parse(cleanup = false) {
        /**
          * Can only run in a particular order
        */
        const tenantId = core_1.RequestContext.currentTenantId();
        for await (const item of this.repositories) {
            const { repository, isStatic = false, relations = [] } = item;
            const nameFile = repository.metadata.tableName;
            const csvPath = path.join(this._extractPath, `${nameFile}.csv`);
            const masterTable = repository.metadata.tableName;
            if (!fs.existsSync(csvPath)) {
                console.log(chalk.yellow(`File Does Not Exist, Skipping: ${nameFile}`));
                continue;
            }
            console.log(chalk.magenta(`Importing process start for table: ${masterTable}`));
            await new Promise(async (resolve, reject) => {
                try {
                    /**
                    * This will first collect all the data and then insert
                    * If cleanup flag is set then it will also delete current tenant related data from the database table with CASCADE
                    */
                    if (cleanup && isStatic !== true) {
                        try {
                            let sql = `DELETE FROM "${masterTable}" WHERE "${masterTable}"."tenantId" = '${tenantId}'`;
                            await repository.query(sql);
                            console.log(chalk.yellow(`Clean up processing for table: ${masterTable}`));
                        }
                        catch (error) {
                            console.log(chalk.red(`Failed to clean up process for table: ${masterTable}`), error);
                            reject(error);
                        }
                    }
                    let results = [];
                    const stream = fs.createReadStream(csvPath, 'utf8').pipe((0, csv_parser_1.default)());
                    stream.on('data', (data) => { results.push(data); });
                    stream.on('error', (error) => {
                        console.log(chalk.red(`Failed to parse CSV for table: ${masterTable}`), error);
                        reject(error);
                    });
                    stream.on('end', async () => {
                        results = results.filter(index_3.isNotEmpty);
                        try {
                            for await (const data of results) {
                                if ((0, index_3.isNotEmpty)(data)) {
                                    await this.migrateImportEntityRecord(item, data);
                                }
                            }
                            console.log(chalk.green(`Success to inserts data for table: ${masterTable}`));
                        }
                        catch (error) {
                            console.log(chalk.red(`Failed to inserts data for table: ${masterTable}`), error);
                            reject(error);
                        }
                        resolve(true);
                    });
                }
                catch (error) {
                    console.log(chalk.red(`Failed to read file for table: ${masterTable}`), error);
                    reject(error);
                }
            });
            // export pivot relational tables
            if ((0, index_3.isNotEmpty)(relations)) {
                await this.parseRelationalTables(item, cleanup);
            }
        }
    }
    async parseRelationalTables(entity, cleanup = false) {
        const { relations } = entity;
        for await (const item of relations) {
            const { joinTableName } = item;
            const csvPath = path.join(this._extractPath, `${joinTableName}.csv`);
            if (!fs.existsSync(csvPath)) {
                console.log(chalk.yellow(`File Does Not Exist, Skipping: ${joinTableName}`));
                continue;
            }
            console.log(chalk.magenta(`Importing process start for table: ${joinTableName}`));
            await new Promise(async (resolve, reject) => {
                try {
                    let results = [];
                    const stream = fs.createReadStream(csvPath, 'utf8').pipe((0, csv_parser_1.default)());
                    stream.on('data', (data) => { results.push(data); });
                    stream.on('error', (error) => {
                        console.log(chalk.red(`Failed to parse CSV for table: ${joinTableName}`), error);
                        reject(error);
                    });
                    stream.on('end', async () => {
                        results = results.filter(index_3.isNotEmpty);
                        for await (const data of results) {
                            try {
                                if ((0, index_3.isNotEmpty)(data)) {
                                    const fields = await this.mapRelationFields(item, data);
                                    const sql = `INSERT INTO "${joinTableName}" (${'"' + Object.keys(fields).join(`", "`) + '"'}) VALUES ("$1", "$2")`;
                                    // const items = await getManager().query(sql, Object.values(fields));
                                    console.log(sql);
                                    // console.log(chalk.green(`Success to inserts data for table: ${joinTableName}`));
                                }
                            }
                            catch (error) {
                                console.log(chalk.red(`Failed to inserts data for table: ${joinTableName}`), error);
                                reject(error);
                            }
                        }
                        resolve(true);
                    });
                }
                catch (error) {
                    console.log(chalk.red(`Failed to read file for table: ${joinTableName}`, error));
                    reject(error);
                }
            });
        }
    }
    /*
    * Map static tables import record before insert data
    */
    async migrateImportEntityRecord(item, entity) {
        const { repository, uniqueIdentifier = [] } = item;
        const masterTable = repository.metadata.tableName;
        return await new Promise(async (resolve, reject) => {
            try {
                const source = JSON.parse(JSON.stringify(entity));
                const where = [];
                if ((0, index_3.isNotEmpty)(uniqueIdentifier) && uniqueIdentifier instanceof Array) {
                    if ('tenantId' in entity && (0, index_3.isNotEmpty)(entity['tenantId'])) {
                        where.push({ tenantId: core_1.RequestContext.currentTenantId() });
                    }
                    for (const unique of uniqueIdentifier) {
                        where.push({ [unique.column]: entity[unique.column] });
                    }
                }
                const destination = await this.commandBus.execute(new commands_1.ImportEntityFieldMapOrCreateCommand(repository, where, await this.mapFields(item, entity), source.id));
                if (destination) {
                    await this.mappedImportRecord(item, destination, source);
                }
                resolve(true);
            }
            catch (error) {
                console.log(chalk.red(`Failed to migrate import entity data for table: ${masterTable}`), error, entity);
                reject(error);
            }
        });
    }
    /*
    * Map import record after find or insert data
    */
    async mappedImportRecord(item, destination, row) {
        const { repository } = item;
        const entityType = repository.metadata.tableName;
        return await new Promise(async (resolve, reject) => {
            try {
                if (destination) {
                    await this.commandBus.execute(new import_record_1.ImportRecordUpdateOrCreateCommand({
                        tenantId: core_1.RequestContext.currentTenantId(),
                        sourceId: row.id,
                        destinationId: destination.id,
                        entityType
                    }));
                }
                resolve(true);
            }
            catch (error) {
                console.log(chalk.red(`Failed to map import record for table: ${entityType}`), error);
                reject(error);
            }
        });
    }
    /*
    * Map tenant & organization base fields here
    * Notice: Please add timestamp field here if missing
    */
    async mapFields(item, data) {
        if ('id' in data && (0, index_3.isNotEmpty)(data['id'])) {
            delete data['id'];
        }
        if ('tenantId' in data && (0, index_3.isNotEmpty)(data['tenantId'])) {
            data['tenantId'] = core_1.RequestContext.currentTenantId();
        }
        if ('organizationId' in data && (0, index_3.isNotEmpty)(data['organizationId'])) {
            try {
                const organization = await this.typeOrmOrganizationRepository.findOneByOrFail({
                    id: data['organizationId'],
                    tenantId: core_1.RequestContext.currentTenantId()
                });
                data['organizationId'] = organization ? organization.id : (0, typeorm_2.IsNull)().value;
            }
            catch (error) {
                const { record } = await this.commandBus.execute(new import_record_1.ImportRecordFindOrFailCommand({
                    tenantId: core_1.RequestContext.currentTenantId(),
                    sourceId: data['organizationId'],
                    entityType: this.typeOrmOrganizationRepository.metadata.tableName
                }));
                data['organizationId'] = record ? record.destinationId : (0, typeorm_2.IsNull)().value;
            }
        }
        return await this.mapTimeStampsFields(item, await this.mapRelationFields(item, data));
    }
    /*
    * Map timestamps fields here
    */
    async mapTimeStampsFields(item, data) {
        const { repository } = item;
        for await (const column of repository.metadata.columns) {
            const { propertyName, type } = column;
            if (`${propertyName}` in data && (0, index_3.isNotEmpty)(data[`${propertyName}`])) {
                if ((type.valueOf() === Date) || (type === 'datetime' || type === 'timestamp')) {
                    data[`${propertyName}`] = (0, utils_1.convertToDatetime)(data[`${propertyName}`]);
                }
                else if (data[`${propertyName}`] === 'true') {
                    data[`${propertyName}`] = true;
                }
                else if (data[`${propertyName}`] === 'false') {
                    data[`${propertyName}`] = false;
                }
            }
        }
        return data;
    }
    /*
    * Map relation fields here
    */
    async mapRelationFields(item, data) {
        return await new Promise(async (resolve, reject) => {
            try {
                const { foreignKeys = [], isCheckRelation = false } = item;
                if (isCheckRelation) {
                    if ((0, index_3.isNotEmpty)(foreignKeys) && foreignKeys instanceof Array) {
                        for await (const { column, repository } of foreignKeys) {
                            const { record } = await this.commandBus.execute(new import_record_1.ImportRecordFindOrFailCommand({
                                tenantId: core_1.RequestContext.currentTenantId(),
                                sourceId: data[column],
                                entityType: repository.metadata.tableName
                            }));
                            data[column] = record ? record.destinationId : (0, typeorm_2.IsNull)().value;
                        }
                    }
                }
                resolve(data);
            }
            catch (error) {
                console.log(chalk.red('Failed to map relation entity before insert'), error);
                reject(error);
            }
        });
    }
    //load plugins entities for import data
    async createDynamicInstanceForPluginEntities() {
        for await (const entity of (0, index_2.getEntitiesFromPlugins)(this.configService.plugins)) {
            if (!(0, index_3.isFunction)(entity)) {
                continue;
            }
            const className = (0, StringUtils_1.camelCase)(entity.name);
            const repository = this._connectionEntityManager.getRepository(entity);
            this[className] = repository;
            this.dynamicEntitiesClassMap.push({ repository });
        }
    }
    /*
    * Load all entities repository after create instance
    * Warning: Changing position here can be FATAL
    */
    async registerCoreRepositories() {
        this.repositories = [
            /**
            * These entities do not have any other dependency so need to be mapped first
            */
            {
                repository: this.typeOrmReportCategoryRepository,
                isStatic: true,
                uniqueIdentifier: [{ column: 'name' }]
            },
            {
                repository: this.typeOrmReportRepository,
                isStatic: true,
                uniqueIdentifier: [{ column: 'name' }, { column: 'slug' }]
            },
            {
                repository: this.typeOrmFeatureRepository,
                isStatic: true,
                uniqueIdentifier: [{ column: 'name' }, { column: 'code' }]
            },
            {
                repository: this.typeOrmLanguageRepository,
                isStatic: true,
                uniqueIdentifier: [{ column: 'name' }, { column: 'code' }]
            },
            {
                repository: this.typeOrmIntegrationRepository,
                isStatic: true,
                uniqueIdentifier: [{ column: 'name' }]
            },
            {
                repository: this.typeOrmIntegrationTypeRepository,
                isStatic: true,
                uniqueIdentifier: [{ column: 'name' }, { column: 'groupName' }],
                relations: [
                    {
                        joinTableName: 'integration_integration_type',
                        isCheckRelation: true,
                        foreignKeys: [
                            { column: 'integrationId', repository: this.typeOrmIntegrationRepository },
                            { column: 'integrationTypeId', repository: this.typeOrmIntegrationTypeRepository }
                        ]
                    }
                ]
            },
            /**
            * These entities need TENANT
            */
            {
                repository: this.typeOrmTenantSettingRepository
            },
            {
                repository: this.typeOrmRoleRepository
            },
            {
                repository: this.typeOrmRolePermissionRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'roleId', repository: this.typeOrmRoleRepository }
                ]
            },
            {
                repository: this.typeOrmOrganizationRepository
            },
            /**
            * These entities need TENANT and ORGANIZATION
            */
            {
                repository: this.typeOrmUserRepository,
                isStatic: true,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'roleId', repository: this.typeOrmRoleRepository }
                ]
            },
            {
                repository: this.typeOrmUserOrganizationRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'userId', repository: this.typeOrmUserRepository }
                ]
            },
            //Organization & Related Entities
            {
                repository: this.typeOrmOrganizationPositionRepository
            },
            {
                repository: this.typeOrmOrganizationTeamRepository
            },
            {
                repository: this.typeOrmOrganizationAwardRepository
            },
            {
                repository: this.typeOrmOrganizationVendorRepository
            },
            {
                repository: this.typeOrmOrganizationDepartmentRepository
            },
            {
                repository: this.typeOrmOrganizationDocumentRepository
            },
            {
                repository: this.typeOrmOrganizationLanguageRepository
            },
            {
                repository: this.typeOrmOrganizationEmploymentTypeRepository
            },
            {
                repository: this.typeOrmOrganizationContactRepository
            },
            {
                repository: this.typeOrmOrganizationProjectRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'organizationContactId', repository: this.typeOrmOrganizationContactRepository }
                ]
            },
            {
                repository: this.typeOrmOrganizationSprintRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'projectId', repository: this.typeOrmOrganizationProjectRepository }
                ]
            },
            {
                repository: this.typeOrmOrganizationRecurringExpenseRepository
            },
            {
                repository: this.typeOrmContactRepository
            },
            {
                repository: this.typeOrmCustomSmtpRepository
            },
            {
                repository: this.typeOrmReportOrganizationRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'reportId', repository: this.typeOrmReportRepository }
                ]
            },
            /**
            * These entities need TENANT, ORGANIZATION & USER
            */
            {
                repository: this.typeOrmEmployeeRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'userId', repository: this.typeOrmUserRepository },
                    { column: 'contactId', repository: this.typeOrmContactRepository },
                    { column: 'organizationPositionId', repository: this.typeOrmOrganizationPositionRepository }
                ],
                relations: [
                    { joinTableName: 'employee_job_preset' },
                    {
                        joinTableName: 'organization_department_employee',
                        foreignKeys: [
                            { column: 'organizationDepartmentId', repository: this.typeOrmOrganizationDepartmentRepository },
                            { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                        ]
                    },
                    {
                        joinTableName: 'organization_employment_type_employee',
                        foreignKeys: [
                            { column: 'organizationEmploymentTypeId', repository: this.typeOrmOrganizationEmploymentTypeRepository },
                            { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                        ]
                    },
                    {
                        joinTableName: 'organization_contact_employee',
                        foreignKeys: [
                            { column: 'organizationContactId', repository: this.typeOrmOrganizationContactRepository },
                            { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                        ]
                    },
                    {
                        joinTableName: 'organization_project_employee',
                        foreignKeys: [
                            { column: 'organizationProjectId', repository: this.typeOrmOrganizationProjectRepository },
                            { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                        ]
                    }
                ]
            },
            /**
            * These entities need TENANT, ORGANIZATION & CANDIDATE
            */
            {
                repository: this.typeOrmCandidateRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'userId', repository: this.typeOrmUserRepository },
                    { column: 'organizationPositionId', repository: this.typeOrmOrganizationPositionRepository }
                ],
                relations: [
                    {
                        joinTableName: 'candidate_department',
                        foreignKeys: [
                            { column: 'candidateId', repository: this.typeOrmCandidateRepository },
                            { column: 'organizationDepartmentId', repository: this.typeOrmOrganizationDepartmentRepository }
                        ]
                    },
                    {
                        joinTableName: 'candidate_employment_type',
                        foreignKeys: [
                            { column: 'candidateId', repository: this.typeOrmCandidateRepository },
                            { column: 'organizationEmploymentTypeId', repository: this.typeOrmOrganizationEmploymentTypeRepository }
                        ]
                    }
                ]
            },
            {
                repository: this.typeOrmCandidateDocumentRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'candidateId', repository: this.typeOrmCandidateRepository }
                ]
            },
            {
                repository: this.typeOrmCandidateEducationRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'candidateId', repository: this.typeOrmCandidateRepository }
                ]
            },
            {
                repository: this.typeOrmCandidateSkillRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'candidateId', repository: this.typeOrmCandidateRepository }
                ]
            },
            {
                repository: this.typeOrmCandidateSourceRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'candidateId', repository: this.typeOrmCandidateRepository }
                ]
            },
            {
                repository: this.typeOrmCandidateInterviewRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'candidateId', repository: this.typeOrmCandidateRepository }
                ]
            },
            {
                repository: this.typeOrmCandidateInterviewersRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'interviewId', repository: this.typeOrmCandidateInterviewRepository },
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmCandidateExperienceRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'candidateId', repository: this.typeOrmCandidateRepository }
                ]
            },
            {
                repository: this.typeOrmCandidateFeedbackRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'candidateId', repository: this.typeOrmCandidateRepository },
                    { column: 'interviewId', repository: this.typeOrmCandidateInterviewRepository },
                    { column: 'interviewerId', repository: this.typeOrmCandidateInterviewersRepository }
                ]
            },
            {
                repository: this.typeOrmCandidatePersonalQualitiesRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'interviewId', repository: this.typeOrmCandidateInterviewRepository }
                ]
            },
            {
                repository: this.typeOrmCandidateTechnologiesRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'interviewId', repository: this.typeOrmCandidateInterviewRepository }
                ]
            },
            {
                repository: this.typeOrmCandidateCriterionsRatingRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'feedbackId', repository: this.typeOrmCandidateFeedbackRepository },
                    { column: 'technologyId', repository: this.typeOrmCandidateTechnologiesRepository },
                    { column: 'personalQualityId', repository: this.typeOrmCandidatePersonalQualitiesRepository },
                ]
            },
            /**
            * These entities need TENANT and ORGANIZATION
            */
            {
                repository: this.typeOrmSkillRepository,
                uniqueIdentifier: [{ column: 'name' }],
                relations: [
                    {
                        joinTableName: 'skill_employee',
                        foreignKeys: [
                            { column: 'skillId', repository: this.typeOrmSkillRepository },
                            { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                        ]
                    },
                    {
                        joinTableName: 'skill_organization',
                        foreignKeys: [
                            { column: 'skillId', repository: this.typeOrmSkillRepository },
                            { column: 'organizationId', repository: this.typeOrmOrganizationRepository }
                        ]
                    }
                ]
            },
            {
                repository: this.typeOrmAccountingTemplateRepository
            },
            {
                repository: this.typeOrmApprovalPolicyRepository
            },
            {
                repository: this.typeOrmAvailabilitySlotRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmEmployeeAppointmentRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmAppointmentEmployeeRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository },
                    { column: 'employeeAppointmentId', repository: this.typeOrmEmployeeAppointmentRepository }
                ]
            },
            /*
            * Email & Template
            */
            {
                repository: this.typeOrmEmailTemplateRepository
            },
            {
                repository: this.typeOrmEmailHistoryRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'emailTemplateId', repository: this.typeOrmEmailTemplateRepository },
                    { column: 'userId', repository: this.typeOrmUserRepository }
                ]
            },
            {
                repository: this.typeOrmEstimateEmailRepository
            },
            /*
            * Employee & Related Entities
            */
            {
                repository: this.typeOrmEmployeeAwardRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmEmployeeRecurringExpenseRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmEmployeeSettingRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmEmployeeLevelRepository
            },
            /*
            * Equipment & Related Entities
            */
            {
                repository: this.typeOrmEquipmentSharingPolicyRepository
            },
            {
                repository: this.typeOrmEquipmentRepository
            },
            {
                repository: this.typeOrmEquipmentSharingRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'equipmentId', repository: this.typeOrmEquipmentRepository },
                    { column: 'equipmentSharingPolicyId', repository: this.typeOrmEquipmentSharingPolicyRepository }
                ],
                relations: [
                    {
                        joinTableName: 'equipment_shares_employees',
                        foreignKeys: [
                            { column: 'equipmentSharingId', repository: this.typeOrmEquipmentSharingRepository },
                            { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                        ]
                    },
                    {
                        joinTableName: 'equipment_shares_teams',
                        foreignKeys: [
                            { column: 'equipmentSharingId', repository: this.typeOrmEquipmentSharingRepository },
                            { column: 'organizationTeamId', repository: this.typeOrmOrganizationTeamRepository }
                        ]
                    }
                ]
            },
            /*
            * Event Type & Related Entities
            */
            {
                repository: this.typeOrmEventTypeRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            /*
            * Invoice & Related Entities
            */
            {
                repository: this.typeOrmInvoiceRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'sendTo', repository: this.typeOrmOrganizationContactRepository },
                    { column: 'organizationContactId', repository: this.typeOrmOrganizationContactRepository },
                    { column: 'fromOrganizationId', repository: this.typeOrmOrganizationRepository },
                    { column: 'toContactId', repository: this.typeOrmOrganizationContactRepository }
                ]
            },
            {
                repository: this.typeOrmInvoiceItemRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'invoiceId', repository: this.typeOrmInvoiceRepository },
                    { column: 'taskId', repository: this.typeOrmTaskRepository },
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository },
                    { column: 'projectId', repository: this.typeOrmOrganizationProjectRepository },
                    { column: 'productId', repository: this.typeOrmProductRepository },
                    { column: 'expenseId', repository: this.typeOrmExpenseRepository }
                ]
            },
            {
                repository: this.typeOrmInvoiceEstimateHistoryRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'userId', repository: this.typeOrmUserRepository },
                    { column: 'invoiceId', repository: this.typeOrmInvoiceRepository }
                ]
            },
            /*
            * Expense & Related Entities
            */
            {
                repository: this.typeOrmExpenseCategoryRepository
            },
            {
                repository: this.typeOrmExpenseRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository },
                    { column: 'vendorId', repository: this.typeOrmOrganizationVendorRepository },
                    { column: 'categoryId', repository: this.typeOrmExpenseCategoryRepository },
                    { column: 'projectId', repository: this.typeOrmOrganizationProjectRepository }
                ]
            },
            /*
            * Income
            */
            {
                repository: this.typeOrmIncomeRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            /*
            * Feature & Related Entities
            */
            {
                repository: this.typeOrmFeatureOrganizationRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'featureId', repository: this.typeOrmFeatureRepository }
                ]
            },
            {
                repository: this.typeOrmGoalRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'ownerTeamId', repository: this.typeOrmOrganizationTeamRepository },
                    { column: 'ownerEmployeeId', repository: this.typeOrmEmployeeRepository },
                    { column: 'leadId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            /*
            * Key Result & Related Entities
            */
            {
                repository: this.typeOrmKeyResultRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'projectId', repository: this.typeOrmOrganizationProjectRepository },
                    { column: 'taskId', repository: this.typeOrmTaskRepository },
                    { column: 'leadId', repository: this.typeOrmEmployeeRepository },
                    { column: 'ownerId', repository: this.typeOrmEmployeeRepository },
                    { column: 'goalId', repository: this.typeOrmGoalRepository }
                ]
            },
            {
                repository: this.typeOrmKeyResultTemplateRepository
            },
            {
                repository: this.typeOrmKeyResultUpdateRepository
            },
            /*
            * Goal KPI & Related Entities
            */
            {
                repository: this.typeOrmGoalKPIRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'leadId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmGoalKPITemplateRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'leadId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmGoalTemplateRepository
            },
            {
                repository: this.typeOrmGoalTimeFrameRepository
            },
            {
                repository: this.typeOrmGoalGeneralSettingRepository
            },
            /*
            * Integration & Related Entities
            */
            {
                repository: this.typeOrmIntegrationTenantRepository
            },
            {
                repository: this.typeOrmIntegrationSettingRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'integrationId', repository: this.typeOrmIntegrationTenantRepository }
                ]
            },
            {
                repository: this.typeOrmIntegrationMapRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'integrationId', repository: this.typeOrmIntegrationTenantRepository }
                ]
            },
            {
                repository: this.typeOrmIntegrationEntitySettingRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'integrationId', repository: this.typeOrmIntegrationTenantRepository }
                ]
            },
            {
                repository: this.typeOrmIntegrationEntitySettingTiedRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'integrationEntitySettingId', repository: this.typeOrmIntegrationEntitySettingRepository }
                ]
            },
            /*
            * Invite & Related Entities
            */
            {
                repository: this.typeOrmInviteRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'roleId', repository: this.typeOrmRoleRepository },
                    { column: 'invitedById', repository: this.typeOrmUserRepository },
                    { column: 'organizationContactId', repository: this.typeOrmOrganizationContactRepository }
                ],
                relations: [
                    {
                        joinTableName: 'invite_organization_contact',
                        foreignKeys: [
                            { column: 'inviteId', repository: this.typeOrmEquipmentSharingRepository },
                            { column: 'organizationContactId', repository: this.typeOrmOrganizationContactRepository }
                        ]
                    },
                    {
                        joinTableName: 'invite_organization_department',
                        foreignKeys: [
                            { column: 'inviteId', repository: this.typeOrmEquipmentSharingRepository },
                            { column: 'organizationDepartmentId', repository: this.typeOrmOrganizationDepartmentRepository }
                        ]
                    },
                    {
                        joinTableName: 'invite_organization_project',
                        foreignKeys: [
                            { column: 'inviteId', repository: this.typeOrmEquipmentSharingRepository },
                            { column: 'organizationProjectId', repository: this.typeOrmOrganizationProjectRepository }
                        ]
                    }
                ]
            },
            {
                repository: this.typeOrmOrganizationTeamEmployeeRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'organizationTeamId', repository: this.typeOrmOrganizationTeamRepository },
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository },
                    { column: 'roleId', repository: this.typeOrmRoleRepository }
                ]
            },
            /*
            * Pipeline & Stage Entities
            */
            {
                repository: this.typeOrmPipelineRepository
            },
            {
                repository: this.typeOrmPipelineStageRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'pipelineId', repository: this.typeOrmPipelineRepository }
                ]
            },
            {
                repository: this.typeOrmDealRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'createdByUserId', repository: this.typeOrmUserRepository },
                    { column: 'stageId', repository: this.typeOrmPipelineStageRepository },
                    { column: 'clientId', repository: this.typeOrmOrganizationContactRepository }
                ]
            },
            /*
            * Product & Related Entities
            */
            {
                repository: this.typeOrmProductCategoryRepository
            },
            {
                repository: this.typeOrmProductCategoryTranslationRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'referenceId', repository: this.typeOrmProductCategoryRepository }
                ]
            },
            {
                repository: this.typeOrmProductTypeRepository
            },
            {
                repository: this.typeOrmProductTypeTranslationRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'referenceId', repository: this.typeOrmProductTypeRepository }
                ]
            },
            {
                repository: this.typeOrmProductOptionGroupRepository
            },
            {
                repository: this.typeOrmProductOptionRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'groupId', repository: this.typeOrmProductOptionGroupRepository }
                ]
            },
            {
                repository: this.typeOrmProductOptionTranslationRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'referenceId', repository: this.typeOrmProductOptionRepository }
                ]
            },
            {
                repository: this.typeOrmProductOptionGroupTranslationRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'referenceId', repository: this.typeOrmProductOptionGroupRepository }
                ]
            },
            {
                repository: this.typeOrmImageAssetRepository
            },
            {
                repository: this.typeOrmProductRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'featuredImageId', repository: this.typeOrmImageAssetRepository },
                    { column: 'typeId', repository: this.typeOrmProductTypeRepository },
                    { column: 'categoryId', repository: this.typeOrmProductCategoryRepository }
                ],
                relations: [
                    { joinTableName: 'product_gallery_item' }
                ]
            },
            {
                repository: this.typeOrmProductTranslationRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'referenceId', repository: this.typeOrmProductRepository }
                ]
            },
            {
                repository: this.typeOrmProductVariantPriceRepository,
                isCheckRelation: true
            },
            {
                repository: this.typeOrmProductVariantSettingRepository
            },
            {
                repository: this.typeOrmProductVariantRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'productId', repository: this.typeOrmProductRepository },
                    { column: 'imageId', repository: this.typeOrmImageAssetRepository },
                    { column: 'priceId', repository: this.typeOrmProductVariantPriceRepository },
                    { column: 'settingsId', repository: this.typeOrmProductVariantSettingRepository }
                ],
                relations: [
                    { joinTableName: 'product_variant_options_product_option' }
                ]
            },
            {
                repository: this.typeOrmWarehouseRepository,
                uniqueIdentifier: [{ column: 'email' }, { column: 'code' }],
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'logoId', repository: this.typeOrmImageAssetRepository },
                    { column: 'contactId', repository: this.typeOrmContactRepository }
                ]
            },
            {
                repository: this.typeOrmMerchantRepository,
                uniqueIdentifier: [{ column: 'email' }, { column: 'code' }],
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'logoId', repository: this.typeOrmImageAssetRepository },
                    { column: 'contactId', repository: this.typeOrmContactRepository }
                ],
                relations: [
                    { joinTableName: 'warehouse_merchant' }
                ]
            },
            {
                repository: this.typeOrmWarehouseProductRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'warehouseId', repository: this.typeOrmWarehouseRepository },
                    { column: 'productId', repository: this.typeOrmProductRepository }
                ],
            },
            {
                repository: this.typeOrmWarehouseProductVariantRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'variantId', repository: this.typeOrmProductVariantRepository },
                    { column: 'warehouseProductId', repository: this.typeOrmWarehouseProductRepository }
                ],
            },
            /*
            * Payment & Related Entities
            */
            {
                repository: this.typeOrmPaymentRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'invoiceId', repository: this.typeOrmInvoiceRepository },
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository },
                    { column: 'recordedById', repository: this.typeOrmUserRepository },
                    { column: 'projectId', repository: this.typeOrmOrganizationProjectRepository },
                    { column: 'contactId', repository: this.typeOrmOrganizationContactRepository }
                ]
            },
            /*
            * Request Approval & Related Entities
            */
            {
                repository: this.typeOrmRequestApprovalRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'approvalPolicyId', repository: this.typeOrmApprovalPolicyRepository }
                ]
            },
            {
                repository: this.typeOrmRequestApprovalEmployeeRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'requestApprovalId', repository: this.typeOrmRequestApprovalRepository },
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmRequestApprovalTeamRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'requestApprovalId', repository: this.typeOrmRequestApprovalRepository },
                    { column: 'teamId', repository: this.typeOrmOrganizationTeamRepository }
                ]
            },
            /*
            * Tasks & Related Entities
            */
            {
                repository: this.typeOrmTaskRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'projectId', repository: this.typeOrmOrganizationProjectRepository },
                    { column: 'creatorId', repository: this.typeOrmUserRepository },
                    { column: 'organizationSprintId', repository: this.typeOrmOrganizationSprintRepository }
                ],
                relations: [
                    { joinTableName: 'task_employee' },
                    { joinTableName: 'task_team' },
                ]
            },
            /*
            * Timeoff & Related Entities
            */
            {
                repository: this.typeOrmTimeOffPolicyRepository,
                relations: [
                    { joinTableName: 'time_off_policy_employee' }
                ]
            },
            {
                repository: this.typeOrmTimeOffRequestRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'policyId', repository: this.typeOrmTimeOffPolicyRepository }
                ],
                relations: [
                    { joinTableName: 'time_off_request_employee' }
                ]
            },
            /*
            * Timesheet & Related Entities
            */
            {
                repository: this.typeOrmTimesheetRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository },
                    { column: 'approvedById', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmTimeLogRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository },
                    { column: 'timesheetId', repository: this.typeOrmTimesheetRepository },
                    { column: 'projectId', repository: this.typeOrmOrganizationProjectRepository },
                    { column: 'taskId', repository: this.typeOrmTaskRepository },
                    { column: 'organizationContactId', repository: this.typeOrmOrganizationContactRepository }
                ],
                relations: [
                    { joinTableName: 'time_slot_time_logs' }
                ]
            },
            {
                repository: this.typeOrmTimeSlotRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository }
                ]
            },
            {
                repository: this.typeOrmTimeSlotMinuteRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'timeSlotId', repository: this.typeOrmTimeSlotRepository }
                ]
            },
            {
                repository: this.typeOrmScreenshotRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'timeSlotId', repository: this.typeOrmTimeSlotRepository }
                ]
            },
            {
                repository: this.typeOrmActivityRepository,
                isCheckRelation: true,
                foreignKeys: [
                    { column: 'employeeId', repository: this.typeOrmEmployeeRepository },
                    { column: 'projectId', repository: this.typeOrmOrganizationProjectRepository },
                    { column: 'timeSlotId', repository: this.typeOrmTimeSlotRepository },
                    { column: 'taskId', repository: this.typeOrmTaskRepository }
                ]
            },
            /*
            * Tag & Related Entities
            */
            {
                repository: this.typeOrmTagRepository,
                relations: [
                    { joinTableName: 'tag_candidate' },
                    { joinTableName: 'tag_employee' },
                    { joinTableName: 'tag_equipment' },
                    { joinTableName: 'tag_event_type' },
                    { joinTableName: 'tag_expense' },
                    { joinTableName: 'tag_income' },
                    { joinTableName: 'tag_integration' },
                    { joinTableName: 'tag_invoice' },
                    { joinTableName: 'tag_merchant' },
                    { joinTableName: 'tag_organization_contact' },
                    { joinTableName: 'tag_organization_department' },
                    { joinTableName: 'tag_organization_employee_level' },
                    { joinTableName: 'tag_organization_employment_type' },
                    { joinTableName: 'tag_organization_expense_category' },
                    { joinTableName: 'tag_organization_position' },
                    { joinTableName: 'tag_organization_project' },
                    { joinTableName: 'tag_organization_team' },
                    { joinTableName: 'tag_organization_vendor' },
                    { joinTableName: 'tag_organization' },
                    { joinTableName: 'tag_payment' },
                    { joinTableName: 'tag_product' },
                    { joinTableName: 'tag_proposal' },
                    { joinTableName: 'tag_request_approval' },
                    { joinTableName: 'tag_task' },
                    { joinTableName: 'tag_warehouse' }
                ]
            },
            ...this.dynamicEntitiesClassMap
        ];
    }
};
exports.ImportService = ImportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(internal_1.AccountingTemplate)),
    __param(2, (0, typeorm_1.InjectRepository)(internal_1.Activity)),
    __param(4, (0, typeorm_1.InjectRepository)(internal_1.AppointmentEmployee)),
    __param(6, (0, typeorm_1.InjectRepository)(internal_1.ApprovalPolicy)),
    __param(8, (0, typeorm_1.InjectRepository)(internal_1.AvailabilitySlot)),
    __param(10, (0, typeorm_1.InjectRepository)(internal_1.Candidate)),
    __param(12, (0, typeorm_1.InjectRepository)(internal_1.CandidateCriterionsRating)),
    __param(14, (0, typeorm_1.InjectRepository)(internal_1.CandidateDocument)),
    __param(16, (0, typeorm_1.InjectRepository)(internal_1.CandidateEducation)),
    __param(18, (0, typeorm_1.InjectRepository)(internal_1.CandidateExperience)),
    __param(20, (0, typeorm_1.InjectRepository)(internal_1.CandidateFeedback)),
    __param(22, (0, typeorm_1.InjectRepository)(internal_1.CandidateInterview)),
    __param(24, (0, typeorm_1.InjectRepository)(internal_1.CandidateInterviewers)),
    __param(26, (0, typeorm_1.InjectRepository)(internal_1.CandidatePersonalQualities)),
    __param(28, (0, typeorm_1.InjectRepository)(internal_1.CandidateSkill)),
    __param(30, (0, typeorm_1.InjectRepository)(internal_1.CandidateSource)),
    __param(32, (0, typeorm_1.InjectRepository)(internal_1.CandidateTechnologies)),
    __param(34, (0, typeorm_1.InjectRepository)(internal_1.Contact)),
    __param(36, (0, typeorm_1.InjectRepository)(internal_1.CustomSmtp)),
    __param(38, (0, typeorm_1.InjectRepository)(internal_1.Deal)),
    __param(40, (0, typeorm_1.InjectRepository)(internal_1.EmailHistory)),
    __param(42, (0, typeorm_1.InjectRepository)(internal_1.EmailTemplate)),
    __param(44, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __param(46, (0, typeorm_1.InjectRepository)(internal_1.EmployeeAppointment)),
    __param(48, (0, typeorm_1.InjectRepository)(internal_1.EmployeeAward)),
    __param(50, (0, typeorm_1.InjectRepository)(internal_1.EmployeeRecurringExpense)),
    __param(52, (0, typeorm_1.InjectRepository)(internal_1.EmployeeSetting)),
    __param(54, (0, typeorm_1.InjectRepository)(internal_1.Equipment)),
    __param(56, (0, typeorm_1.InjectRepository)(internal_1.EquipmentSharing)),
    __param(58, (0, typeorm_1.InjectRepository)(internal_1.EquipmentSharingPolicy)),
    __param(60, (0, typeorm_1.InjectRepository)(internal_1.EstimateEmail)),
    __param(62, (0, typeorm_1.InjectRepository)(internal_1.EventType)),
    __param(64, (0, typeorm_1.InjectRepository)(internal_1.Expense)),
    __param(66, (0, typeorm_1.InjectRepository)(internal_1.ExpenseCategory)),
    __param(68, (0, typeorm_1.InjectRepository)(internal_1.Feature)),
    __param(70, (0, typeorm_1.InjectRepository)(internal_1.FeatureOrganization)),
    __param(72, (0, typeorm_1.InjectRepository)(internal_1.Goal)),
    __param(74, (0, typeorm_1.InjectRepository)(internal_1.GoalTemplate)),
    __param(76, (0, typeorm_1.InjectRepository)(internal_1.GoalKPI)),
    __param(78, (0, typeorm_1.InjectRepository)(internal_1.GoalKPITemplate)),
    __param(80, (0, typeorm_1.InjectRepository)(internal_1.GoalTimeFrame)),
    __param(82, (0, typeorm_1.InjectRepository)(internal_1.GoalGeneralSetting)),
    __param(84, (0, typeorm_1.InjectRepository)(internal_1.Income)),
    __param(86, (0, typeorm_1.InjectRepository)(internal_1.Integration)),
    __param(88, (0, typeorm_1.InjectRepository)(internal_1.IntegrationType)),
    __param(90, (0, typeorm_1.InjectRepository)(internal_1.IntegrationEntitySetting)),
    __param(92, (0, typeorm_1.InjectRepository)(internal_1.IntegrationEntitySettingTied)),
    __param(94, (0, typeorm_1.InjectRepository)(internal_1.IntegrationMap)),
    __param(96, (0, typeorm_1.InjectRepository)(internal_1.IntegrationSetting)),
    __param(98, (0, typeorm_1.InjectRepository)(internal_1.IntegrationTenant)),
    __param(100, (0, typeorm_1.InjectRepository)(internal_1.Invite)),
    __param(102, (0, typeorm_1.InjectRepository)(internal_1.Invoice)),
    __param(104, (0, typeorm_1.InjectRepository)(internal_1.InvoiceEstimateHistory)),
    __param(106, (0, typeorm_1.InjectRepository)(internal_1.InvoiceItem)),
    __param(108, (0, typeorm_1.InjectRepository)(internal_1.KeyResult)),
    __param(110, (0, typeorm_1.InjectRepository)(internal_1.KeyResultTemplate)),
    __param(112, (0, typeorm_1.InjectRepository)(internal_1.KeyResultUpdate)),
    __param(114, (0, typeorm_1.InjectRepository)(internal_1.Language)),
    __param(116, (0, typeorm_1.InjectRepository)(internal_1.Organization)),
    __param(118, (0, typeorm_1.InjectRepository)(internal_1.EmployeeLevel)),
    __param(120, (0, typeorm_1.InjectRepository)(internal_1.OrganizationAward)),
    __param(122, (0, typeorm_1.InjectRepository)(internal_1.OrganizationContact)),
    __param(124, (0, typeorm_1.InjectRepository)(internal_1.OrganizationDepartment)),
    __param(126, (0, typeorm_1.InjectRepository)(internal_1.OrganizationDocument)),
    __param(128, (0, typeorm_1.InjectRepository)(internal_1.OrganizationEmploymentType)),
    __param(130, (0, typeorm_1.InjectRepository)(internal_1.OrganizationLanguage)),
    __param(132, (0, typeorm_1.InjectRepository)(internal_1.OrganizationPosition)),
    __param(134, (0, typeorm_1.InjectRepository)(internal_1.OrganizationProject)),
    __param(136, (0, typeorm_1.InjectRepository)(internal_1.OrganizationRecurringExpense)),
    __param(138, (0, typeorm_1.InjectRepository)(internal_1.OrganizationSprint)),
    __param(140, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeam)),
    __param(142, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeamEmployee)),
    __param(144, (0, typeorm_1.InjectRepository)(internal_1.OrganizationVendor)),
    __param(146, (0, typeorm_1.InjectRepository)(internal_1.Payment)),
    __param(148, (0, typeorm_1.InjectRepository)(internal_1.Pipeline)),
    __param(150, (0, typeorm_1.InjectRepository)(internal_1.PipelineStage)),
    __param(152, (0, typeorm_1.InjectRepository)(internal_1.Product)),
    __param(154, (0, typeorm_1.InjectRepository)(internal_1.ProductTranslation)),
    __param(156, (0, typeorm_1.InjectRepository)(internal_1.ProductCategory)),
    __param(158, (0, typeorm_1.InjectRepository)(internal_1.ProductCategoryTranslation)),
    __param(160, (0, typeorm_1.InjectRepository)(internal_1.ProductOption)),
    __param(162, (0, typeorm_1.InjectRepository)(internal_1.ProductOptionTranslation)),
    __param(164, (0, typeorm_1.InjectRepository)(internal_1.ProductOptionGroup)),
    __param(166, (0, typeorm_1.InjectRepository)(internal_1.ProductOptionGroupTranslation)),
    __param(168, (0, typeorm_1.InjectRepository)(internal_1.ProductVariantSetting)),
    __param(170, (0, typeorm_1.InjectRepository)(internal_1.ProductType)),
    __param(172, (0, typeorm_1.InjectRepository)(internal_1.ProductTypeTranslation)),
    __param(174, (0, typeorm_1.InjectRepository)(internal_1.ProductVariant)),
    __param(176, (0, typeorm_1.InjectRepository)(internal_1.ProductVariantPrice)),
    __param(178, (0, typeorm_1.InjectRepository)(internal_1.ImageAsset)),
    __param(180, (0, typeorm_1.InjectRepository)(internal_1.Warehouse)),
    __param(182, (0, typeorm_1.InjectRepository)(internal_1.Merchant)),
    __param(184, (0, typeorm_1.InjectRepository)(internal_1.WarehouseProduct)),
    __param(186, (0, typeorm_1.InjectRepository)(internal_1.WarehouseProductVariant)),
    __param(188, (0, typeorm_1.InjectRepository)(internal_1.Skill)),
    __param(190, (0, typeorm_1.InjectRepository)(internal_1.Screenshot)),
    __param(192, (0, typeorm_1.InjectRepository)(internal_1.RequestApproval)),
    __param(194, (0, typeorm_1.InjectRepository)(internal_1.RequestApprovalEmployee)),
    __param(196, (0, typeorm_1.InjectRepository)(internal_1.RequestApprovalTeam)),
    __param(198, (0, typeorm_1.InjectRepository)(internal_1.Role)),
    __param(200, (0, typeorm_1.InjectRepository)(internal_1.RolePermission)),
    __param(202, (0, typeorm_1.InjectRepository)(internal_1.Report)),
    __param(204, (0, typeorm_1.InjectRepository)(internal_1.ReportCategory)),
    __param(206, (0, typeorm_1.InjectRepository)(internal_1.ReportOrganization)),
    __param(208, (0, typeorm_1.InjectRepository)(internal_1.Tag)),
    __param(210, (0, typeorm_1.InjectRepository)(internal_1.Task)),
    __param(212, (0, typeorm_1.InjectRepository)(internal_1.TenantSetting)),
    __param(214, (0, typeorm_1.InjectRepository)(internal_1.Timesheet)),
    __param(216, (0, typeorm_1.InjectRepository)(internal_1.TimeLog)),
    __param(218, (0, typeorm_1.InjectRepository)(internal_1.TimeSlot)),
    __param(220, (0, typeorm_1.InjectRepository)(internal_1.TimeSlotMinute)),
    __param(222, (0, typeorm_1.InjectRepository)(internal_1.TimeOffRequest)),
    __param(224, (0, typeorm_1.InjectRepository)(internal_1.TimeOffPolicy)),
    __param(226, (0, typeorm_1.InjectRepository)(internal_1.User)),
    __param(228, (0, typeorm_1.InjectRepository)(internal_1.UserOrganization)),
    __metadata("design:paramtypes", [type_orm_accounting_template_repository_1.TypeOrmAccountingTemplateRepository,
        mikro_orm_accounting_template_repository_1.MikroOrmAccountingTemplateRepository,
        type_orm_activity_repository_1.TypeOrmActivityRepository,
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
        type_orm_candidate_personal_qualities_repository_1.TypeOrmCandidatePersonalQualitiesRepository,
        mikro_orm_candidate_personal_qualities_repository_1.MikroOrmCandidatePersonalQualitiesRepository,
        type_orm_candidate_skill_repository_1.TypeOrmCandidateSkillRepository,
        mikro_orm_candidate_skill_repository_1.MikroOrmCandidateSkillRepository,
        type_orm_candidate_source_repository_1.TypeOrmCandidateSourceRepository,
        mikro_orm_candidate_source_repository_1.MikroOrmCandidateSourceRepository,
        type_orm_candidate_technologies_repository_1.TypeOrmCandidateTechnologiesRepository,
        mikro_orm_candidate_technologies_repository_1.MikroOrmCandidateTechnologiesRepository,
        type_orm_contact_repository_1.TypeOrmContactRepository,
        mikro_orm_contact_repository_1.MikroOrmContactRepository,
        type_orm_custom_smtp_repository_1.TypeOrmCustomSmtpRepository,
        mikro_orm_custom_smtp_repository_1.MikroOrmCustomSmtpRepository,
        type_orm_deal_repository_1.TypeOrmDealRepository,
        mikro_orm_deal_repository_1.MikroOrmDealRepository,
        type_orm_email_history_repository_1.TypeOrmEmailHistoryRepository,
        mikro_orm_email_history_repository_1.MikroOrmEmailHistoryRepository,
        type_orm_email_template_repository_1.TypeOrmEmailTemplateRepository,
        mikro_orm_email_template_repository_1.MikroOrmEmailTemplateRepository,
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
        type_orm_equipment_sharing_policy_repository_1.TypeOrmEquipmentSharingPolicyRepository,
        mikro_orm_equipment_sharing_policy_repository_1.MikroOrmEquipmentSharingPolicyRepository,
        type_orm_estimate_email_repository_1.TypeOrmEstimateEmailRepository,
        mikro_orm_estimate_email_repository_1.MikroOrmEstimateEmailRepository,
        type_orm_event_types_repository_1.TypeOrmEventTypeRepository,
        mikro_orm_event_type_repository_1.MikroOrmEventTypeRepository,
        type_orm_expense_repository_1.TypeOrmExpenseRepository,
        mikro_orm_expense_repository_1.MikroOrmExpenseRepository,
        type_orm_expense_category_repository_1.TypeOrmExpenseCategoryRepository,
        mikro_orm_expense_category_repository_1.MikroOrmExpenseCategoryRepository,
        type_orm_feature_repository_1.TypeOrmFeatureRepository,
        mikro_orm_feature_repository_1.MikroOrmFeatureRepository,
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
        type_orm_goal_general_setting_repository_1.TypeOrmGoalGeneralSettingRepository,
        mikro_orm_goal_general_setting_repository_1.MikroOrmGoalGeneralSettingRepository,
        type_orm_income_repository_1.TypeOrmIncomeRepository,
        mikro_orm_income_repository_1.MikroOrmIncomeRepository,
        type_orm_integration_repository_1.TypeOrmIntegrationRepository,
        mikro_orm_integration_repository_1.MikroOrmIntegrationRepository,
        type_orm_integration_type_repository_1.TypeOrmIntegrationTypeRepository,
        mikro_orm_integration_type_repository_1.MikroOrmIntegrationTypeRepository,
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
        type_orm_language_repository_1.TypeOrmLanguageRepository,
        mikro_orm_language_repository_1.MikroOrmLanguageRepository,
        type_orm_organization_repository_1.TypeOrmOrganizationRepository,
        mikro_orm_organization_repository_1.MikroOrmOrganizationRepository,
        type_orm_employee_level_repository_1.TypeOrmEmployeeLevelRepository,
        mikro_orm_employee_level_repository_1.MikroOrmEmployeeLevelRepository,
        type_orm_organization_award_repository_1.TypeOrmOrganizationAwardRepository,
        mikro_orm_organization_award_repository_1.MikroOrmOrganizationAwardRepository,
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
        type_orm_product_translation_repository_1.TypeOrmProductTranslationRepository,
        mikro_orm_product_translation_repository_1.MikroOrmProductTranslationRepository,
        type_orm_product_category_repository_1.TypeOrmProductCategoryRepository,
        mikro_orm_product_category_repository_1.MikroOrmProductCategoryRepository,
        type_orm_product_category_translation_repository_1.TypeOrmProductCategoryTranslationRepository,
        mikro_orm_product_category_translation_repository_1.MikroOrmProductCategoryTranslationRepository,
        type_orm_product_option_repository_1.TypeOrmProductOptionRepository,
        mikro_orm_product_option_repository_1.MikroOrmProductOptionRepository,
        type_orm_product_option_translation_repository_1.TypeOrmProductOptionTranslationRepository,
        mikro_orm_product_option_translation_repository_1.MikroOrmProductOptionTranslationRepository,
        type_orm_product_option_group_repository_1.TypeOrmProductOptionGroupRepository,
        mikro_orm_product_option_group_repository_1.MikroOrmProductOptionGroupRepository,
        type_orm_product_option_group_translation_repository_1.TypeOrmProductOptionGroupTranslationRepository,
        mikro_orm_product_option_group_translation_repository_1.MikroOrmProductOptionGroupTranslationRepository,
        type_orm_product_setting_repository_1.TypeOrmProductVariantSettingRepository,
        mikro_orm_product_setting_repository_1.MikroOrmProductVariantSettingRepository,
        type_orm_product_type_repository_1.TypeOrmProductTypeRepository,
        mikro_orm_product_type_repository_1.MikroOrmProductTypeRepository,
        type_orm_product_type_translation_repository_1.TypeOrmProductTypeTranslationRepository,
        mikro_orm_product_type_translation_repository_1.MikroOrmProductTypeTranslationRepository,
        type_orm_product_variant_repository_1.TypeOrmProductVariantRepository,
        mikro_orm_product_variant_repository_1.MikroOrmProductVariantRepository,
        type_orm_product_variant_price_repository_1.TypeOrmProductVariantPriceRepository,
        mikro_orm_product_variant_price_repository_1.MikroOrmProductVariantPriceRepository,
        type_orm_image_asset_repository_1.TypeOrmImageAssetRepository,
        mikro_orm_image_asset_repository_1.MikroOrmImageAssetRepository,
        type_orm_warehouse_repository_1.TypeOrmWarehouseRepository,
        mikro_orm_warehouse_repository_1.MikroOrmWarehouseRepository,
        type_orm_merchant_repository_1.TypeOrmMerchantRepository,
        mikro_orm_merchant_repository_1.MikroOrmMerchantRepository,
        type_orm_warehouse_product_repository_1.TypeOrmWarehouseProductRepository,
        mikro_orm_warehouse_product_repository_1.MikroOrmWarehouseProductRepository,
        type_orm_warehouse_product_variant_repository_1.TypeOrmWarehouseProductVariantRepository,
        mikro_orm_warehouse_product_variant_repository_1.MikroOrmWarehouseProductVariantRepository,
        type_orm_skill_repository_1.TypeOrmSkillRepository,
        mikro_orm_skill_repository_1.MikroOrmSkillRepository,
        type_orm_screenshot_repository_1.TypeOrmScreenshotRepository,
        mikro_orm_screenshot_repository_1.MikroOrmScreenshotRepository,
        type_orm_request_approval_repository_1.TypeOrmRequestApprovalRepository,
        mikro_orm_request_approval_repository_1.MikroOrmRequestApprovalRepository,
        type_orm_request_approval_employee_repository_1.TypeOrmRequestApprovalEmployeeRepository,
        mikro_orm_request_approval_employee_repository_1.MikroOrmRequestApprovalEmployeeRepository,
        type_orm_request_approval_team_repository_1.TypeOrmRequestApprovalTeamRepository,
        mikro_orm_request_approval_team_repository_1.MikroOrmRequestApprovalTeamRepository,
        type_orm_role_repository_1.TypeOrmRoleRepository,
        mikro_orm_role_repository_1.MikroOrmRoleRepository,
        type_orm_role_permission_repository_1.TypeOrmRolePermissionRepository,
        mikro_orm_role_permission_repository_1.MikroOrmRolePermissionRepository,
        type_orm_report_repository_1.TypeOrmReportRepository,
        mikro_orm_report_repository_1.MikroOrmReportRepository,
        type_orm_report_category_repository_1.TypeOrmReportCategoryRepository,
        mikro_orm_report_category_repository_1.MikroOrmReportCategoryRepository,
        type_orm_report_organization_repository_1.TypeOrmReportOrganizationRepository,
        mikro_orm_report_organization_repository_1.MikroOrmReportOrganizationRepository,
        type_orm_tag_repository_1.TypeOrmTagRepository,
        mikro_orm_tag_repository_1.MikroOrmTagRepository,
        type_orm_task_repository_1.TypeOrmTaskRepository,
        mikro_orm_task_repository_1.MikroOrmTaskRepository,
        type_orm_tenant_setting_repository_1.TypeOrmTenantSettingRepository,
        mikro_orm_tenant_setting_repository_1.MikroOrmTenantSettingRepository,
        type_orm_timesheet_repository_1.TypeOrmTimesheetRepository,
        mikro_orm_timesheet_repository_1.MikroOrmTimesheetRepository,
        type_orm_time_log_repository_1.TypeOrmTimeLogRepository,
        mikro_orm_time_log_repository_1.MikroOrmTimeLogRepository,
        type_orm_time_slot_repository_1.TypeOrmTimeSlotRepository,
        mikro_orm_time_slot_repository_1.MikroOrmTimeSlotRepository,
        type_orm_time_slot_minute_repository_1.TypeOrmTimeSlotMinuteRepository,
        mikro_orm_time_slot_minute_repository_1.MikroOrmTimeSlotMinuteRepository,
        type_orm_time_off_request_repository_1.TypeOrmTimeOffRequestRepository,
        mikro_orm_time_off_request_repository_1.MikroOrmTimeOffRequestRepository,
        type_orm_time_off_policy_repository_1.TypeOrmTimeOffPolicyRepository,
        mikro_orm_time_off_policy_repository_1.MikroOrmTimeOffPolicyRepository,
        type_orm_user_repository_1.TypeOrmUserRepository,
        mikro_orm_user_repository_1.MikroOrmUserRepository,
        type_orm_user_organization_repository_1.TypeOrmUserOrganizationRepository,
        mikro_orm_user_organization_repository_1.MikroOrmUserOrganizationRepository,
        index_1.ConfigService,
        connection_entity_manager_1.ConnectionEntityManager,
        cqrs_1.CommandBus])
], ImportService);
//# sourceMappingURL=import.service.js.map