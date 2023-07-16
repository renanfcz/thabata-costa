import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateClientInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  telephone: string

  @Field(() => String)
  address: string
}
