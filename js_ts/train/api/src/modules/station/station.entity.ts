import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'station' })
export class StationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  name: string;

  @IsNumber()
  @Column({ type: 'float' })
  lat: number;

  @IsNumber()
  @Column({ type: 'float' })
  lng: number;

  @IsNumber()
  @Column()
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
