import { ICommandHandler } from '@nestjs/cqrs';
import { EquipmentSharing } from '../../equipment-sharing.entity';
import { EquipmentSharingUpdateCommand } from '../equipment-sharing.update.command';
import { TypeOrmEquipmentSharingRepository } from '../../repository/type-orm-equipment-sharing.repository';
import { TypeOrmRequestApprovalRepository } from '../../../request-approval/repository/type-orm-request-approval.repository';
export declare class EquipmentSharingUpdateHandler implements ICommandHandler<EquipmentSharingUpdateCommand> {
    private readonly typeOrmEquipmentSharingRepository;
    private readonly typeOrmRequestApprovalRepository;
    constructor(typeOrmEquipmentSharingRepository: TypeOrmEquipmentSharingRepository, typeOrmRequestApprovalRepository: TypeOrmRequestApprovalRepository);
    /**
     *
     * @param command
     * @returns
     */
    execute(command?: EquipmentSharingUpdateCommand): Promise<EquipmentSharing>;
}
