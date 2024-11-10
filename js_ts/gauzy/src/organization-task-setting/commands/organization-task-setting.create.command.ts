import { ICommand } from '@nestjs/cqrs';
import { IOrganizationTaskSettingCreateInput } from '../../../plugins/contracts';

export class OrganizationTaskSettingCreateCommand implements ICommand {
    static readonly type = '[Organization Task Setting] Create';

    constructor(
        public readonly input: Partial<IOrganizationTaskSettingCreateInput>
    ) { }
}
