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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const StringUtils_1 = require("typeorm/util/StringUtils");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const archiver = __importStar(require("archiver"));
const csv = __importStar(require("csv-writer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const fse = __importStar(require("fs-extra"));
const index_1 = require("../../../plugins/config/dist/index");
const index_2 = require("../../../plugins/plugin/dist/index");
const index_3 = require("../../../plugins/common/dist/index");
const connection_entity_manager_1 = require("../../database/connection-entity-manager");
const internal_1 = require("./../../core/entities/internal");
const context_1 = require("./../../core/context");
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
const mikro_orm_country_repository_1 = require("../../country/repository/mikro-orm-country.repository");
const type_orm_country_repository_1 = require("../../country/repository/type-orm-country.repository");
const mikro_orm_currency_repository_1 = require("../../currency/repository/mikro-orm-currency.repository");
const type_orm_currency_repository_1 = require("../../currency/repository/type-orm-currency.repository");
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
const mikro_orm_tenant_repository_1 = require("../../tenant/repository/mikro-orm-tenant.repository");
const type_orm_tenant_repository_1 = require("../../tenant/repository/type-orm-tenant.repository");
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
let ExportService = exports.ExportService = class ExportService {
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
    typeOrmCountryRepository;
    typeOrmCurrencyRepository;
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
    typeOrmTenantRepository;
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
    _dirname;
    _basename = '/export';
    idZip = new rxjs_1.BehaviorSubject('');
    idCsv = new rxjs_1.BehaviorSubject('');
    dynamicEntitiesClassMap = [];
    repositories = [];
    constructor(typeOrmAccountingTemplateRepository, mikroOrmAccountingTemplateRepository, typeOrmActivityRepository, mikroOrmActivityRepository, typeOrmAppointmentEmployeeRepository, mikroOrmAppointmentEmployeeRepository, typeOrmApprovalPolicyRepository, mikroOrmApprovalPolicyRepository, typeOrmAvailabilitySlotRepository, mikroOrmAvailabilitySlotRepository, typeOrmCandidateRepository, mikroOrmCandidateRepository, typeOrmCandidateCriterionsRatingRepository, mikroOrmCandidateCriterionsRatingRepository, typeOrmCandidateDocumentRepository, mikroOrmCandidateDocumentRepository, typeOrmCandidateEducationRepository, mikroOrmCandidateEducationRepository, typeOrmCandidateExperienceRepository, mikroOrmCandidateExperienceRepository, typeOrmCandidateFeedbackRepository, mikroOrmCandidateFeedbackRepository, typeOrmCandidateInterviewRepository, mikroOrmCandidateInterviewRepository, typeOrmCandidateInterviewersRepository, mikroOrmCandidateInterviewersRepository, typeOrmCandidatePersonalQualitiesRepository, mikroOrmCandidatePersonalQualitiesRepository, typeOrmCandidateSkillRepository, mikroOrmCandidateSkillRepository, typeOrmCandidateSourceRepository, mikroOrmCandidateSourceRepository, typeOrmCandidateTechnologiesRepository, mikroOrmCandidateTechnologiesRepository, typeOrmContactRepository, mikroOrmContactRepository, typeOrmCountryRepository, mikroOrmCountryRepository, typeOrmCurrencyRepository, mikroOrmCurrencyRepository, typeOrmCustomSmtpRepository, mikroOrmCustomSmtpRepository, typeOrmDealRepository, mikroOrmDealRepository, typeOrmEmailHistoryRepository, mikroOrmEmailHistoryRepository, typeOrmEmailTemplateRepository, mikroOrmEmailTemplateRepository, typeOrmEmployeeRepository, mikroOrmEmployeeRepository, typeOrmEmployeeAppointmentRepository, mikroOrmEmployeeAppointmentRepository, typeOrmEmployeeAwardRepository, mikroOrmEmployeeAwardRepository, typeOrmEmployeeRecurringExpenseRepository, mikroOrmEmployeeRecurringExpenseRepository, typeOrmEmployeeSettingRepository, mikroOrmEmployeeSettingRepository, typeOrmEquipmentRepository, mikroOrmEquipmentRepository, typeOrmEquipmentSharingRepository, mikroOrmEquipmentSharingRepository, typeOrmEquipmentSharingPolicyRepository, mikroOrmEquipmentSharingPolicyRepository, typeOrmEstimateEmailRepository, mikroOrmEstimateEmailRepository, typeOrmEventTypeRepository, mikroOrmEventTypeRepository, typeOrmExpenseRepository, mikroOrmExpenseRepository, typeOrmExpenseCategoryRepository, mikroOrmExpenseCategoryRepository, typeOrmFeatureRepository, mikroOrmFeatureRepository, typeOrmFeatureOrganizationRepository, mikroOrmFeatureOrganizationRepository, typeOrmGoalRepository, mikroOrmGoalRepository, typeOrmGoalTemplateRepository, mikroOrmGoalTemplateRepository, typeOrmGoalKPIRepository, mikroOrmGoalKPIRepository, typeOrmGoalKPITemplateRepository, mikroOrmGoalKPITemplateRepository, typeOrmGoalTimeFrameRepository, mikroOrmGoalTimeFrameRepository, typeOrmGoalGeneralSettingRepository, mikroOrmGoalGeneralSettingRepository, typeOrmIncomeRepository, mikroOrmIncomeRepository, typeOrmIntegrationRepository, mikroOrmIntegrationRepository, typeOrmIntegrationTypeRepository, mikroOrmIntegrationTypeRepository, typeOrmIntegrationEntitySettingRepository, mikroOrmIntegrationEntitySettingRepository, typeOrmIntegrationEntitySettingTiedRepository, mikroOrmIntegrationEntitySettingTiedRepository, typeOrmIntegrationMapRepository, mikroOrmIntegrationMapRepository, typeOrmIntegrationSettingRepository, mikroOrmIntegrationSettingRepository, typeOrmIntegrationTenantRepository, mikroOrmIntegrationTenantRepository, typeOrmInviteRepository, mikroOrmInviteRepository, typeOrmInvoiceRepository, mikroOrmInvoiceRepository, typeOrmInvoiceEstimateHistoryRepository, mikroOrmInvoiceEstimateHistoryRepository, typeOrmInvoiceItemRepository, mikroOrmInvoiceItemRepository, typeOrmKeyResultRepository, mikroOrmKeyResultRepository, typeOrmKeyResultTemplateRepository, mikroOrmKeyResultTemplateRepository, typeOrmKeyResultUpdateRepository, mikroOrmKeyResultUpdateRepository, typeOrmLanguageRepository, mikroOrmLanguageRepository, typeOrmOrganizationRepository, mikroOrmOrganizationRepository, typeOrmEmployeeLevelRepository, mikroOrmEmployeeLevelRepository, typeOrmOrganizationAwardRepository, mikroOrmOrganizationAwardRepository, typeOrmOrganizationContactRepository, mikroOrmOrganizationContactRepository, typeOrmOrganizationDepartmentRepository, mikroOrmOrganizationDepartmentRepository, typeOrmOrganizationDocumentRepository, mikroOrmOrganizationDocumentRepository, typeOrmOrganizationEmploymentTypeRepository, mikroOrmOrganizationEmploymentTypeRepository, typeOrmOrganizationLanguageRepository, mikroOrmOrganizationLanguageRepository, typeOrmOrganizationPositionRepository, mikroOrmOrganizationPositionRepository, typeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository, typeOrmOrganizationRecurringExpenseRepository, mikroOrmOrganizationRecurringExpenseRepository, typeOrmOrganizationSprintRepository, mikroOrmOrganizationSprintRepository, typeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository, typeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository, typeOrmOrganizationVendorRepository, mikroOrmOrganizationVendorRepository, typeOrmPaymentRepository, mikroOrmPaymentRepository, typeOrmPipelineRepository, mikroOrmPipelineRepository, typeOrmPipelineStageRepository, mikroOrmPipelineStageRepository, typeOrmProductRepository, mikroOrmProductRepository, typeOrmProductTranslationRepository, mikroOrmProductTranslationRepository, typeOrmProductCategoryRepository, mikroOrmProductCategoryRepository, typeOrmProductCategoryTranslationRepository, mikroOrmProductCategoryTranslationRepository, typeOrmProductOptionRepository, mikroOrmProductOptionRepository, typeOrmProductOptionTranslationRepository, mikroOrmProductOptionTranslationRepository, typeOrmProductOptionGroupRepository, mikroOrmProductOptionGroupRepository, typeOrmProductOptionGroupTranslationRepository, mikroOrmProductOptionGroupTranslationRepository, typeOrmProductVariantSettingRepository, mikroOrmProductVariantSettingRepository, typeOrmProductTypeRepository, mikroOrmProductTypeRepository, typeOrmProductTypeTranslationRepository, mikroOrmProductTypeTranslationRepository, typeOrmProductVariantRepository, mikroOrmProductVariantRepository, typeOrmProductVariantPriceRepository, mikroOrmProductVariantPriceRepository, typeOrmImageAssetRepository, mikroOrmImageAssetRepository, typeOrmWarehouseRepository, mikroOrmWarehouseRepository, typeOrmMerchantRepository, mikroOrmMerchantRepository, typeOrmWarehouseProductRepository, mikroOrmWarehouseProductRepository, typeOrmWarehouseProductVariantRepository, mikroOrmWarehouseProductVariantRepository, typeOrmSkillRepository, mikroOrmSkillRepository, typeOrmScreenshotRepository, mikroOrmScreenshotRepository, typeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository, typeOrmRequestApprovalEmployeeRepository, mikroOrmRequestApprovalEmployeeRepository, typeOrmRequestApprovalTeamRepository, mikroOrmRequestApprovalTeamRepository, typeOrmRoleRepository, mikroOrmRoleRepository, typeOrmRolePermissionRepository, mikroOrmRolePermissionRepository, typeOrmReportRepository, mikroOrmReportRepository, typeOrmReportCategoryRepository, mikroOrmReportCategoryRepository, typeOrmReportOrganizationRepository, mikroOrmReportOrganizationRepository, typeOrmTagRepository, mikroOrmTagRepository, typeOrmTaskRepository, mikroOrmTaskRepository, typeOrmTenantRepository, mikroOrmTenantRepository, typeOrmTenantSettingRepository, mikroOrmTenantSettingRepository, typeOrmTimesheetRepository, mikroOrmTimesheetRepository, typeOrmTimeLogRepository, mikroOrmTimeLogRepository, typeOrmTimeSlotRepository, mikroOrmTimeSlotRepository, typeOrmTimeSlotMinuteRepository, mikroOrmTimeSlotMinuteRepository, typeOrmTimeOffRequestRepository, mikroOrmTimeOffRequestRepository, typeOrmTimeOffPolicyRepository, mikroOrmTimeOffPolicyRepository, typeOrmUserRepository, mikroOrmUserRepository, typeOrmUserOrganizationRepository, mikroOrmUserOrganizationRepository, configService, _connectionEntityManager) {
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
        this.typeOrmCountryRepository = typeOrmCountryRepository;
        this.typeOrmCurrencyRepository = typeOrmCurrencyRepository;
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
        this.typeOrmTenantRepository = typeOrmTenantRepository;
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
    }
    async onModuleInit() {
        const public_path = this.configService.assetOptions.assetPublicPath || __dirname;
        //base import csv directory path
        this._dirname = path.join(public_path, this._basename);
        await this.createDynamicInstanceForPluginEntities();
        await this.registerCoreRepositories();
    }
    async createFolders() {
        return new Promise((resolve, reject) => {
            const id = (0, uuid_1.v4)();
            this.idCsv.next(id);
            fs.access(`${this._dirname}/${id}/csv`, (error) => {
                if (!error) {
                    return null;
                }
                else {
                    fs.mkdir(`${this._dirname}/${id}/csv`, { recursive: true }, (err) => {
                        if (err)
                            reject(err);
                        resolve('');
                    });
                }
            });
        });
    }
    async archiveAndDownload() {
        return new Promise((resolve, reject) => {
            {
                const id = (0, uuid_1.v4)();
                const fileNameS = id + '_export.zip';
                this.idZip.next(fileNameS);
                const output = fs.createWriteStream(`${this._dirname}/${fileNameS}`);
                const archive = archiver('zip', {
                    zlib: { level: 9 }
                });
                output.on('close', function () {
                    resolve('');
                });
                output.on('end', function () {
                    console.log('Data has been drained');
                });
                archive.on('warning', function (err) {
                    if (err.code === 'ENOENT') {
                        reject(err);
                    }
                    else {
                        console.log('Unexpected error!');
                    }
                });
                archive.on('error', function (err) {
                    reject(err);
                });
                let id$ = '';
                this.idCsv.subscribe((idCsv) => {
                    id$ = idCsv;
                });
                archive.pipe(output);
                archive.directory(`${this._dirname}/${id$}/csv`, false);
                archive.finalize();
            }
        });
    }
    async getAsCsv(item, where) {
        const conditions = {};
        if (item.tenantBase !== false) {
            conditions['where'] = {
                tenantId: where['tenantId']
            };
        }
        /*
        * Replace condition with default condition
        */
        if ((0, index_3.isNotEmpty)(item.condition) && (0, index_3.isNotEmpty)(conditions['where'])) {
            const { condition: { replace = 'tenantId', column = 'id' } } = item;
            if (`${replace}` in conditions['where']) {
                delete conditions['where'][replace];
                conditions['where'][column] = where[replace];
            }
        }
        const { repository } = item;
        const nameFile = repository.metadata.tableName;
        const [items, count] = await repository.findAndCount(conditions);
        if (count > 0) {
            return await this.csvWriter(nameFile, items);
        }
        return false;
    }
    async csvWriter(filename, items) {
        return new Promise((resolve, reject) => {
            try {
                const createCsvWriter = csv.createObjectCsvWriter;
                const dataIn = [];
                const dataKeys = Object.keys(items[0]);
                for (const count of dataKeys) {
                    dataIn.push({ id: count, title: count });
                }
                let id$ = '';
                this.idCsv.subscribe((id) => {
                    id$ = id;
                });
                const csvWriter = createCsvWriter({
                    path: `${this._dirname}/${id$}/csv/${filename}.csv`,
                    header: dataIn
                });
                csvWriter.writeRecords(items).then(() => {
                    resolve(items);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async csvTemplateWriter(filename, columns) {
        if (columns) {
            return new Promise((resolve) => {
                const createCsvWriter = csv.createObjectCsvWriter;
                const dataIn = [];
                const dataKeys = columns;
                for (const count of dataKeys) {
                    dataIn.push({ id: count, title: count });
                }
                let id$ = '';
                this.idCsv.subscribe((id) => {
                    id$ = id;
                });
                const csvWriter = createCsvWriter({
                    path: `${this._dirname}/${id$}/csv/${filename}.csv`,
                    header: dataIn
                });
                csvWriter.writeRecords([]).then(() => {
                    resolve('');
                });
            });
        }
        return false;
    }
    async downloadToUser(res) {
        return new Promise((resolve) => {
            let fileName = '';
            this.idZip.subscribe((filename) => {
                fileName = filename;
            });
            res.download(`${this._dirname}/${fileName}`);
            resolve('');
        });
    }
    async deleteCsvFiles() {
        return new Promise((resolve) => {
            let id$ = '';
            this.idCsv.subscribe((id) => {
                id$ = id;
            });
            fs.access(`${this._dirname}/${id$}`, (error) => {
                if (!error) {
                    fse.removeSync(`${this._dirname}/${id$}`);
                    resolve('');
                }
                else {
                    return null;
                }
            });
        });
    }
    async deleteArchive() {
        return new Promise((resolve) => {
            let fileName = '';
            this.idZip.subscribe((fileName$) => {
                fileName = fileName$;
            });
            fs.access(`${this._dirname}/${fileName}`, (error) => {
                if (!error) {
                    fse.removeSync(`${this._dirname}/${fileName}`);
                    resolve('');
                }
                else {
                    return null;
                }
            });
        });
    }
    async exportTables() {
        return new Promise(async (resolve, reject) => {
            try {
                for await (const item of this.repositories) {
                    await this.getAsCsv(item, {
                        tenantId: context_1.RequestContext.currentTenantId()
                    });
                    // export pivot relational tables
                    if ((0, index_3.isNotEmpty)(item.relations)) {
                        await this.exportRelationalTables(item, {
                            tenantId: context_1.RequestContext.currentTenantId()
                        });
                    }
                }
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async exportSpecificTables(names) {
        return new Promise(async (resolve, reject) => {
            try {
                for await (const item of this.repositories) {
                    const nameFile = item.repository.metadata.tableName;
                    if (names.includes(nameFile)) {
                        await this.getAsCsv(item, {
                            tenantId: context_1.RequestContext.currentTenantId()
                        });
                        // export pivot relational tables
                        if ((0, index_3.isNotEmpty)(item.relations)) {
                            await this.exportRelationalTables(item, {
                                tenantId: context_1.RequestContext.currentTenantId()
                            });
                        }
                    }
                }
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    /*
    * Export Many To Many Pivot Table Using TypeORM Relations
    */
    async exportRelationalTables(entity, where) {
        const { repository, relations } = entity;
        const masterTable = repository.metadata.givenTableName;
        for await (const item of repository.metadata.manyToManyRelations) {
            const relation = relations.find((relation) => relation.joinTableName === item.joinTableName);
            if (relation) {
                const [joinColumn] = item.joinColumns;
                if (joinColumn) {
                    const { entityMetadata, propertyName, referencedColumn } = joinColumn;
                    const referenceColumn = referencedColumn.propertyName;
                    const referenceTableName = entityMetadata.givenTableName;
                    let sql = `
						SELECT
							${referenceTableName}.*
						FROM
							${referenceTableName}
						INNER JOIN ${masterTable}
							ON "${referenceTableName}"."${propertyName}" = "${masterTable}"."${referenceColumn}"
					`;
                    if (entity.tenantBase !== false) {
                        sql += ` WHERE "${masterTable}"."tenantId" = '${where['tenantId']}'`;
                    }
                    const items = await repository.manager.query(sql);
                    if ((0, index_3.isNotEmpty)(items)) {
                        await this.csvWriter(referenceTableName, items);
                    }
                }
            }
        }
    }
    async exportSpecificTablesSchema() {
        return new Promise(async (resolve, reject) => {
            try {
                for await (const item of this.repositories) {
                    const { repository, relations } = item;
                    const nameFile = repository.metadata.tableName;
                    const columns = repository.metadata.ownColumns.map((column) => column.propertyName);
                    await this.csvTemplateWriter(nameFile, columns);
                    // export pivot relational tables
                    if ((0, index_3.isNotEmpty)(relations)) {
                        await this.exportRelationalTablesSchema(item);
                    }
                }
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async exportRelationalTablesSchema(entity) {
        const { repository, relations } = entity;
        for await (const item of repository.metadata.manyToManyRelations) {
            const relation = relations.find((relation) => relation.joinTableName === item.joinTableName);
            if (relation) {
                const referenceTableName = item.junctionEntityMetadata.givenTableName;
                const columns = item.junctionEntityMetadata.columns.map((column) => column.propertyName);
                await this.csvTemplateWriter(referenceTableName, columns);
            }
        }
    }
    /*
     * Load all plugins entities for export data
     */
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
     */
    async registerCoreRepositories() {
        this.repositories = [
            {
                repository: this.typeOrmAccountingTemplateRepository
            },
            {
                repository: this.typeOrmActivityRepository
            },
            {
                repository: this.typeOrmAppointmentEmployeeRepository
            },
            {
                repository: this.typeOrmApprovalPolicyRepository
            },
            {
                repository: this.typeOrmAvailabilitySlotRepository
            },
            {
                repository: this.typeOrmCandidateRepository,
                relations: [
                    { joinTableName: 'candidate_department' },
                    { joinTableName: 'candidate_employment_type' },
                    { joinTableName: 'tag_candidate' }
                ]
            },
            {
                repository: this.typeOrmCandidateCriterionsRatingRepository
            },
            {
                repository: this.typeOrmCandidateDocumentRepository
            },
            {
                repository: this.typeOrmCandidateEducationRepository
            },
            {
                repository: this.typeOrmCandidateExperienceRepository
            },
            {
                repository: this.typeOrmCandidateFeedbackRepository
            },
            {
                repository: this.typeOrmCandidateInterviewersRepository
            },
            {
                repository: this.typeOrmCandidateInterviewRepository
            },
            {
                repository: this.typeOrmCandidatePersonalQualitiesRepository
            },
            {
                repository: this.typeOrmCandidateSkillRepository
            },
            {
                repository: this.typeOrmCandidateSourceRepository
            },
            {
                repository: this.typeOrmCandidateTechnologiesRepository
            },
            {
                repository: this.typeOrmCustomSmtpRepository
            },
            {
                repository: this.typeOrmContactRepository
            },
            {
                repository: this.typeOrmCountryRepository,
                tenantBase: false
            },
            {
                repository: this.typeOrmCurrencyRepository,
                tenantBase: false
            },
            {
                repository: this.typeOrmDealRepository
            },
            {
                repository: this.typeOrmEmailHistoryRepository
            },
            {
                repository: this.typeOrmEmailTemplateRepository
            },
            {
                repository: this.typeOrmEmployeeAppointmentRepository
            },
            {
                repository: this.typeOrmEmployeeAwardRepository
            },
            {
                repository: this.typeOrmEmployeeLevelRepository,
                relations: [
                    { joinTableName: 'tag_organization_employee_level' }
                ]
            },
            {
                repository: this.typeOrmEmployeeRecurringExpenseRepository
            },
            {
                repository: this.typeOrmEmployeeRepository,
                relations: [
                    { joinTableName: 'tag_employee' }
                ]
            },
            {
                repository: this.typeOrmEmployeeSettingRepository
            },
            {
                repository: this.typeOrmEquipmentRepository,
                relations: [
                    { joinTableName: 'tag_equipment' }
                ]
            },
            {
                repository: this.typeOrmEquipmentSharingRepository,
                relations: [
                    { joinTableName: 'equipment_shares_employees' },
                    { joinTableName: 'equipment_shares_teams' }
                ]
            },
            {
                repository: this.typeOrmEquipmentSharingPolicyRepository
            },
            {
                repository: this.typeOrmEstimateEmailRepository
            },
            {
                repository: this.typeOrmEventTypeRepository,
                relations: [
                    { joinTableName: 'tag_event_type' }
                ]
            },
            {
                repository: this.typeOrmExpenseCategoryRepository,
                relations: [
                    { joinTableName: 'tag_organization_expense_category' }
                ]
            },
            {
                repository: this.typeOrmExpenseRepository,
                relations: [
                    { joinTableName: 'tag_expense' }
                ]
            },
            {
                repository: this.typeOrmFeatureRepository,
                tenantBase: false
            },
            {
                repository: this.typeOrmFeatureOrganizationRepository
            },
            {
                repository: this.typeOrmGoalKPIRepository
            },
            {
                repository: this.typeOrmGoalKPITemplateRepository
            },
            {
                repository: this.typeOrmGoalRepository
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
            {
                repository: this.typeOrmIncomeRepository,
                relations: [
                    { joinTableName: 'tag_income' }
                ]
            },
            {
                repository: this.typeOrmIntegrationEntitySettingRepository
            },
            {
                repository: this.typeOrmIntegrationEntitySettingTiedRepository
            },
            {
                repository: this.typeOrmIntegrationMapRepository
            },
            {
                repository: this.typeOrmIntegrationRepository,
                tenantBase: false,
                relations: [
                    { joinTableName: 'integration_integration_type' },
                    { joinTableName: 'tag_integration' }
                ]
            },
            {
                repository: this.typeOrmIntegrationSettingRepository
            },
            {
                repository: this.typeOrmIntegrationTypeRepository,
                tenantBase: false
            },
            {
                repository: this.typeOrmIntegrationTenantRepository
            },
            {
                repository: this.typeOrmInviteRepository,
                relations: [
                    { joinTableName: 'invite_organization_contact' },
                    { joinTableName: 'invite_organization_department' },
                    { joinTableName: 'invite_organization_project' }
                ]
            },
            {
                repository: this.typeOrmInvoiceEstimateHistoryRepository
            },
            {
                repository: this.typeOrmInvoiceItemRepository
            },
            {
                repository: this.typeOrmInvoiceRepository,
                relations: [
                    { joinTableName: 'tag_invoice' }
                ]
            },
            {
                repository: this.typeOrmKeyResultRepository
            },
            {
                repository: this.typeOrmKeyResultTemplateRepository
            },
            {
                repository: this.typeOrmKeyResultUpdateRepository
            },
            {
                repository: this.typeOrmLanguageRepository,
                tenantBase: false
            },
            {
                repository: this.typeOrmOrganizationAwardRepository
            },
            {
                repository: this.typeOrmOrganizationContactRepository,
                relations: [
                    { joinTableName: 'organization_contact_employee' },
                    { joinTableName: 'tag_organization_contact' }
                ]
            },
            {
                repository: this.typeOrmOrganizationDepartmentRepository,
                relations: [
                    { joinTableName: 'organization_department_employee' },
                    { joinTableName: 'tag_organization_department' }
                ]
            },
            {
                repository: this.typeOrmOrganizationDocumentRepository
            },
            {
                repository: this.typeOrmOrganizationEmploymentTypeRepository,
                relations: [
                    { joinTableName: 'organization_employment_type_employee' },
                    { joinTableName: 'tag_organization_employment_type' }
                ]
            },
            {
                repository: this.typeOrmOrganizationLanguageRepository
            },
            {
                repository: this.typeOrmOrganizationPositionRepository,
                relations: [
                    { joinTableName: 'tag_organization_position' }
                ]
            },
            {
                repository: this.typeOrmOrganizationProjectRepository,
                relations: [
                    { joinTableName: 'organization_project_employee' },
                    { joinTableName: 'tag_organization_project' }
                ]
            },
            {
                repository: this.typeOrmOrganizationRecurringExpenseRepository
            },
            {
                repository: this.typeOrmOrganizationRepository,
                relations: [
                    { joinTableName: 'tag_organization' }
                ]
            },
            {
                repository: this.typeOrmOrganizationSprintRepository
            },
            {
                repository: this.typeOrmOrganizationTeamEmployeeRepository
            },
            {
                repository: this.typeOrmOrganizationTeamRepository,
                relations: [
                    { joinTableName: 'tag_organization_team' }
                ]
            },
            {
                repository: this.typeOrmOrganizationVendorRepository,
                relations: [
                    { joinTableName: 'tag_organization_vendor' }
                ]
            },
            {
                repository: this.typeOrmPaymentRepository,
                relations: [
                    { joinTableName: 'tag_payment' }
                ]
            },
            {
                repository: this.typeOrmPipelineRepository
            },
            {
                repository: this.typeOrmProductCategoryRepository
            },
            {
                repository: this.typeOrmProductCategoryTranslationRepository
            },
            {
                repository: this.typeOrmProductOptionRepository
            },
            {
                repository: this.typeOrmProductOptionGroupRepository
            },
            {
                repository: this.typeOrmProductOptionGroupTranslationRepository
            },
            {
                repository: this.typeOrmProductOptionTranslationRepository
            },
            {
                repository: this.typeOrmProductRepository,
                relations: [
                    { joinTableName: 'product_gallery_item' },
                    { joinTableName: 'tag_product' }
                ]
            },
            {
                repository: this.typeOrmProductTranslationRepository
            },
            {
                repository: this.typeOrmProductTypeRepository
            },
            {
                repository: this.typeOrmProductTypeTranslationRepository
            },
            {
                repository: this.typeOrmProductVariantPriceRepository
            },
            {
                repository: this.typeOrmProductVariantRepository,
                relations: [
                    { joinTableName: 'product_variant_options_product_option' }
                ]
            },
            {
                repository: this.typeOrmProductVariantSettingRepository
            },
            {
                repository: this.typeOrmImageAssetRepository
            },
            {
                repository: this.typeOrmWarehouseRepository,
                relations: [
                    { joinTableName: 'tag_warehouse' }
                ]
            },
            {
                repository: this.typeOrmMerchantRepository,
                relations: [
                    { joinTableName: 'warehouse_merchant' },
                    { joinTableName: 'tag_merchant' }
                ]
            },
            {
                repository: this.typeOrmWarehouseProductRepository
            },
            {
                repository: this.typeOrmWarehouseProductVariantRepository
            },
            {
                repository: this.typeOrmReportCategoryRepository,
                tenantBase: false
            },
            {
                repository: this.typeOrmReportOrganizationRepository
            },
            {
                repository: this.typeOrmReportRepository,
                tenantBase: false
            },
            {
                repository: this.typeOrmRequestApprovalRepository,
                relations: [
                    { joinTableName: 'tag_request_approval' }
                ]
            },
            {
                repository: this.typeOrmRequestApprovalEmployeeRepository
            },
            {
                repository: this.typeOrmRequestApprovalTeamRepository
            },
            {
                repository: this.typeOrmRolePermissionRepository
            },
            {
                repository: this.typeOrmRoleRepository
            },
            {
                repository: this.typeOrmScreenshotRepository
            },
            {
                repository: this.typeOrmSkillRepository,
                relations: [
                    { joinTableName: 'skill_employee' },
                    { joinTableName: 'skill_organization' }
                ]
            },
            {
                repository: this.typeOrmPipelineStageRepository
            },
            {
                repository: this.typeOrmTagRepository
            },
            {
                repository: this.typeOrmTaskRepository,
                relations: [
                    { joinTableName: 'task_employee' },
                    { joinTableName: 'task_team' },
                    { joinTableName: 'tag_task' },
                ]
            },
            {
                repository: this.typeOrmTenantRepository,
                condition: { column: 'id', replace: 'tenantId' }
            },
            {
                repository: this.typeOrmTenantSettingRepository
            },
            {
                repository: this.typeOrmTimeLogRepository,
                relations: [
                    { joinTableName: 'time_slot_time_logs' }
                ]
            },
            {
                repository: this.typeOrmTimeOffPolicyRepository,
                relations: [
                    { joinTableName: 'time_off_policy_employee' }
                ]
            },
            {
                repository: this.typeOrmTimeOffRequestRepository,
                relations: [
                    { joinTableName: 'time_off_request_employee' }
                ]
            },
            {
                repository: this.typeOrmTimesheetRepository
            },
            {
                repository: this.typeOrmTimeSlotRepository
            },
            {
                repository: this.typeOrmTimeSlotMinuteRepository
            },
            {
                repository: this.typeOrmUserOrganizationRepository
            },
            {
                repository: this.typeOrmUserRepository
            },
            ...this.dynamicEntitiesClassMap
        ];
    }
};
exports.ExportService = ExportService = __decorate([
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
    __param(36, (0, typeorm_1.InjectRepository)(internal_1.Country)),
    __param(38, (0, typeorm_1.InjectRepository)(internal_1.Currency)),
    __param(40, (0, typeorm_1.InjectRepository)(internal_1.CustomSmtp)),
    __param(42, (0, typeorm_1.InjectRepository)(internal_1.Deal)),
    __param(44, (0, typeorm_1.InjectRepository)(internal_1.EmailHistory)),
    __param(46, (0, typeorm_1.InjectRepository)(internal_1.EmailTemplate)),
    __param(48, (0, typeorm_1.InjectRepository)(internal_1.Employee)),
    __param(50, (0, typeorm_1.InjectRepository)(internal_1.EmployeeAppointment)),
    __param(52, (0, typeorm_1.InjectRepository)(internal_1.EmployeeAward)),
    __param(54, (0, typeorm_1.InjectRepository)(internal_1.EmployeeRecurringExpense)),
    __param(56, (0, typeorm_1.InjectRepository)(internal_1.EmployeeSetting)),
    __param(58, (0, typeorm_1.InjectRepository)(internal_1.Equipment)),
    __param(60, (0, typeorm_1.InjectRepository)(internal_1.EquipmentSharing)),
    __param(62, (0, typeorm_1.InjectRepository)(internal_1.EquipmentSharingPolicy)),
    __param(64, (0, typeorm_1.InjectRepository)(internal_1.EstimateEmail)),
    __param(66, (0, typeorm_1.InjectRepository)(internal_1.EventType)),
    __param(68, (0, typeorm_1.InjectRepository)(internal_1.Expense)),
    __param(70, (0, typeorm_1.InjectRepository)(internal_1.ExpenseCategory)),
    __param(72, (0, typeorm_1.InjectRepository)(internal_1.Feature)),
    __param(74, (0, typeorm_1.InjectRepository)(internal_1.FeatureOrganization)),
    __param(76, (0, typeorm_1.InjectRepository)(internal_1.Goal)),
    __param(78, (0, typeorm_1.InjectRepository)(internal_1.GoalTemplate)),
    __param(80, (0, typeorm_1.InjectRepository)(internal_1.GoalKPI)),
    __param(82, (0, typeorm_1.InjectRepository)(internal_1.GoalKPITemplate)),
    __param(84, (0, typeorm_1.InjectRepository)(internal_1.GoalTimeFrame)),
    __param(86, (0, typeorm_1.InjectRepository)(internal_1.GoalGeneralSetting)),
    __param(88, (0, typeorm_1.InjectRepository)(internal_1.Income)),
    __param(90, (0, typeorm_1.InjectRepository)(internal_1.Integration)),
    __param(92, (0, typeorm_1.InjectRepository)(internal_1.IntegrationType)),
    __param(94, (0, typeorm_1.InjectRepository)(internal_1.IntegrationEntitySetting)),
    __param(96, (0, typeorm_1.InjectRepository)(internal_1.IntegrationEntitySettingTied)),
    __param(98, (0, typeorm_1.InjectRepository)(internal_1.IntegrationMap)),
    __param(100, (0, typeorm_1.InjectRepository)(internal_1.IntegrationSetting)),
    __param(102, (0, typeorm_1.InjectRepository)(internal_1.IntegrationTenant)),
    __param(104, (0, typeorm_1.InjectRepository)(internal_1.Invite)),
    __param(106, (0, typeorm_1.InjectRepository)(internal_1.Invoice)),
    __param(108, (0, typeorm_1.InjectRepository)(internal_1.InvoiceEstimateHistory)),
    __param(110, (0, typeorm_1.InjectRepository)(internal_1.InvoiceItem)),
    __param(112, (0, typeorm_1.InjectRepository)(internal_1.KeyResult)),
    __param(114, (0, typeorm_1.InjectRepository)(internal_1.KeyResultTemplate)),
    __param(116, (0, typeorm_1.InjectRepository)(internal_1.KeyResultUpdate)),
    __param(118, (0, typeorm_1.InjectRepository)(internal_1.Language)),
    __param(120, (0, typeorm_1.InjectRepository)(internal_1.Organization)),
    __param(122, (0, typeorm_1.InjectRepository)(internal_1.EmployeeLevel)),
    __param(124, (0, typeorm_1.InjectRepository)(internal_1.OrganizationAward)),
    __param(126, (0, typeorm_1.InjectRepository)(internal_1.OrganizationContact)),
    __param(128, (0, typeorm_1.InjectRepository)(internal_1.OrganizationDepartment)),
    __param(130, (0, typeorm_1.InjectRepository)(internal_1.OrganizationDocument)),
    __param(132, (0, typeorm_1.InjectRepository)(internal_1.OrganizationEmploymentType)),
    __param(134, (0, typeorm_1.InjectRepository)(internal_1.OrganizationLanguage)),
    __param(136, (0, typeorm_1.InjectRepository)(internal_1.OrganizationPosition)),
    __param(138, (0, typeorm_1.InjectRepository)(internal_1.OrganizationProject)),
    __param(140, (0, typeorm_1.InjectRepository)(internal_1.OrganizationRecurringExpense)),
    __param(142, (0, typeorm_1.InjectRepository)(internal_1.OrganizationSprint)),
    __param(144, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeam)),
    __param(146, (0, typeorm_1.InjectRepository)(internal_1.OrganizationTeamEmployee)),
    __param(148, (0, typeorm_1.InjectRepository)(internal_1.OrganizationVendor)),
    __param(150, (0, typeorm_1.InjectRepository)(internal_1.Payment)),
    __param(152, (0, typeorm_1.InjectRepository)(internal_1.Pipeline)),
    __param(154, (0, typeorm_1.InjectRepository)(internal_1.PipelineStage)),
    __param(156, (0, typeorm_1.InjectRepository)(internal_1.Product)),
    __param(158, (0, typeorm_1.InjectRepository)(internal_1.ProductTranslation)),
    __param(160, (0, typeorm_1.InjectRepository)(internal_1.ProductCategory)),
    __param(162, (0, typeorm_1.InjectRepository)(internal_1.ProductCategoryTranslation)),
    __param(164, (0, typeorm_1.InjectRepository)(internal_1.ProductOption)),
    __param(166, (0, typeorm_1.InjectRepository)(internal_1.ProductOptionTranslation)),
    __param(168, (0, typeorm_1.InjectRepository)(internal_1.ProductOptionGroup)),
    __param(170, (0, typeorm_1.InjectRepository)(internal_1.ProductOptionGroupTranslation)),
    __param(172, (0, typeorm_1.InjectRepository)(internal_1.ProductVariantSetting)),
    __param(174, (0, typeorm_1.InjectRepository)(internal_1.ProductType)),
    __param(176, (0, typeorm_1.InjectRepository)(internal_1.ProductTypeTranslation)),
    __param(178, (0, typeorm_1.InjectRepository)(internal_1.ProductVariant)),
    __param(180, (0, typeorm_1.InjectRepository)(internal_1.ProductVariantPrice)),
    __param(182, (0, typeorm_1.InjectRepository)(internal_1.ImageAsset)),
    __param(184, (0, typeorm_1.InjectRepository)(internal_1.Warehouse)),
    __param(186, (0, typeorm_1.InjectRepository)(internal_1.Merchant)),
    __param(188, (0, typeorm_1.InjectRepository)(internal_1.WarehouseProduct)),
    __param(190, (0, typeorm_1.InjectRepository)(internal_1.WarehouseProductVariant)),
    __param(192, (0, typeorm_1.InjectRepository)(internal_1.Skill)),
    __param(194, (0, typeorm_1.InjectRepository)(internal_1.Screenshot)),
    __param(196, (0, typeorm_1.InjectRepository)(internal_1.RequestApproval)),
    __param(198, (0, typeorm_1.InjectRepository)(internal_1.RequestApprovalEmployee)),
    __param(200, (0, typeorm_1.InjectRepository)(internal_1.RequestApprovalTeam)),
    __param(202, (0, typeorm_1.InjectRepository)(internal_1.Role)),
    __param(204, (0, typeorm_1.InjectRepository)(internal_1.RolePermission)),
    __param(206, (0, typeorm_1.InjectRepository)(internal_1.Report)),
    __param(208, (0, typeorm_1.InjectRepository)(internal_1.ReportCategory)),
    __param(210, (0, typeorm_1.InjectRepository)(internal_1.ReportOrganization)),
    __param(212, (0, typeorm_1.InjectRepository)(internal_1.Tag)),
    __param(214, (0, typeorm_1.InjectRepository)(internal_1.Task)),
    __param(216, (0, typeorm_1.InjectRepository)(internal_1.Tenant)),
    __param(218, (0, typeorm_1.InjectRepository)(internal_1.TenantSetting)),
    __param(220, (0, typeorm_1.InjectRepository)(internal_1.Timesheet)),
    __param(222, (0, typeorm_1.InjectRepository)(internal_1.TimeLog)),
    __param(224, (0, typeorm_1.InjectRepository)(internal_1.TimeSlot)),
    __param(226, (0, typeorm_1.InjectRepository)(internal_1.TimeSlotMinute)),
    __param(228, (0, typeorm_1.InjectRepository)(internal_1.TimeOffRequest)),
    __param(230, (0, typeorm_1.InjectRepository)(internal_1.TimeOffPolicy)),
    __param(232, (0, typeorm_1.InjectRepository)(internal_1.User)),
    __param(234, (0, typeorm_1.InjectRepository)(internal_1.UserOrganization)),
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
        type_orm_country_repository_1.TypeOrmCountryRepository,
        mikro_orm_country_repository_1.MikroOrmCountryRepository,
        type_orm_currency_repository_1.TypeOrmCurrencyRepository,
        mikro_orm_currency_repository_1.MikroOrmCurrencyRepository,
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
        type_orm_tenant_repository_1.TypeOrmTenantRepository,
        mikro_orm_tenant_repository_1.MikroOrmTenantRepository,
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
        connection_entity_manager_1.ConnectionEntityManager])
], ExportService);
//# sourceMappingURL=export.service.js.map