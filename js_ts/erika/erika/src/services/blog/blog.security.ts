import { CrudSecurity } from '@eicrud/core/config';
import { serviceCmds } from './cmds';
import { Blog } from './blog.entity';

export function getSecurity(blog: string): CrudSecurity<Blog> {
  return {
    rolesRights: {
      guest: {
        async defineCRUDAbility(can, cannot, ctx) {
          // Define abilities for guest
          can('read', blog);
        },
      },
      user: {
        async defineCRUDAbility(can, cannot, ctx) {
          // Define abilities for user
          can('cr', blog);
          can('update', blog, { author: ctx.userId });
          can('delete', blog, { author: ctx.userId });
        },
      },
    },

    cmdSecurityMap: Object.keys(serviceCmds).reduce((acc, cmd) => {
      acc[cmd] = serviceCmds[cmd].getCmdSecurity(cmd, blog);
      return acc;
    }, {}),
  };
}
