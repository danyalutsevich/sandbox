import { CmdSecurity, baseCmds } from '@eicrud/core/config';
import { User } from '../../user.entity';

const getCmdSecurity = (login, user): CmdSecurity<CmdDto, User> => {
  return {
    minTimeBetweenCmdCallMs: 1000,
    dto: baseCmds.login.dto,
    rolesRights: {
      guest: {
        async defineCMDAbility(can, cannot, ctx) {
          // Define abilities for user
          can(login, user);
        },
      },
    },
  };
};

export const loginSecurity = {
  getCmdSecurity,
};

class CmdDto extends baseCmds.login.dto {}
