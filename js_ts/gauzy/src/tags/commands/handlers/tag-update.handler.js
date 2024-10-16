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
exports.TagUpdateHandler = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const tag_update_command_1 = require("./../tag-update.command");
const tag_service_1 = require("./../../tag.service");
let TagUpdateHandler = exports.TagUpdateHandler = class TagUpdateHandler {
    _tagService;
    constructor(_tagService) {
        this._tagService = _tagService;
    }
    /**
     * Execute the update of an existing tag based on the provided ID and input data.
     *
     * @param command - The command object containing the tag ID and update input.
     * @returns A promise that resolves to the updated tag.
     * @throws An error if the tag update fails.
     */
    async execute(command) {
        const { id, input } = command;
        return await this.update(id, input);
    }
    /**
     * Update an existing tag with the specified ID and provided update data.
     *
     * @param id - The ID of the tag to update.
     * @param request - The update data for the tag.
     * @returns A promise that resolves to the updated tag.
     * @throws An error if the tag update fails.
     */
    async update(id, request) {
        try {
            await this._tagService.findOneByIdString(id);
            return await this._tagService.create({
                ...request,
                id
            });
        }
        catch (error) {
            console.log('Error while updating tag %s', error?.message);
            throw new common_1.HttpException({ message: error?.message, error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.TagUpdateHandler = TagUpdateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tag_update_command_1.TagUpdateCommand),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagUpdateHandler);
//# sourceMappingURL=tag-update.handler.js.map