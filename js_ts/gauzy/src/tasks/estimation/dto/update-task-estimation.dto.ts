import { ITaskEstimationUpdateInput } from '../../../../plugins/contracts/dist/index';
import { CreateTaskEstimationDTO } from './create-task-estimation.dto';

/**
 * Update task estimation validation request DTO
 */
export class UpdateTaskEstimationDTO
	extends CreateTaskEstimationDTO
	implements ITaskEstimationUpdateInput {}
