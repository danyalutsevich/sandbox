import { User } from '../user/user.entity';

export class Blog {
  id: string;

  title: string;

  content: string;

  createdAt: Date;

  updatedAt: Date;

  author: User | string;
}
