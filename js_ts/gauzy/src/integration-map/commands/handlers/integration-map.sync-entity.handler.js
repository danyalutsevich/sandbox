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
exports.IntegrationMapSyncEntityHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const __1 = require("..");
const integration_map_service_1 = require("../../integration-map.service");
let IntegrationMapSyncEntityHandler = exports.IntegrationMapSyncEntityHandler = class IntegrationMapSyncEntityHandler {
    _integrationMapService;
    constructor(_integrationMapService) {
        this._integrationMapService = _integrationMapService;
    }
    async execute(command) {
        const { input } = command;
        return await this._integrationMapService.create(input);
    }
};
exports.IntegrationMapSyncEntityHandler = IntegrationMapSyncEntityHandler = __decorate([
    (0, cqrs_1.CommandHandler)(__1.IntegrationMapSyncEntityCommand),
    __metadata("design:paramtypes", [integration_map_service_1.IntegrationMapService])
], IntegrationMapSyncEntityHandler);
//# sourceMappingURL=integration-map.sync-entity.handler.js.map