import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'location' })
export class LocationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  latitude: number;
  
  @Column()
  longitude: number;
}
