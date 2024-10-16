import { Crud, CrudController } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { OrderEntity } from 'src/db/entities';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: {
    type: OrderEntity,
  },
  query: {
    softDelete: true,
    join: {
      service: { alias: 'service' },
    },
  },
})
@ApiTags('Order')
@Controller('order')
export class OrderController implements CrudController<OrderEntity> {
  constructor(public service: OrderService) { }
}
