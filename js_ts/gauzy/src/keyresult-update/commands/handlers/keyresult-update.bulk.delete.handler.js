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
exports.KeyResultUpdateBulKDeleteHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const __1 = require("..");
const keyresult_update_service_1 = require("../../keyresult-update.service");
let KeyResultUpdateBulKDeleteHandler = exports.KeyResultUpdateBulKDeleteHandler = class KeyResultUpdateBulKDeleteHandler {
    keyResultUpdateService;
    constructor(keyResultUpdateService) {
        this.keyResultUpdateService = keyResultUpdateService;
    }
    async execute(command) {
        const { id } = command;
        const updates = await this.keyResultUpdateService.findByKeyResultId(id);
        await this.keyResultUpdateService.deleteBulkByKeyResultId(updates.map((item) => item.id));
        return;
    }
};
exports.KeyResultUpdateBulKDeleteHandler = KeyResultUpdateBulKDeleteHandler = __decorate([
    (0, cqrs_1.CommandHandler)(__1.KeyResultUpdateBulkDeleteCommand),
    __metadata("design:paramtypes", [keyresult_update_service_1.KeyResultUpdateService])
], KeyResultUpdateBulKDeleteHandler);
//# sourceMappingURL=keyresult-update.bulk.delete.handler.js.map