import { CmdSecurity, baseCmds } from '@eicrud/core/config';
import { User } from '../../user.entity';

const getCmdSecurity = (check_jwt, user): CmdSecurity<CmdDto, User> => {
  return {
    minTimeBetweenCmdCallMs: 1000,
    dto: baseCmds.checkJwt.dto,
    rolesRights: {
      guest: {
        async defineCMDAbility(can, cannot, ctx) {
          // Define abilities for user
          console.log('check_jwt.security.ts: ctx: ', ctx);
          can(check_jwt, user);
        },
      },
    },
  };
};

export const checkJwtSecurity = {
  getCmdSecurity,
};

class CmdDto extends baseCmds.checkJwt.dto {}
