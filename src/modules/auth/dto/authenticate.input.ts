import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class AuthenticateInput {
  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}
