"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const integration_map_sync_activity_handler_1 = require("./integration-map.sync-activity.handler");
const integration_map_sync_entity_handler_1 = require("./integration-map.sync-entity.handler");
const integration_map_sync_issue_handler_1 = require("./integration-map.sync-issue.handler");
const integration_map_sync_label_handler_1 = require("./integration-map.sync-label.handler");
const integration_map_sync_organization_handler_1 = require("./integration-map.sync-organization.handler");
const integration_map_sync_project_handler_1 = require("./integration-map.sync-project.handler");
const integration_map_sync_screenshot_handler_1 = require("./integration-map.sync-screenshot.handler");
const integration_map_sync_task_handler_1 = require("./integration-map.sync-task.handler");
const integration_map_sync_time_log_handler_1 = require("./integration-map.sync-time-log.handler");
const integration_map_sync_time_slot_handler_1 = require("./integration-map.sync-time-slot.handler");
exports.CommandHandlers = [
    integration_map_sync_activity_handler_1.IntegrationMapSyncActivityHandler,
    integration_map_sync_entity_handler_1.IntegrationMapSyncEntityHandler,
    integration_map_sync_issue_handler_1.IntegrationMapSyncIssueHandler,
    integration_map_sync_label_handler_1.IntegrationMapSyncLabelHandler,
    integration_map_sync_organization_handler_1.IntegrationMapSyncOrganizationHandler,
    integration_map_sync_project_handler_1.IntegrationMapSyncProjectHandler,
    integration_map_sync_screenshot_handler_1.IntegrationMapSyncScreenshotHandler,
    integration_map_sync_task_handler_1.IntegrationMapSyncTaskHandler,
    integration_map_sync_time_log_handler_1.IntegrationMapSyncTimeLogHandler,
    integration_map_sync_time_slot_handler_1.IntegrationMapSyncTimeSlotHandler,
];
//# sourceMappingURL=index.js.map