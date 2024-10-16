import { ConfigService } from '../../../plugins/config/dist/index';
import { Repository } from 'typeorm';
import { Organization } from '../../core/entities/internal';
import { TypeOrmActivityRepository } from '../../time-tracking/activity/repository/type-orm-activity.repository';
import { MikroOrmActivityRepository } from '../../time-tracking/activity/repository/mikro-orm-activity.repository';
import { MikroOrmAppointmentEmployeeRepository } from '../../appointment-employees/repository/mikro-orm-appointment-employee.repository';
import { TypeOrmAppointmentEmployeeRepository } from '../../appointment-employees/repository/type-orm-appointment-employee.repository';
import { MikroOrmApprovalPolicyRepository } from '../../approval-policy/repository/mikro-orm-approval-policy.repository';
import { TypeOrmApprovalPolicyRepository } from '../../approval-policy/repository/type-orm-approval-policy.repository';
import { MikroOrmAvailabilitySlotRepository } from '../../availability-slots/repository/mikro-orm-availability-slot.repository';
import { TypeOrmAvailabilitySlotRepository } from '../../availability-slots/repository/type-orm-availability-slot.repository';
import { MikroOrmCandidateCriterionsRatingRepository } from '../../candidate-criterions-rating/repository/mikro-orm-candidate-criterions-rating.repository';
import { TypeOrmCandidateCriterionsRatingRepository } from '../../candidate-criterions-rating/repository/type-orm-candidate-criterions-rating.repository';
import { MikroOrmCandidateDocumentRepository } from '../../candidate-documents/repository/mikro-orm-candidate-document.repository';
import { TypeOrmCandidateDocumentRepository } from '../../candidate-documents/repository/type-orm-candidate-document.repository';
import { MikroOrmCandidateEducationRepository } from '../../candidate-education/repository/mikro-orm-candidate-education.repository';
import { TypeOrmCandidateEducationRepository } from '../../candidate-education/repository/type-orm-candidate-education.repository';
import { MikroOrmCandidateExperienceRepository } from '../../candidate-experience/repository/mikro-orm-candidate-experience.repository';
import { TypeOrmCandidateExperienceRepository } from '../../candidate-experience/repository/type-orm-candidate-experience.repository';
import { MikroOrmCandidateFeedbackRepository } from '../../candidate-feedbacks/repository/mikro-orm-candidate-feedback.repository';
import { TypeOrmCandidateFeedbackRepository } from '../../candidate-feedbacks/repository/type-orm-candidate-feedback.repository';
import { MikroOrmCandidateInterviewRepository } from '../../candidate-interview/repository/mikro-orm-candidate-interview.repository';
import { TypeOrmCandidateInterviewRepository } from '../../candidate-interview/repository/type-orm-candidate-interview.repository';
import { MikroOrmCandidateInterviewersRepository } from '../../candidate-interviewers/repository/mikro-orm-candidate-interviewers.repository';
import { TypeOrmCandidateInterviewersRepository } from '../../candidate-interviewers/repository/type-orm-candidate-interviewers.repository';
import { MikroOrmCandidateSkillRepository } from '../../candidate-skill/repository/mikro-orm-candidate-skill.repository';
import { TypeOrmCandidateSkillRepository } from '../../candidate-skill/repository/type-orm-candidate-skill.repository';
import { MikroOrmCandidateSourceRepository } from '../../candidate-source/repository/mikro-orm-candidate-source.repository';
import { TypeOrmCandidateSourceRepository } from '../../candidate-source/repository/type-orm-candidate-source.repository';
import { MikroOrmCandidateTechnologiesRepository } from '../../candidate-technologies/repository/mikro-orm-candidate-technologies.repository';
import { TypeOrmCandidateTechnologiesRepository } from '../../candidate-technologies/repository/type-orm-candidate-technologies.repository';
import { MikroOrmCandidateRepository } from '../../candidate/repository/mikro-orm-candidate.repository';
import { TypeOrmCandidateRepository } from '../../candidate/repository/type-orm-candidate.repository';
import { MikroOrmContactRepository } from '../../contact/repository/mikro-orm-contact.repository';
import { TypeOrmContactRepository } from '../../contact/repository/type-orm-contact.repository';
import { MikroOrmDealRepository } from '../../deal/repository/mikro-orm-deal.repository';
import { TypeOrmDealRepository } from '../../deal/repository/type-orm-deal.repository';
import { MikroOrmEmailHistoryRepository } from '../../email-history/repository/mikro-orm-email-history.repository';
import { TypeOrmEmailHistoryRepository } from '../../email-history/repository/type-orm-email-history.repository';
import { MikroOrmEmployeeAppointmentRepository } from '../../employee-appointment/repository/mikro-orm-employee-appointment.repository';
import { TypeOrmEmployeeAppointmentRepository } from '../../employee-appointment/repository/type-orm-employee-appointment.repository';
import { MikroOrmEmployeeAwardRepository } from '../../employee-award/repository/mikro-orm-employee-award.repository';
import { TypeOrmEmployeeAwardRepository } from '../../employee-award/repository/type-orm-employee-award.repository';
import { MikroOrmEmployeeLevelRepository } from '../../employee-level/repository/mikro-orm-employee-level.repository';
import { TypeOrmEmployeeLevelRepository } from '../../employee-level/repository/type-orm-employee-level.repository';
import { MikroOrmEmployeeRecurringExpenseRepository } from '../../employee-recurring-expense/repository/mikro-orm-employee-recurring-expense.repository';
import { TypeOrmEmployeeRecurringExpenseRepository } from '../../employee-recurring-expense/repository/type-orm-employee-recurring-expense.repository';
import { MikroOrmEmployeeSettingRepository } from '../../employee-setting/repository/mikro-orm-employee-setting.repository';
import { TypeOrmEmployeeSettingRepository } from '../../employee-setting/repository/type-orm-employee-setting.repository';
import { MikroOrmEmployeeRepository } from '../../employee/repository/mikro-orm-employee.repository';
import { TypeOrmEmployeeRepository } from '../../employee/repository/type-orm-employee.repository';
import { MikroOrmEquipmentSharingRepository } from '../../equipment-sharing/repository/mikro-orm-equipment-sharing.repository';
import { TypeOrmEquipmentSharingRepository } from '../../equipment-sharing/repository/type-orm-equipment-sharing.repository';
import { MikroOrmEquipmentRepository } from '../../equipment/repository/mikro-orm-equipment.repository';
import { TypeOrmEquipmentRepository } from '../../equipment/repository/type-orm-equipment.repository';
import { MikroOrmEstimateEmailRepository } from '../../estimate-email/repository/mikro-orm-estimate-email.repository';
import { TypeOrmEstimateEmailRepository } from '../../estimate-email/repository/type-orm-estimate-email.repository';
import { MikroOrmEventTypeRepository } from '../../event-types/repository/mikro-orm-event-type.repository';
import { TypeOrmEventTypeRepository } from '../../event-types/repository/type-orm-event-types.repository';
import { MikroOrmExpenseCategoryRepository } from '../../expense-categories/repository/mikro-orm-expense-category.repository';
import { TypeOrmExpenseCategoryRepository } from '../../expense-categories/repository/type-orm-expense-category.repository';
import { MikroOrmExpenseRepository } from '../../expense/repository/mikro-orm-expense.repository';
import { TypeOrmExpenseRepository } from '../../expense/repository/type-orm-expense.repository';
import { MikroOrmFeatureOrganizationRepository } from '../../feature/repository/mikro-orm-feature-organization.repository';
import { TypeOrmFeatureOrganizationRepository } from '../../feature/repository/type-orm-feature-organization.repository';
import { MikroOrmGoalKPITemplateRepository } from '../../goal-kpi-template/repository/mikro-orm-goal-kpi-template.repository';
import { TypeOrmGoalKPITemplateRepository } from '../../goal-kpi-template/repository/type-orm-goal-kpi-template.repository';
import { MikroOrmGoalKPIRepository } from '../../goal-kpi/repository/mikro-orm-goal-kpi.repository';
import { TypeOrmGoalKPIRepository } from '../../goal-kpi/repository/type-orm-goal-kpi.repository';
import { MikroOrmGoalTemplateRepository } from '../../goal-template/repository/mikro-orm-goal-template.repository';
import { TypeOrmGoalTemplateRepository } from '../../goal-template/repository/type-orm-goal-template.repository';
import { MikroOrmGoalTimeFrameRepository } from '../../goal-time-frame/repository/mikro-orm-goal-time-frame.repository';
import { TypeOrmGoalTimeFrameRepository } from '../../goal-time-frame/repository/type-orm-goal-time-frame.repository';
import { MikroOrmGoalRepository } from '../../goal/repository/mikro-orm-goal.repository';
import { TypeOrmGoalRepository } from '../../goal/repository/type-orm-goal.repository';
import { MikroOrmIncomeRepository } from '../../income/repository/mikro-orm-income.repository';
import { TypeOrmIncomeRepository } from '../../income/repository/type-orm-income.repository';
import { MikroOrmIntegrationEntitySettingTiedRepository } from '../../integration-entity-setting-tied/repository/mikro-orm-integration-entity-setting-tied.repository';
import { TypeOrmIntegrationEntitySettingTiedRepository } from '../../integration-entity-setting-tied/repository/type-orm-integration-entity-setting-tied.repository';
import { MikroOrmIntegrationEntitySettingRepository } from '../../integration-entity-setting/repository/mikro-orm-integration-entity-setting.repository';
import { TypeOrmIntegrationEntitySettingRepository } from '../../integration-entity-setting/repository/type-orm-integration-entity-setting.repository';
import { MikroOrmIntegrationMapRepository } from '../../integration-map/repository/mikro-orm-integration-map.repository';
import { TypeOrmIntegrationMapRepository } from '../../integration-map/repository/type-orm-integration-map.repository';
import { MikroOrmIntegrationSettingRepository } from '../../integration-setting/repository/mikro-orm-integration-setting.repository';
import { TypeOrmIntegrationSettingRepository } from '../../integration-setting/repository/type-orm-integration-setting.repository';
import { MikroOrmIntegrationTenantRepository } from '../../integration-tenant/repository/mikro-orm-integration-tenant.repository';
import { TypeOrmIntegrationTenantRepository } from '../../integration-tenant/repository/type-orm-integration-tenant.repository';
import { MikroOrmInviteRepository } from '../../invite/repository/mikro-orm-invite.repository';
import { TypeOrmInviteRepository } from '../../invite/repository/type-orm-invite.repository';
import { MikroOrmInvoiceEstimateHistoryRepository } from '../../invoice-estimate-history/repository/mikro-orm-invoice-estimate-history.repository';
import { TypeOrmInvoiceEstimateHistoryRepository } from '../../invoice-estimate-history/repository/type-orm-invoice-estimate-history.repository';
import { MikroOrmInvoiceItemRepository } from '../../invoice-item/repository/mikro-orm-invoice-item.repository';
import { TypeOrmInvoiceItemRepository } from '../../invoice-item/repository/type-orm-invoice-item.repository';
import { MikroOrmInvoiceRepository } from '../../invoice/repository/mikro-orm-invoice.repository';
import { TypeOrmInvoiceRepository } from '../../invoice/repository/type-orm-invoice.repository';
import { MikroOrmKeyResultTemplateRepository } from '../../keyresult-template/repository/mikro-orm-keyresult-template.repository';
import { TypeOrmKeyResultTemplateRepository } from '../../keyresult-template/repository/type-orm-keyresult-template.repository';
import { MikroOrmKeyResultUpdateRepository } from '../../keyresult-update/repository/mikro-orm-keyresult-update.repository';
import { TypeOrmKeyResultUpdateRepository } from '../../keyresult-update/repository/type-orm-keyresult-update.repository';
import { MikroOrmKeyResultRepository } from '../../keyresult/repository/mikro-orm-keyresult.repository';
import { TypeOrmKeyResultRepository } from '../../keyresult/repository/type-orm-keyresult.repository';
import { MikroOrmOrganizationAwardRepository } from '../../organization-award/repository/mikro-orm-organization-award.repository';
import { TypeOrmOrganizationAwardRepository } from '../../organization-award/repository/type-orm-organization-award.repository';
import { MikroOrmOrganizationContactRepository } from '../../organization-contact/repository/mikro-orm-organization-contact.repository';
import { TypeOrmOrganizationContactRepository } from '../../organization-contact/repository/type-orm-organization-contact.repository';
import { MikroOrmOrganizationDepartmentRepository } from '../../organization-department/repository/mikro-orm-organization-department.repository';
import { TypeOrmOrganizationDepartmentRepository } from '../../organization-department/repository/type-orm-organization-department.repository';
import { MikroOrmOrganizationDocumentRepository } from '../../organization-document/repository/mikro-orm-organization-document.repository';
import { TypeOrmOrganizationDocumentRepository } from '../../organization-document/repository/type-orm-organization-document.repository';
import { MikroOrmOrganizationEmploymentTypeRepository } from '../../organization-employment-type/repository/mikro-orm-organization-employment-type.repository';
import { TypeOrmOrganizationEmploymentTypeRepository } from '../../organization-employment-type/repository/type-orm-organization-employment-type.repository';
import { MikroOrmOrganizationLanguageRepository } from '../../organization-language/repository/mikro-orm-organization-language.repository';
import { TypeOrmOrganizationLanguageRepository } from '../../organization-language/repository/type-orm-organization-language.repository';
import { MikroOrmOrganizationPositionRepository } from '../../organization-position/repository/mikro-orm-organization-position.repository';
import { TypeOrmOrganizationPositionRepository } from '../../organization-position/repository/type-orm-organization-position.repository';
import { MikroOrmOrganizationProjectRepository } from '../../organization-project/repository/mikro-orm-organization-project.repository';
import { TypeOrmOrganizationProjectRepository } from '../../organization-project/repository/type-orm-organization-project.repository';
import { MikroOrmOrganizationRecurringExpenseRepository } from '../../organization-recurring-expense/repository/mikro-orm-organization-recurring-expense.repository';
import { TypeOrmOrganizationRecurringExpenseRepository } from '../../organization-recurring-expense/repository/type-orm-organization-recurring-expense.repository';
import { MikroOrmOrganizationSprintRepository } from '../../organization-sprint/repository/mikro-orm-organization-sprint.repository';
import { TypeOrmOrganizationSprintRepository } from '../../organization-sprint/repository/type-orm-organization-sprint.repository';
import { MikroOrmOrganizationTeamEmployeeRepository } from '../../organization-team-employee/repository/mikro-orm-organization-team-employee.repository';
import { TypeOrmOrganizationTeamEmployeeRepository } from '../../organization-team-employee/repository/type-orm-organization-team-employee.repository';
import { MikroOrmOrganizationTeamRepository } from '../../organization-team/repository/mikro-orm-organization-team.repository';
import { TypeOrmOrganizationTeamRepository } from '../../organization-team/repository/type-orm-organization-team.repository';
import { MikroOrmOrganizationVendorRepository } from '../../organization-vendor/repository/mikro-orm-organization-vendor.repository';
import { TypeOrmOrganizationVendorRepository } from '../../organization-vendor/repository/type-orm-organization-vendor.repository';
import { MikroOrmOrganizationRepository } from '../../organization/repository/mikro-orm-organization.repository';
import { TypeOrmOrganizationRepository } from '../../organization/repository/type-orm-organization.repository';
import { MikroOrmPaymentRepository } from '../../payment/repository/mikro-orm-payment.repository';
import { TypeOrmPaymentRepository } from '../../payment/repository/type-orm-payment.repository';
import { MikroOrmPipelineStageRepository } from '../../pipeline-stage/repository/mikro-orm-pipeline-stage.repository';
import { TypeOrmPipelineStageRepository } from '../../pipeline-stage/repository/type-orm-pipeline-stage.repository';
import { MikroOrmPipelineRepository } from '../../pipeline/repository/mikro-orm-pipeline.repository';
import { TypeOrmPipelineRepository } from '../../pipeline/repository/type-orm-pipeline.repository';
import { MikroOrmProductCategoryRepository } from '../../product-category/repository/mikro-orm-product-category.repository';
import { TypeOrmProductCategoryRepository } from '../../product-category/repository/type-orm-product-category.repository';
import { MikroOrmProductOptionRepository } from '../../product-option/repository/mikro-orm-product-option.repository';
import { TypeOrmProductOptionRepository } from '../../product-option/repository/type-orm-product-option.repository';
import { MikroOrmProductVariantSettingRepository } from '../../product-setting/repository/mikro-orm-product-setting.repository';
import { TypeOrmProductVariantSettingRepository } from '../../product-setting/repository/type-orm-product-setting.repository';
import { MikroOrmProductVariantPriceRepository } from '../../product-variant-price/repository/mikro-orm-product-variant-price.repository';
import { TypeOrmProductVariantPriceRepository } from '../../product-variant-price/repository/type-orm-product-variant-price.repository';
import { MikroOrmProductVariantRepository } from '../../product-variant/repository/mikro-orm-product-variant.repository';
import { TypeOrmProductVariantRepository } from '../../product-variant/repository/type-orm-product-variant.repository';
import { MikroOrmProductRepository } from '../../product/repository/mikro-orm-product.repository';
import { TypeOrmProductRepository } from '../../product/repository/type-orm-product.repository';
import { MikroOrmRequestApprovalRepository } from '../../request-approval/repository/mikro-orm-request-approval.repository';
import { TypeOrmRequestApprovalRepository } from '../../request-approval/repository/type-orm-request-approval.repository';
import { MikroOrmSkillRepository } from '../../skills/repository/mikro-orm-skill.repository';
import { TypeOrmSkillRepository } from '../../skills/repository/type-orm-skill.repository';
import { MikroOrmTagRepository } from '../../tags/repository/mikro-orm-tag.repository';
import { TypeOrmTagRepository } from '../../tags/repository/type-orm-tag.repository';
import { MikroOrmTaskRepository } from '../../tasks/repository/mikro-orm-task.repository';
import { TypeOrmTaskRepository } from '../../tasks/repository/type-orm-task.repository';
import { MikroOrmTenantSettingRepository } from '../../tenant/tenant-setting/repository/mikro-orm-tenant-setting.repository';
import { TypeOrmTenantSettingRepository } from '../../tenant/tenant-setting/repository/type-orm-tenant-setting.repository';
import { MikroOrmTimeOffPolicyRepository } from '../../time-off-policy/repository/mikro-orm-time-off-policy.repository';
import { TypeOrmTimeOffPolicyRepository } from '../../time-off-policy/repository/type-orm-time-off-policy.repository';
import { MikroOrmTimeOffRequestRepository } from '../../time-off-request/repository/mikro-orm-time-off-request.repository';
import { TypeOrmTimeOffRequestRepository } from '../../time-off-request/repository/type-orm-time-off-request.repository';
import { MikroOrmScreenshotRepository } from '../../time-tracking/screenshot/repository/mikro-orm-screenshot.repository';
import { TypeOrmScreenshotRepository } from '../../time-tracking/screenshot/repository/type-orm-screenshot.repository';
import { MikroOrmTimeLogRepository } from '../../time-tracking/time-log/repository/mikro-orm-time-log.repository';
import { TypeOrmTimeLogRepository } from '../../time-tracking/time-log/repository/type-orm-time-log.repository';
import { MikroOrmTimeSlotRepository } from '../../time-tracking/time-slot/repository/mikro-orm-time-slot.repository';
import { TypeOrmTimeSlotRepository } from '../../time-tracking/time-slot/repository/type-orm-time-slot.repository';
import { MikroOrmTimesheetRepository } from '../../time-tracking/timesheet/repository/mikro-orm-timesheet.repository';
import { TypeOrmTimesheetRepository } from '../../time-tracking/timesheet/repository/type-orm-timesheet.repository';
import { MikroOrmUserOrganizationRepository } from '../../user-organization/repository/mikro-orm-user-organization.repository';
import { TypeOrmUserOrganizationRepository } from '../../user-organization/repository/type-orm-user-organization.repository';
import { MikroOrmUserRepository } from '../../user/repository/mikro-orm-user.repository';
import { TypeOrmUserRepository } from '../../user/repository/type-orm-user.repository';
export declare class FactoryResetService {
    private typeOrmActivityRepository;
    private mikroOrmActivityRepository;
    private typeOrmAppointmentEmployeeRepository;
    private typeOrmApprovalPolicyRepository;
    private typeOrmAvailabilitySlotRepository;
    private typeOrmCandidateRepository;
    private typeOrmCandidateCriterionsRatingRepository;
    private typeOrmCandidateDocumentRepository;
    private typeOrmCandidateEducationRepository;
    private typeOrmCandidateExperienceRepository;
    private typeOrmCandidateFeedbackRepository;
    private typeOrmCandidateInterviewRepository;
    private typeOrmCandidateInterviewersRepository;
    private typeOrmCandidateSkillRepository;
    private typeOrmCandidateSourceRepository;
    private typeOrmCandidateTechnologiesRepository;
    private typeOrmContactRepository;
    private typeOrmDealRepository;
    private typeOrmEmailHistoryRepository;
    private typeOrmEmployeeRepository;
    private typeOrmEmployeeAppointmentRepository;
    private typeOrmEmployeeAwardRepository;
    private typeOrmEmployeeRecurringExpenseRepository;
    private typeOrmEmployeeSettingRepository;
    private typeOrmEquipmentRepository;
    private typeOrmEquipmentSharingRepository;
    private typeOrmEstimateEmailRepository;
    private typeOrmEventTypeRepository;
    private typeOrmExpenseRepository;
    private typeOrmExpenseCategoryRepository;
    private typeOrmFeatureOrganizationRepository;
    private typeOrmGoalRepository;
    private typeOrmGoalTemplateRepository;
    private typeOrmGoalKPIRepository;
    private typeOrmGoalKPITemplateRepository;
    private typeOrmGoalTimeFrameRepository;
    private typeOrmIncomeRepository;
    private typeOrmIntegrationEntitySettingRepository;
    private typeOrmIntegrationEntitySettingTiedRepository;
    private typeOrmIntegrationMapRepository;
    private typeOrmIntegrationSettingRepository;
    private typeOrmIntegrationTenantRepository;
    private typeOrmInviteRepository;
    private typeOrmInvoiceRepository;
    private typeOrmInvoiceEstimateHistoryRepository;
    private typeOrmInvoiceItemRepository;
    private typeOrmKeyResultRepository;
    private typeOrmKeyResultTemplateRepository;
    private typeOrmKeyResultUpdateRepository;
    private typeOrmEmployeeLevelRepository;
    private typeOrmOrganizationAwardRepository;
    private typeOrmOrganizationRepository;
    private typeOrmOrganizationContactRepository;
    private typeOrmOrganizationDepartmentRepository;
    private typeOrmOrganizationDocumentRepository;
    private typeOrmOrganizationEmploymentTypeRepository;
    private typeOrmOrganizationLanguageRepository;
    private typeOrmOrganizationPositionRepository;
    private typeOrmOrganizationProjectRepository;
    private typeOrmOrganizationRecurringExpenseRepository;
    private typeOrmOrganizationSprintRepository;
    private typeOrmOrganizationTeamRepository;
    private typeOrmOrganizationTeamEmployeeRepository;
    private typeOrmOrganizationVendorRepository;
    private typeOrmPaymentRepository;
    private typeOrmPipelineRepository;
    private typeOrmPipelineStageRepository;
    private typeOrmProductRepository;
    private typeOrmProductCategoryRepository;
    private typeOrmProductOptionRepository;
    private typeOrmProductVariantSettingRepository;
    private typeOrmProductVariantRepository;
    private typeOrmProductVariantPriceRepository;
    private typeOrmSkillRepository;
    private typeOrmScreenshotRepository;
    private typeOrmRequestApprovalRepository;
    private typeOrmTagRepository;
    private typeOrmTaskRepository;
    private typeOrmTimesheetRepository;
    private typeOrmTimeLogRepository;
    private typeOrmTimeSlotRepository;
    private typeOrmTimeOffRequestRepository;
    private typeOrmTimeOffPolicyRepository;
    private typeOrmTenantSettingRepository;
    private typeOrmUserRepository;
    private typeOrmUserOrganizationRepository;
    private configService;
    repositories: Repository<any>[];
    constructor(typeOrmActivityRepository: TypeOrmActivityRepository, mikroOrmActivityRepository: MikroOrmActivityRepository, typeOrmAppointmentEmployeeRepository: TypeOrmAppointmentEmployeeRepository, mikroOrmAppointmentEmployeeRepository: MikroOrmAppointmentEmployeeRepository, typeOrmApprovalPolicyRepository: TypeOrmApprovalPolicyRepository, mikroOrmApprovalPolicyRepository: MikroOrmApprovalPolicyRepository, typeOrmAvailabilitySlotRepository: TypeOrmAvailabilitySlotRepository, mikroOrmAvailabilitySlotRepository: MikroOrmAvailabilitySlotRepository, typeOrmCandidateRepository: TypeOrmCandidateRepository, mikroOrmCandidateRepository: MikroOrmCandidateRepository, typeOrmCandidateCriterionsRatingRepository: TypeOrmCandidateCriterionsRatingRepository, mikroOrmCandidateCriterionsRatingRepository: MikroOrmCandidateCriterionsRatingRepository, typeOrmCandidateDocumentRepository: TypeOrmCandidateDocumentRepository, mikroOrmCandidateDocumentRepository: MikroOrmCandidateDocumentRepository, typeOrmCandidateEducationRepository: TypeOrmCandidateEducationRepository, mikroOrmCandidateEducationRepository: MikroOrmCandidateEducationRepository, typeOrmCandidateExperienceRepository: TypeOrmCandidateExperienceRepository, mikroOrmCandidateExperienceRepository: MikroOrmCandidateExperienceRepository, typeOrmCandidateFeedbackRepository: TypeOrmCandidateFeedbackRepository, mikroOrmCandidateFeedbackRepository: MikroOrmCandidateFeedbackRepository, typeOrmCandidateInterviewRepository: TypeOrmCandidateInterviewRepository, mikroOrmCandidateInterviewRepository: MikroOrmCandidateInterviewRepository, typeOrmCandidateInterviewersRepository: TypeOrmCandidateInterviewersRepository, mikroOrmCandidateInterviewersRepository: MikroOrmCandidateInterviewersRepository, typeOrmCandidateSkillRepository: TypeOrmCandidateSkillRepository, mikroOrmCandidateSkillRepository: MikroOrmCandidateSkillRepository, typeOrmCandidateSourceRepository: TypeOrmCandidateSourceRepository, mikroOrmCandidateSourceRepository: MikroOrmCandidateSourceRepository, typeOrmCandidateTechnologiesRepository: TypeOrmCandidateTechnologiesRepository, mikroOrmCandidateTechnologiesRepository: MikroOrmCandidateTechnologiesRepository, typeOrmContactRepository: TypeOrmContactRepository, mikroOrmContactRepository: MikroOrmContactRepository, typeOrmDealRepository: TypeOrmDealRepository, mikroOrmDealRepository: MikroOrmDealRepository, typeOrmEmailHistoryRepository: TypeOrmEmailHistoryRepository, mikroOrmEmailHistoryRepository: MikroOrmEmailHistoryRepository, typeOrmEmployeeRepository: TypeOrmEmployeeRepository, mikroOrmEmployeeRepository: MikroOrmEmployeeRepository, typeOrmEmployeeAppointmentRepository: TypeOrmEmployeeAppointmentRepository, mikroOrmEmployeeAppointmentRepository: MikroOrmEmployeeAppointmentRepository, typeOrmEmployeeAwardRepository: TypeOrmEmployeeAwardRepository, mikroOrmEmployeeAwardRepository: MikroOrmEmployeeAwardRepository, typeOrmEmployeeRecurringExpenseRepository: TypeOrmEmployeeRecurringExpenseRepository, mikroOrmEmployeeRecurringExpenseRepository: MikroOrmEmployeeRecurringExpenseRepository, typeOrmEmployeeSettingRepository: TypeOrmEmployeeSettingRepository, mikroOrmEmployeeSettingRepository: MikroOrmEmployeeSettingRepository, typeOrmEquipmentRepository: TypeOrmEquipmentRepository, mikroOrmEquipmentRepository: MikroOrmEquipmentRepository, typeOrmEquipmentSharingRepository: TypeOrmEquipmentSharingRepository, mikroOrmEquipmentSharingRepository: MikroOrmEquipmentSharingRepository, typeOrmEstimateEmailRepository: TypeOrmEstimateEmailRepository, mikroOrmEstimateEmailRepository: MikroOrmEstimateEmailRepository, typeOrmEventTypeRepository: TypeOrmEventTypeRepository, mikroOrmEventTypeRepository: MikroOrmEventTypeRepository, typeOrmExpenseRepository: TypeOrmExpenseRepository, mikroOrmExpenseRepository: MikroOrmExpenseRepository, typeOrmExpenseCategoryRepository: TypeOrmExpenseCategoryRepository, mikroOrmExpenseCategoryRepository: MikroOrmExpenseCategoryRepository, typeOrmFeatureOrganizationRepository: TypeOrmFeatureOrganizationRepository, mikroOrmFeatureOrganizationRepository: MikroOrmFeatureOrganizationRepository, typeOrmGoalRepository: TypeOrmGoalRepository, mikroOrmGoalRepository: MikroOrmGoalRepository, typeOrmGoalTemplateRepository: TypeOrmGoalTemplateRepository, mikroOrmGoalTemplateRepository: MikroOrmGoalTemplateRepository, typeOrmGoalKPIRepository: TypeOrmGoalKPIRepository, mikroOrmGoalKPIRepository: MikroOrmGoalKPIRepository, typeOrmGoalKPITemplateRepository: TypeOrmGoalKPITemplateRepository, mikroOrmGoalKPITemplateRepository: MikroOrmGoalKPITemplateRepository, typeOrmGoalTimeFrameRepository: TypeOrmGoalTimeFrameRepository, mikroOrmGoalTimeFrameRepository: MikroOrmGoalTimeFrameRepository, typeOrmIncomeRepository: TypeOrmIncomeRepository, mikroOrmIncomeRepository: MikroOrmIncomeRepository, typeOrmIntegrationEntitySettingRepository: TypeOrmIntegrationEntitySettingRepository, mikroOrmIntegrationEntitySettingRepository: MikroOrmIntegrationEntitySettingRepository, typeOrmIntegrationEntitySettingTiedRepository: TypeOrmIntegrationEntitySettingTiedRepository, mikroOrmIntegrationEntitySettingTiedRepository: MikroOrmIntegrationEntitySettingTiedRepository, typeOrmIntegrationMapRepository: TypeOrmIntegrationMapRepository, mikroOrmIntegrationMapRepository: MikroOrmIntegrationMapRepository, typeOrmIntegrationSettingRepository: TypeOrmIntegrationSettingRepository, mikroOrmIntegrationSettingRepository: MikroOrmIntegrationSettingRepository, typeOrmIntegrationTenantRepository: TypeOrmIntegrationTenantRepository, mikroOrmIntegrationTenantRepository: MikroOrmIntegrationTenantRepository, typeOrmInviteRepository: TypeOrmInviteRepository, mikroOrmInviteRepository: MikroOrmInviteRepository, typeOrmInvoiceRepository: TypeOrmInvoiceRepository, mikroOrmInvoiceRepository: MikroOrmInvoiceRepository, typeOrmInvoiceEstimateHistoryRepository: TypeOrmInvoiceEstimateHistoryRepository, mikroOrmInvoiceEstimateHistoryRepository: MikroOrmInvoiceEstimateHistoryRepository, typeOrmInvoiceItemRepository: TypeOrmInvoiceItemRepository, mikroOrmInvoiceItemRepository: MikroOrmInvoiceItemRepository, typeOrmKeyResultRepository: TypeOrmKeyResultRepository, mikroOrmKeyResultRepository: MikroOrmKeyResultRepository, typeOrmKeyResultTemplateRepository: TypeOrmKeyResultTemplateRepository, mikroOrmKeyResultTemplateRepository: MikroOrmKeyResultTemplateRepository, typeOrmKeyResultUpdateRepository: TypeOrmKeyResultUpdateRepository, mikroOrmKeyResultUpdateRepository: MikroOrmKeyResultUpdateRepository, typeOrmEmployeeLevelRepository: TypeOrmEmployeeLevelRepository, mikroOrmEmployeeLevelRepository: MikroOrmEmployeeLevelRepository, typeOrmOrganizationAwardRepository: TypeOrmOrganizationAwardRepository, mikroOrmOrganizationAwardRepository: MikroOrmOrganizationAwardRepository, typeOrmOrganizationRepository: TypeOrmOrganizationRepository, mikroOrmOrganizationRepository: MikroOrmOrganizationRepository, typeOrmOrganizationContactRepository: TypeOrmOrganizationContactRepository, mikroOrmOrganizationContactRepository: MikroOrmOrganizationContactRepository, typeOrmOrganizationDepartmentRepository: TypeOrmOrganizationDepartmentRepository, mikroOrmOrganizationDepartmentRepository: MikroOrmOrganizationDepartmentRepository, typeOrmOrganizationDocumentRepository: TypeOrmOrganizationDocumentRepository, mikroOrmOrganizationDocumentRepository: MikroOrmOrganizationDocumentRepository, typeOrmOrganizationEmploymentTypeRepository: TypeOrmOrganizationEmploymentTypeRepository, mikroOrmOrganizationEmploymentTypeRepository: MikroOrmOrganizationEmploymentTypeRepository, typeOrmOrganizationLanguageRepository: TypeOrmOrganizationLanguageRepository, mikroOrmOrganizationLanguageRepository: MikroOrmOrganizationLanguageRepository, typeOrmOrganizationPositionRepository: TypeOrmOrganizationPositionRepository, mikroOrmOrganizationPositionRepository: MikroOrmOrganizationPositionRepository, typeOrmOrganizationProjectRepository: TypeOrmOrganizationProjectRepository, mikroOrmOrganizationProjectRepository: MikroOrmOrganizationProjectRepository, typeOrmOrganizationRecurringExpenseRepository: TypeOrmOrganizationRecurringExpenseRepository, mikroOrmOrganizationRecurringExpenseRepository: MikroOrmOrganizationRecurringExpenseRepository, typeOrmOrganizationSprintRepository: TypeOrmOrganizationSprintRepository, mikroOrmOrganizationSprintRepository: MikroOrmOrganizationSprintRepository, typeOrmOrganizationTeamRepository: TypeOrmOrganizationTeamRepository, mikroOrmOrganizationTeamRepository: MikroOrmOrganizationTeamRepository, typeOrmOrganizationTeamEmployeeRepository: TypeOrmOrganizationTeamEmployeeRepository, mikroOrmOrganizationTeamEmployeeRepository: MikroOrmOrganizationTeamEmployeeRepository, typeOrmOrganizationVendorRepository: TypeOrmOrganizationVendorRepository, mikroOrmOrganizationVendorRepository: MikroOrmOrganizationVendorRepository, typeOrmPaymentRepository: TypeOrmPaymentRepository, mikroOrmPaymentRepository: MikroOrmPaymentRepository, typeOrmPipelineRepository: TypeOrmPipelineRepository, mikroOrmPipelineRepository: MikroOrmPipelineRepository, typeOrmPipelineStageRepository: TypeOrmPipelineStageRepository, mikroOrmPipelineStageRepository: MikroOrmPipelineStageRepository, typeOrmProductRepository: TypeOrmProductRepository, mikroOrmProductRepository: MikroOrmProductRepository, typeOrmProductCategoryRepository: TypeOrmProductCategoryRepository, mikroOrmProductCategoryRepository: MikroOrmProductCategoryRepository, typeOrmProductOptionRepository: TypeOrmProductOptionRepository, mikroOrmProductOptionRepository: MikroOrmProductOptionRepository, typeOrmProductVariantSettingRepository: TypeOrmProductVariantSettingRepository, mikroOrmProductVariantSettingRepository: MikroOrmProductVariantSettingRepository, typeOrmProductVariantRepository: TypeOrmProductVariantRepository, mikroOrmProductVariantRepository: MikroOrmProductVariantRepository, typeOrmProductVariantPriceRepository: TypeOrmProductVariantPriceRepository, mikroOrmProductVariantPriceRepository: MikroOrmProductVariantPriceRepository, typeOrmSkillRepository: TypeOrmSkillRepository, mikroOrmSkillRepository: MikroOrmSkillRepository, typeOrmScreenshotRepository: TypeOrmScreenshotRepository, mikroOrmScreenshotRepository: MikroOrmScreenshotRepository, typeOrmRequestApprovalRepository: TypeOrmRequestApprovalRepository, mikroOrmRequestApprovalRepository: MikroOrmRequestApprovalRepository, typeOrmTagRepository: TypeOrmTagRepository, mikroOrmTagRepository: MikroOrmTagRepository, typeOrmTaskRepository: TypeOrmTaskRepository, mikroOrmTaskRepository: MikroOrmTaskRepository, typeOrmTimesheetRepository: TypeOrmTimesheetRepository, mikroOrmTimesheetRepository: MikroOrmTimesheetRepository, typeOrmTimeLogRepository: TypeOrmTimeLogRepository, mikroOrmTimeLogRepository: MikroOrmTimeLogRepository, typeOrmTimeSlotRepository: TypeOrmTimeSlotRepository, mikroOrmTimeSlotRepository: MikroOrmTimeSlotRepository, typeOrmTimeOffRequestRepository: TypeOrmTimeOffRequestRepository, mikroOrmTimeOffRequestRepository: MikroOrmTimeOffRequestRepository, typeOrmTimeOffPolicyRepository: TypeOrmTimeOffPolicyRepository, mikroOrmTimeOffPolicyRepository: MikroOrmTimeOffPolicyRepository, typeOrmTenantSettingRepository: TypeOrmTenantSettingRepository, mikroOrmTenantSettingRepository: MikroOrmTenantSettingRepository, typeOrmUserRepository: TypeOrmUserRepository, mikroOrmUserRepository: MikroOrmUserRepository, typeOrmUserOrganizationRepository: TypeOrmUserOrganizationRepository, mikroOrmUserOrganizationRepository: MikroOrmUserOrganizationRepository, configService: ConfigService);
    onModuleInit(): Promise<void>;
    reset(): Promise<Organization>;
    deleteSpecificTables(findInput: {
        organizationIds: string[];
        tenantId: string;
    }): Promise<void>;
    deleteRepository(repository: Repository<any>, findInput: {
        organizationIds: string[];
        tenantId: string;
    }): Promise<any>;
    private registerCoreRepositories;
}
