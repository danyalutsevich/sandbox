"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagListCommand = void 0;
class TagListCommand {
    input;
    relations;
    static type = '[Tag] List';
    constructor(input, relations) {
        this.input = input;
        this.relations = relations;
    }
}
exports.TagListCommand = TagListCommand;
//# sourceMappingURL=tag.list.command.js.map