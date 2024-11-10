import { CrudRequest, Override } from '@dataui/crud';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/db/entities';
import { Repository } from 'typeorm';

export class OrderService extends TypeOrmCrudService<OrderEntity> {
  constructor(
    @InjectRepository(OrderEntity) repo: Repository<OrderEntity>,
    private readonly mailerService: MailerService,
  ) {
    super(repo);
  }

  @Override()
  async getOne(req: CrudRequest) {
    const order = await super.getOne(req);

    console.log(this.mailerService);
    const sendRes = await this.mailerService.sendMail({
      to: 'luchevich31@gmail.com',
      from: process.env.EMAIL_USER,
      subject: 'Order created',
      template: 'order',
      context: {
        ...order,
      },
    });
    console.log(sendRes);

    return order;
  }
}
