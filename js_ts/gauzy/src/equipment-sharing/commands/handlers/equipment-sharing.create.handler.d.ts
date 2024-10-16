import { ICommandHandler } from '@nestjs/cqrs';
import { EquipmentSharing } from '../../equipment-sharing.entity';
import { EquipmentSharingCreateCommand } from '../equipment-sharing.create.command';
import { TypeOrmEquipmentSharingRepository } from '../../repository/type-orm-equipment-sharing.repository';
import { TypeOrmRequestApprovalRepository } from '../../../request-approval/repository/type-orm-request-approval.repository';
export declare class EquipmentSharingCreateHandler implements ICommandHandler<EquipmentSharingCreateCommand> {
    private readonly typeOrmEquipmentSharingRepository;
    private readonly typeOrmRequestApprovalRepository;
    constructor(typeOrmEquipmentSharingRepository: TypeOrmEquipmentSharingRepository, typeOrmRequestApprovalRepository: TypeOrmRequestApprovalRepository);
    execute(command?: EquipmentSharingCreateCommand): Promise<EquipmentSharing>;
}
