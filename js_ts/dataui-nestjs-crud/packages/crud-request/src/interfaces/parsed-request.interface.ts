import { ObjectLiteral } from '@dataui/crud-util';
import { ClassTransformOptions } from 'class-transformer';
import { QueryFields, QueryFilter, QueryJoin, QuerySort, SCondition } from '../types';

export interface ParsedRequestParams<EXTRA = {}> {
  fields: QueryFields;
  paramsFilter: QueryFilter[];
  authPersist: ObjectLiteral;
  classTransformOptions: ClassTransformOptions;
  search: SCondition;
  filter: QueryFilter[];
  or: QueryFilter[];
  join: QueryJoin[];
  sort: QuerySort[];
  limit: number;
  offset: number;
  page: number;
  cache: number;
  includeDeleted: number;
  /**
   * Extra options.
   *
   * Custom extra option come from Request and can be used anywhere you want for your business rules.
   * CrudRequest lib. do not evaluat this attribut.
   */
  extra?: EXTRA;
}
