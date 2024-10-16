"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagListHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const tag_service_1 = require("./../../tag.service");
const tag_list_command_1 = require("./../tag.list.command");
let TagListHandler = exports.TagListHandler = class TagListHandler {
    tagService;
    constructor(tagService) {
        this.tagService = tagService;
    }
    async execute(command) {
        const { input, relations = [] } = command;
        return await this.tagService.findTags(input, relations);
    }
};
exports.TagListHandler = TagListHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tag_list_command_1.TagListCommand),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagListHandler);
//# sourceMappingURL=tag.list.handler.js.map