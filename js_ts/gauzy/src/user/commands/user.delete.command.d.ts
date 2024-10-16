import { ICommand } from '@nestjs/cqrs';
import { IUser } from '../../../plugins/contracts';
export declare class UserDeleteCommand implements ICommand {
    readonly userId: IUser['id'];
    static readonly type = "[User] Delete Account";
    constructor(userId: IUser['id']);
}
