import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EventBus } from '../../event-bus';
import { AccountRegistrationEvent } from '../account-registration-event';
export declare class AccountRegistrationHandler implements OnModuleInit, OnModuleDestroy {
    private readonly eventBus;
    private subscription;
    constructor(eventBus: EventBus);
    onModuleInit(): void;
    /**
     * Handles the account registration event.
     * @param event The event containing the registration details.
     */
    execute(event: AccountRegistrationEvent): Promise<void>;
    onModuleDestroy(): void;
}
