import { TaskEstimationCreateHandler } from './task-estimation-create.handler';
import { TaskEstimationUpdateHandler } from './task-estimation-update.handler';
import { TaskEstimationDeleteHandler } from './task-estimation-delete.handler';
import { TaskEstimationCalculateHandler } from './task-estimation-calculate.handler';
export declare const CommandHandlers: (typeof TaskEstimationCreateHandler | typeof TaskEstimationUpdateHandler | typeof TaskEstimationDeleteHandler | typeof TaskEstimationCalculateHandler)[];
