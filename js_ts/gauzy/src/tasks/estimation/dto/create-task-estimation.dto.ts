import { ITaskEstimation } from '../../../../plugins/contracts/dist/index';
import { TaskEstimationDTO } from './task-estimation.dto';

export class CreateTaskEstimationDTO
	extends TaskEstimationDTO
	implements ITaskEstimation {}
