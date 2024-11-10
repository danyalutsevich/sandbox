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
exports.AvailabilitySlotsBulkCreateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const availability_slots_bulk_create_command_1 = require("../availability-slots.bulk.create.command");
const availability_slots_entity_1 = require("../../availability-slots.entity");
const context_1 = require("../../../core/context");
const availability_slots_create_command_1 = require("../availability-slots.create.command");
let AvailabilitySlotsBulkCreateHandler = exports.AvailabilitySlotsBulkCreateHandler = class AvailabilitySlotsBulkCreateHandler {
    commandBus;
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async execute(command) {
        const { input } = command;
        const allAvailabilitySlots = [];
        const tenantId = context_1.RequestContext.currentTenantId();
        for (const item of input) {
            let availabilitySlots = new availability_slots_entity_1.AvailabilitySlot({
                ...item,
                tenantId
            });
            availabilitySlots = await this.commandBus.execute(new availability_slots_create_command_1.AvailabilitySlotsCreateCommand(availabilitySlots));
            allAvailabilitySlots.push(availabilitySlots);
        }
        return allAvailabilitySlots;
    }
};
exports.AvailabilitySlotsBulkCreateHandler = AvailabilitySlotsBulkCreateHandler = __decorate([
    (0, cqrs_1.CommandHandler)(availability_slots_bulk_create_command_1.AvailabilitySlotsBulkCreateCommand),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], AvailabilitySlotsBulkCreateHandler);
//# sourceMappingURL=availability-slots.bulk.create.handler.js.map