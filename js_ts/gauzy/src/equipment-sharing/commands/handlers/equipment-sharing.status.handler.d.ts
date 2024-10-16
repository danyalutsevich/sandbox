import { ICommandHandler } from '@nestjs/cqrs';
import { EquipmentSharingStatusCommand } from '../equipment-sharing.status.command';
import { EquipmentSharing } from '../../equipment-sharing.entity';
import { TypeOrmEquipmentSharingRepository } from '../../repository/type-orm-equipment-sharing.repository';
import { TypeOrmRequestApprovalRepository } from '../../../request-approval/repository/type-orm-request-approval.repository';
export declare class EquipmentSharingStatusHandler implements ICommandHandler<EquipmentSharingStatusCommand> {
    private readonly typeOrmEquipmentSharingRepository;
    private readonly typeOrmRequestApprovalRepository;
    constructor(typeOrmEquipmentSharingRepository: TypeOrmEquipmentSharingRepository, typeOrmRequestApprovalRepository: TypeOrmRequestApprovalRepository);
    execute(command?: EquipmentSharingStatusCommand): Promise<EquipmentSharing>;
}
