import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class AuthenticateInput {
  @Field(() => String)
  nickname: string

  @Field(() => String)
  password: string
}
