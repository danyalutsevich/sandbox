import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IsString, IsOptional } from 'class-validator';
import { CrudEntity } from '@eicrud/core/crud';
import { User } from '../user/user.entity';

@Entity()
export class Blog implements CrudEntity {
  @PrimaryKey({ name: '_id' })
  @IsString()
  @IsOptional()
  id: string;

  @Property()
  @IsOptional()
  title: string;

  @Property()
  @IsOptional()
  content: string;

  @Property()
  createdAt: Date;

  @Property()
  updatedAt: Date;

  @ManyToOne(() => User)
  @IsString()
  author: User | string;
}
