import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateIndicationInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  celphone: string

  @Field(() => String)
  socialMedia: string

  @Field(() => String)
  socialMediaId: string

  @Field(() => String)
  clientId: string
}
