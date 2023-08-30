import { CreateIndicationInput } from './create-indication.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateIndicationInput extends PartialType(CreateIndicationInput) {
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
