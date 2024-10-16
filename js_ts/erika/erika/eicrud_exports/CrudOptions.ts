import { ICrudOptions } from '@eicrud/shared/interfaces';

export class CrudOptions<T = any> implements ICrudOptions {
  populate?: `${Extract<keyof T, string>}${string}`[];

  mockRole?: string;

  cached?: boolean;

  jwtCookie?: boolean;

  fields?: Extract<keyof T, string>[];

  exclude?: string[];

  limit?: number;

  offset?: number;

  /**
   * Allow the entity ID to be pregenerated in create operations
   * @warning Letting users set IDs can lead to security issues
   */
  allowIdOverride?: boolean;
}
