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
exports.ImageAssetCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const image_asset_create_command_1 = require("../image-asset.create.command");
const image_asset_service_1 = require("../../image-asset.service");
let ImageAssetCreateHandler = exports.ImageAssetCreateHandler = class ImageAssetCreateHandler {
    _imageAssetService;
    constructor(_imageAssetService) {
        this._imageAssetService = _imageAssetService;
    }
    async execute(command) {
        const { input } = command;
        const asset = await this._imageAssetService.create(input);
        return await this._imageAssetService.findOneByIdString(asset.id);
    }
};
exports.ImageAssetCreateHandler = ImageAssetCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(image_asset_create_command_1.ImageAssetCreateCommand),
    __metadata("design:paramtypes", [image_asset_service_1.ImageAssetService])
], ImageAssetCreateHandler);
//# sourceMappingURL=image-asset.create.handler.js.map