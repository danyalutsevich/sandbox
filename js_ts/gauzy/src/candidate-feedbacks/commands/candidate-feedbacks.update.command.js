"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackUpdateCommand = void 0;
class FeedbackUpdateCommand {
    id;
    entity;
    static type = '[Feedback] Update';
    constructor(id, entity) {
        this.id = id;
        this.entity = entity;
    }
}
exports.FeedbackUpdateCommand = FeedbackUpdateCommand;
//# sourceMappingURL=candidate-feedbacks.update.command.js.map