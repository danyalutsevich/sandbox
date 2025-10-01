import { Args, Int, Query, Resolver, Mutation } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver((of) => User)
export class UserResolver {
  users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  @Query((returns) => [User], { name: 'users' })
  getUsers(): User[] {
    return this.users;
  }

  @Query((returns) => User, { name: 'user' })
  getUser(@Args('id', { type: () => Int }) id: number): User {
    return this.users.find((user) => user.id === id);
  }

  @Mutation((returns) => User, { name: 'createUser' })
  createUser(@Args('name') name: string): User {
    const newUser = { id: this.users.length + 1, name };
    this.users.push(newUser);
    return newUser;
  }
}
