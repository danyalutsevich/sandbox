import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EntryEntity } from './entry.entity';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';
import { EntryService } from './entry.service';

@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: EntryEntity,
  },
  query: {
    join: {
      account: { eager: true },
      'account.user': { eager: true, exclude: ['password'] },
      'account.balance': { eager: true },
      currency: { eager: true },
      transaction: { eager: true },
    },
  },
})
@CrudAuth({
  property: 'user',
  filter: (user: any) => {
    return { '"account"."userId"': user.userId };
  },
  // persist: (user: any) => {
  //   return { userId: user.id };
  // },
})
@ApiTags('Entry')
@ApiBearerAuth()
@Controller('entry')
export class EntryController implements CrudController<EntryEntity> {
  constructor(public service: EntryService) {}
}
