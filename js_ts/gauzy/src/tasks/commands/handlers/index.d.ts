import { AutomationTaskSyncHandler } from './automation-task.sync.handler';
import { TaskCreateHandler } from './task-create.handler';
import { TaskUpdateHandler } from './task-update.handler';
export declare const CommandHandlers: (typeof AutomationTaskSyncHandler | typeof TaskCreateHandler | typeof TaskUpdateHandler)[];
