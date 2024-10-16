import { Type } from '../../../plugins/common';
import { ICrudController } from './icrud.controller';
/**
 * Base crud controller
 *
 * @param createDTO
 * @param updateDTO
 * @returns
 */
export declare function CrudFactory<BaseType, QueryType, CreateType, UpdateType, CountQueryType>(queryDTO?: Type<QueryType>, createDTO?: Type<CreateType>, updateDTO?: Type<UpdateType>, countQueryDTO?: Type<CountQueryType>): Type<ICrudController<BaseType>>;
