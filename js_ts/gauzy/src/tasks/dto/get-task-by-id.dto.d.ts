import { IGetTaskById } from '../../../plugins/contracts';
import { OptionParams, Task } from 'core';
/**
 * GET task by Id DTO validation
 */
export declare class GetTaskByIdDTO extends OptionParams<Task> implements IGetTaskById {
    includeRootEpic?: boolean;
}
