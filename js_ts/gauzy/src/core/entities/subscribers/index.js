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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreSubscribers = void 0;
__exportStar(require("./base-entity-event.subscriber"), exports);
__exportStar(require("./tenant-organization-base-entity.subscriber"), exports);
const utils_1 = require("../../utils");
const internal_1 = require("../internal");
const tenant_organization_base_entity_subscriber_1 = require("./tenant-organization-base-entity.subscriber");
const ormType = (0, utils_1.getORMType)();
/**
 * A map of the core TypeORM / MikroORM Subscribers.
 */
exports.coreSubscribers = [
    // Add the subscriber only if the ORM type is MikroORM
    ...(ormType === utils_1.MultiORMEnum.MikroORM ? [tenant_organization_base_entity_subscriber_1.TenantOrganizationBaseEntityEventSubscriber] : []),
    internal_1.ActivitySubscriber,
    internal_1.CandidateSubscriber,
    internal_1.CustomSmtpSubscriber,
    internal_1.EmailResetSubscriber,
    internal_1.EmailTemplateSubscriber,
    internal_1.EmployeeSubscriber,
    internal_1.FeatureSubscriber,
    internal_1.ImageAssetSubscriber,
    internal_1.ImportHistorySubscriber,
    internal_1.IntegrationSettingSubscriber,
    internal_1.IntegrationSubscriber,
    internal_1.InviteSubscriber,
    internal_1.InvoiceSubscriber,
    internal_1.IssueTypeSubscriber,
    internal_1.OrganizationContactSubscriber,
    internal_1.OrganizationDocumentSubscriber,
    internal_1.OrganizationProjectSubscriber,
    internal_1.OrganizationSubscriber,
    internal_1.OrganizationTeamEmployeeSubscriber,
    internal_1.OrganizationTeamJoinRequestSubscriber,
    internal_1.OrganizationTeamSubscriber,
    internal_1.PaymentSubscriber,
    internal_1.PipelineSubscriber,
    internal_1.ProductCategorySubscriber,
    internal_1.ReportSubscriber,
    internal_1.RoleSubscriber,
    internal_1.ScreenshotSubscriber,
    internal_1.TagSubscriber,
    internal_1.TaskPrioritySubscriber,
    internal_1.TaskRelatedIssueTypeSubscriber,
    internal_1.TaskSizeSubscriber,
    internal_1.TaskStatusSubscriber,
    internal_1.TaskSubscriber,
    internal_1.TaskVersionSubscriber,
    internal_1.TenantSubscriber,
    internal_1.TimeOffRequestSubscriber,
    internal_1.TimeSlotSubscriber,
    internal_1.UserSubscriber
];
//# sourceMappingURL=index.js.map