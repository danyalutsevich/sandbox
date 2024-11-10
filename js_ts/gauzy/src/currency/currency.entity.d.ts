import { ICurrency } from '../../plugins/contracts/dist/index';
import { BaseEntity } from '../core/entities/internal';
export declare class Currency extends BaseEntity implements ICurrency {
    isoCode: string;
    currency: string;
}
