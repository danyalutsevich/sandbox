import { CmdSecurity, baseCmds } from '@eicrud/core/config';
import { User } from '../../user.entity';

const getCmdSecurity = (create_account, user): CmdSecurity<CmdDto, User> => {
  return {
    minTimeBetweenCmdCallMs: 1000,
    dto: baseCmds.createAccount.dto,
    rolesRights: {
      guest: {
        async defineCMDAbility(can, cannot, ctx) {
          // Define abilities for user
          console.log('create_account.security.ts: user: ', user, 'ctx: ', ctx);
          can(create_account, user, { role: 'user' });
        },
      },
    },
  };
};

export const createAccountSecurity = {
  getCmdSecurity,
};

class CmdDto extends baseCmds.createAccount.dto {}
