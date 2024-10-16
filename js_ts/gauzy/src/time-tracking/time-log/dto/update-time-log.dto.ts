import { IManualTimeInput } from '../../../../plugins/contracts/dist/index';
import { ManualTimeLogDTO } from "./manual-time-log.dto";

export class UpdateManualTimeLogDTO extends ManualTimeLogDTO implements IManualTimeInput { }
