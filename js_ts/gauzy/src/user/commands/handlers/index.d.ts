import { UserCreateHandler } from './user.create.handler';
import { UserDeleteHandler } from './user.delete.handler';
export declare const CommandHandlers: (typeof UserCreateHandler | typeof UserDeleteHandler)[];
