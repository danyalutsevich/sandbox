"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryHandlers = void 0;
const email_template_generate_preview_handler_1 = require("./email-template.generate-preview.handler");
const email_template_handler_1 = require("./email-template.handler");
const email_template_find_handler_1 = require("./email-template.find.handler");
exports.QueryHandlers = [
    email_template_generate_preview_handler_1.EmailTemplateGeneratePreviewHandler,
    email_template_handler_1.EmailTemplateQueryHandler,
    email_template_find_handler_1.FindEmailTemplateHandler
];
//# sourceMappingURL=index.js.map