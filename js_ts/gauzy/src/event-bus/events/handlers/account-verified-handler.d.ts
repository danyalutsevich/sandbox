import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { EventBus } from '../../event-bus';
import { AccountVerifiedEvent } from '../account-verified-event';
export declare class AccountVerifiedHandler implements OnModuleInit, OnModuleDestroy {
    private readonly eventBus;
    private subscription;
    constructor(eventBus: EventBus);
    onModuleInit(): void;
    /**
     * Handles the account verification event.
     * @param event The event containing the verification details.
     */
    execute(event: AccountVerifiedEvent): Promise<void>;
    onModuleDestroy(): void;
}
