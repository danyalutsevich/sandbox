import { Type } from 'class-transformer';
import { GetManyDefaultResponse } from '../interfaces';
import { ApiProperty } from './swagger.helper';

export class SerializeHelper {
  /**
   * generate DTO for getMany
   * add additional fields for pagination such as count, total, ...
   *
   * @param dto the DTO or entity that used for getOne
   * @param resourceName
   * @returns
   */
  static createGetManyDto(dto: any, resourceName: string): any {
    class GetManyResponseDto implements GetManyDefaultResponse<any> {
      @ApiProperty({ type: dto, isArray: true })
      @Type(() => dto)
      data: any[];

      @ApiProperty({ type: 'number' })
      count: number;

      @ApiProperty({ type: 'number' })
      total: number;

      @ApiProperty({ type: 'number' })
      page: number;

      @ApiProperty({ type: 'number' })
      pageCount: number;
    }

    Object.defineProperty(GetManyResponseDto, 'name', {
      writable: false,
      value: `GetMany${resourceName}ResponseDto`,
    });

    return GetManyResponseDto;
  }

  /**
   * generate a DTO from an entity name
   * @param resourceName
   * @returns a class that has a `name` property
   * @example
   * ```
   *  let UserDTO = createGetOneResponseDto("user")
   *  console.log(UserDTO);
   *  // Class UserDTO{
   *  //  name: "userResponseDto";
   *  // }
   * ```
   */
  static createGetOneResponseDto(resourceName: string): any {
    class GetOneResponseDto {}

    Object.defineProperty(GetOneResponseDto, 'name', {
      writable: false,
      value: `${resourceName}ResponseDto`,
    });

    return GetOneResponseDto;
  }
}
