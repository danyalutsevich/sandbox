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
exports.TagCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const tag_create_command_1 = require("./../tag-create.command");
const tag_service_1 = require("./../../tag.service");
let TagCreateHandler = exports.TagCreateHandler = class TagCreateHandler {
    _tagService;
    constructor(_tagService) {
        this._tagService = _tagService;
    }
    /**
    * Execute the creation of a new tag based on the provided input data.
    *
    * @param command - The command object containing the tag creation input.
    * @returns A promise that resolves to the newly created tag.
    * @throws An error if the tag creation fails.
    */
    async execute(command) {
        const { input } = command;
        return await this.create(input);
    }
    /**
     * Create a new tag based on the provided input data.
     *
     * @param request - The input data for creating a new tag.
     * @returns A promise that resolves to the newly created tag.
     * @throws An error if the tag creation fails.
     */
    async create(request) {
        try {
            return await this._tagService.create(request);
        }
        catch (error) {
            console.log('Error while creating tag %s', error?.message);
            throw new common_1.HttpException({ message: error?.message, error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.TagCreateHandler = TagCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(tag_create_command_1.TagCreateCommand),
    __metadata("design:paramtypes", [tag_service_1.TagService])
], TagCreateHandler);
//# sourceMappingURL=tag-create.handler.js.map