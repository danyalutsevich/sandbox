"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagUpdateCommand = void 0;
class TagUpdateCommand {
    id;
    input;
    static type = '[Tag] Update Tag';
    constructor(id, input) {
        this.id = id;
        this.input = input;
    }
}
exports.TagUpdateCommand = TagUpdateCommand;
//# sourceMappingURL=tag-update.command.js.map