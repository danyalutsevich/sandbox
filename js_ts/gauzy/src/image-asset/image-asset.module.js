"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ImageAssetModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageAssetModule = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const nestjs_1 = require("@mikro-orm/nestjs");
const role_permission_module_1 = require("../role-permission/role-permission.module");
const handlers_1 = require("./commands/handlers");
const image_asset_controller_1 = require("./image-asset.controller");
const image_asset_entity_1 = require("./image-asset.entity");
const image_asset_service_1 = require("./image-asset.service");
let ImageAssetModule = exports.ImageAssetModule = ImageAssetModule_1 = class ImageAssetModule {
};
exports.ImageAssetModule = ImageAssetModule = ImageAssetModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register([{ path: '/image-assets', module: ImageAssetModule_1 }]),
            typeorm_1.TypeOrmModule.forFeature([image_asset_entity_1.ImageAsset]),
            nestjs_1.MikroOrmModule.forFeature([image_asset_entity_1.ImageAsset]),
            role_permission_module_1.RolePermissionModule,
            cqrs_1.CqrsModule
        ],
        controllers: [image_asset_controller_1.ImageAssetController],
        providers: [image_asset_service_1.ImageAssetService, ...handlers_1.CommandHandlers],
        exports: [image_asset_service_1.ImageAssetService]
    })
], ImageAssetModule);
//# sourceMappingURL=image-asset.module.js.map