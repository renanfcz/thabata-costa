import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  email: string

  @Field(() => String)
  nickname: string

  @Field(() => String)
  password: string

  @Field(() => Date)
  createdAt: Date
}
