import { ValidationPipe } from '@nestjs/common';
import { isFalse, isNil } from '@dataui/crud-util';
import { CrudValidationGroups } from '../enums';
import { CreateManyDto, CrudOptions, MergedCrudOptions } from '../interfaces';
import { safeRequire } from '../util';
import { ApiProperty } from './swagger.helper';

/** class-validator */
const validator = safeRequire('class-validator', () => require('class-validator'));
/** class-transformer */
const transformer = safeRequire('class-transformer', () => require('class-transformer'));

class BulkDto<T> implements CreateManyDto<T> {
  bulk: T[];
}

export class Validation {
  /**
   * returns an instance of NestJs ValidationPipe to validate the incoming request
   *
   * @param options
   * @param group
   * @returns `new ValidationPipe({ ...opts.validation, groups })
   */
  static getValidationPipe(
    options: CrudOptions,
    group?: CrudValidationGroups,
  ): ValidationPipe {
    return validator && !isFalse(options.validation)
      ? new ValidationPipe({
          ...(options.validation || {}),
          groups: group ? [group] : undefined,
        })
      : /* istanbul ignore next */ undefined;
  }

  /**
   * generate a DTO class for bulk operations
   * and add validation decorators from class-validator and class-transformer
   *
   * the generated DTO is similar to:
   * ```
   * class BulkDTO {
   *   @ApiProperty(...)
   *   bulk: T[];
   *   name: "createManyUserEntityDto"
   * }
   * ```
   * @param options
   * @returns
   */
  static createBulkDto<T = any>(options: MergedCrudOptions): any {
    /* istanbul ignore else */
    if (validator && transformer && !isFalse(options.validation)) {
      const { IsArray, ArrayNotEmpty, ValidateNested } = validator;
      const { Type } = transformer;
      const hasDto = !isNil(options.dto.create);
      const groups = !hasDto ? [CrudValidationGroups.CREATE] : undefined;
      const always = hasDto ? true : undefined;
      const Model = hasDto ? options.dto.create : options.model.type;

      // tslint:disable-next-line:max-classes-per-file
      class BulkDtoImpl implements CreateManyDto<T> {
        @ApiProperty({ type: Model, isArray: true })
        @IsArray({ groups, always })
        @ArrayNotEmpty({ groups, always })
        @ValidateNested({ each: true, groups, always })
        @Type(() => Model)
        bulk: T[];
      }

      Object.defineProperty(BulkDtoImpl, 'name', {
        writable: false,
        value: `CreateMany${options.model.type.name}Dto`,
      });

      return BulkDtoImpl;
    } else {
      return BulkDto;
    }
  }
}
