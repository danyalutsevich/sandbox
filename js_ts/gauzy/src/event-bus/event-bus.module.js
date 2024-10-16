"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusModule = void 0;
const common_1 = require("@nestjs/common");
const event_bus_1 = require("./event-bus");
const handlers_1 = require("./events/handlers");
let EventBusModule = exports.EventBusModule = class EventBusModule {
};
exports.EventBusModule = EventBusModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [event_bus_1.EventBus, ...handlers_1.EventHandlers],
        exports: [event_bus_1.EventBus]
    })
], EventBusModule);
//# sourceMappingURL=event-bus.module.js.map