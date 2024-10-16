"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandlers = void 0;
const screenshot_create_handler_1 = require("./screenshot-create.handler");
const screenshot_update_handler_1 = require("./screenshot-update.handler");
exports.CommandHandlers = [
    screenshot_create_handler_1.ScreenshotCreateHandler,
    screenshot_update_handler_1.ScreenshotUpdateHandler
];
//# sourceMappingURL=index.js.map