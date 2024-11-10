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
exports.EventBus = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const index_1 = require("../../plugins/common/dist/index");
let EventBus = exports.EventBus = class EventBus {
    event$ = new rxjs_1.Subject();
    onDestroy$ = new rxjs_1.Subject();
    constructor() { }
    /**
     * Publishes a single event.
     * @param event The event to be published.
     */
    async publish(event) {
        this.event$.next(event);
    }
    /**
     * Publishes multiple events in sequence.
     * @param events The events to be published.
     */
    async publishMultiple(events) {
        for await (const event of events) {
            this.event$.next(event);
        }
    }
    /**
     * Subscribes to events of the given type.
     * @param event The type of events to subscribe to.
     * @returns An Observable of events with the specified type.
     */
    ofType(event) {
        return this.event$.asObservable().pipe((0, rxjs_1.takeUntil)(this.onDestroy$), // Unsubscribe when the component is destroyed
        (0, rxjs_1.filter)((item) => item.constructor === event), //
        (0, rxjs_1.filter)(index_1.isNotNullOrUndefined) //
        );
    }
    /**
     * Lifecycle hook method executed when a module is being destroyed.
     * It completes the onDestroy$ subject to ensure proper cleanup.
     */
    onModuleDestroy() {
        /**
         * Sends a completion signal to the onDestroy$ subject.
         * This is typically used to signal cleanup or completion of asynchronous tasks.
         */
        this.onDestroy$.next();
        /**
         * Completes the onDestroy$ subject, marking it as finished.
         * After completion, the subject will not emit any more values.
         */
        this.onDestroy$.complete();
    }
};
exports.EventBus = EventBus = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EventBus);
//# sourceMappingURL=event-bus.js.map