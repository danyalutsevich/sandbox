import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Root {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
