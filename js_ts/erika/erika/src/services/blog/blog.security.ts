import { CrudSecurity } from '@eicrud/core/config';
import { serviceCmds } from './cmds';
import { Blog } from './blog.entity';

export function getSecurity(blog: string): CrudSecurity<Blog> {
  return {
    alwaysAllowedCrudOptions: ['returnUpdatedEntities'],
    rolesRights: {
      guest: {
        async defineCRUDAbility(can, cannot, ctx) {
          // Define abilities for guest
          can('create', blog, { author: ctx.userId });
          can('read', blog, {});
          can('update', blog, { author: ctx.userId });
          can('delete', blog, { author: ctx.userId });
        },
      },
      user: {
        async defineCRUDAbility(can, cannot, ctx) {
          // Define abilities for user
          can('create', blog, { author: ctx.userId });
          can('read', blog, {});
          can('update', blog, { author: ctx.userId });
          can('delete', blog, { author: ctx.userId });
          // ctx.data.author = ctx.userId;
        },
      },
    },

    cmdSecurityMap: Object.keys(serviceCmds).reduce((acc, cmd) => {
      acc[cmd] = serviceCmds[cmd].getCmdSecurity(cmd, blog);
      return acc;
    }, {}),
  };
}
