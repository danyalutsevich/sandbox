import { SayHelloDto, SayHelloReturnDto } from './cmds/say_hello/say_hello.dto';
import { SuperClientConfig, ClientOptions, CrudClient } from "@eicrud/client";
import { ICrudOptions } from "@eicrud/shared/interfaces";
import { Blog } from "./blog.entity";


export class BlogClient extends CrudClient<Blog> {
  constructor(config: SuperClientConfig) {
    super({...config, serviceName: 'blog'});
  }
  // GENERATED START
  async say_hello(
      dto: SayHelloDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<SayHelloReturnDto> {
      return super.cmd('say_hello', dto, options, copts);
  }

  async say_helloS(
      dto: SayHelloDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<SayHelloReturnDto> {
      return super.cmdS('say_hello', dto, options, copts);
  }

  async say_helloL(
      dto: SayHelloDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<SayHelloReturnDto> {
      return super.cmdL('say_hello', dto, options, copts) as any;
  }

  async say_helloSL(
      dto: SayHelloDto,
      options: ICrudOptions = undefined,
      copts?: ClientOptions,
    ): Promise<SayHelloReturnDto> {
      return super.cmdSL('say_hello', dto, options, copts) as any;
  }

}