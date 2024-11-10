import { OnModuleDestroy } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Type } from '../../plugins/common/dist/index';
import { BaseEvent } from './base-event';
export declare class EventBus implements OnModuleDestroy {
    private event$;
    private onDestroy$;
    constructor();
    /**
     * Publishes a single event.
     * @param event The event to be published.
     */
    publish<T extends BaseEvent>(event: T): Promise<void>;
    /**
     * Publishes multiple events in sequence.
     * @param events The events to be published.
     */
    publishMultiple<T extends BaseEvent>(events: T[]): Promise<void>;
    /**
     * Subscribes to events of the given type.
     * @param event The type of events to subscribe to.
     * @returns An Observable of events with the specified type.
     */
    ofType<T extends BaseEvent>(event: Type<T>): Observable<T>;
    /**
     * Lifecycle hook method executed when a module is being destroyed.
     * It completes the onDestroy$ subject to ensure proper cleanup.
     */
    onModuleDestroy(): void;
}
