import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RootResolver {
  @Query((returns) => String)
  getUsers(): string {
    return 'Hello World';
  }
}
