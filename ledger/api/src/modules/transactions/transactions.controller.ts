import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.strategy';
import { TransactionsService } from './transactions.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransactionEntity } from './transaction.entity';
import { Crud, CrudAuth, CrudController } from '@dataui/crud';

@UseGuards(JwtAuthGuard)
@Crud({
  model: {
    type: TransactionEntity,
  },
  query: {
    join: {
      entries: {
        eager: true,
      },
    },
  },
})
// @CrudAuth({
//   property: 'user',
//   filter: (user: any) => {
//     return { userId: user.id };
//   },
//   persist: (user: any) => {
//     return { userId: user.id };
//   },
// })
@ApiTags('Transactions')
@ApiBearerAuth()
@Controller('transactions')
export class TransactionsController
  implements CrudController<TransactionEntity>
{
  constructor(public service: TransactionsService) {}
}
