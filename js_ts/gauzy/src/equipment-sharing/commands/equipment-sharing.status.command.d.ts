import { ICommand } from '@nestjs/cqrs';
export declare class EquipmentSharingStatusCommand implements ICommand {
    readonly id: string;
    readonly status: number;
    static readonly type = "[EquipmentSharing] Status";
    constructor(id: string, status: number);
}
