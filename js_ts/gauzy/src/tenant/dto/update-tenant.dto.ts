import { ITenantUpdateInput } from '../../../plugins/contracts';
import { TenantDTO } from "./tenant.dto";

export class UpdateTenantDTO extends TenantDTO implements ITenantUpdateInput {}