import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionEntity } from './Question.entity';
import { UserEntity } from './User.entity';

@Entity({ name: 'answer' })
@Unique(['question', 'user'])
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => QuestionEntity, (question) => question.answers, {
    createForeignKeyConstraints: true,
  })
  question: QuestionEntity;

  @ManyToOne(() => UserEntity, (user) => user.answers, {})
  user: UserEntity;
}
