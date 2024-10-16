"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const automation_label_sync_handler_1 = require("./automation-label.sync.handler");
const tag_create_handler_1 = require("./tag-create.handler");
const tag_list_handler_1 = require("./tag.list.handler");
const tag_update_handler_1 = require("./tag-update.handler");
exports.CommandHandlers = [
    automation_label_sync_handler_1.AutomationLabelSyncHandler,
    tag_create_handler_1.TagCreateHandler,
    tag_list_handler_1.TagListHandler,
    tag_update_handler_1.TagUpdateHandler
];
//# sourceMappingURL=index.js.map