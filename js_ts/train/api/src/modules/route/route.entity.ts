import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { StationEntity } from "../station/station.entity";
import { TrainEntity } from "../train/train.entity";


@Entity({ name: 'route' })
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => StationEntity)
  originStation: StationEntity;

  @ManyToOne(() => StationEntity)
  destinationStation: StationEntity;

  @OneToMany(() => TrainEntity, train => train.route)
  trains: TrainEntity[];

  @Column()
  distance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
