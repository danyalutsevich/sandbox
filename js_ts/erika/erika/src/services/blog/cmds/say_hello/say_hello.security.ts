import { CmdSecurity } from '@eicrud/core/config';
import { say_hello } from './say_hello.action';
import { SayHelloDto, SayHelloReturnDto } from './say_hello.dto';
import { Blog } from '../../blog.entity';
import { hooks } from './say_hello.hooks';

const getCmdSecurity = (
  say_hello: any,
  blog: any,
): CmdSecurity<SayHelloDto, Blog, SayHelloReturnDto> => {
  return {
    dto: SayHelloDto,
    hooks,
    rolesRights: {
      guest: {
        async defineCMDAbility(can, cannot, ctx) {
          // Define abilities for user
          can(say_hello, blog);
        },
      },
    },
  };
};

export const SayHelloSecurity = {
  getCmdSecurity,
  action: say_hello,
};
