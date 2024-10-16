import { MikroOrmTagEntityCustomFields } from './mikro-orm-tag-entity-custom-fields';
import { TypeOrmTagEntityCustomFields } from './type-orm-tag-entity-custom-fields';
export * from './mikro-orm-tag-entity-custom-fields';
export * from './type-orm-tag-entity-custom-fields';
export type TagEntityCustomFields = TypeOrmTagEntityCustomFields | MikroOrmTagEntityCustomFields;
