import { Repository } from 'typeorm';
import { Payment } from '../payment.entity';
export declare class TypeOrmPaymentRepository extends Repository<Payment> {
    readonly repository: Repository<Payment>;
    constructor(repository: Repository<Payment>);
}
