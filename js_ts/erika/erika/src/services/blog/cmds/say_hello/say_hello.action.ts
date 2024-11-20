import { SayHelloDto, SayHelloReturnDto } from './say_hello.dto';
import { BlogService } from '../../blog.service';
import { CrudContext, Inheritance } from '@eicrud/core/crud';

export async function say_hello(
  this: BlogService,
  dto: SayHelloDto,
  ctx: CrudContext,
  inheritance?: Inheritance,
): Promise<SayHelloReturnDto> {
  console.log('Hello ' + dto.hello);
  return 'Hello ' + dto.hello;
}
