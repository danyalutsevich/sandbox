import { MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { I18nColumn } from 'typeorm-i18n';

@Entity({ name: 'i18n' })
export class I18nEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(3)
  @I18nColumn({
    languages: ['en', 'de', 'fr', 'es'],
    default_language: 'en',
  })
  @Column()
  name: string;

  @Column()
  description: string;
}
