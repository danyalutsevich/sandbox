import { ProductCreateHandler } from './product.create.handler';
import { ProductUpdateHandler } from './product.update.handler';
import { ProductDeleteHandler } from './product.delete.handler';
export declare const CommandHandlers: (typeof ProductCreateHandler | typeof ProductUpdateHandler | typeof ProductDeleteHandler)[];
