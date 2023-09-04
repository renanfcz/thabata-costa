import { CreateClientInput } from './create-client.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateClientInput extends PartialType(CreateClientInput) {
  @Field(() => String)
  name: string

  @Field(() => String)
  cpf: string

  @Field(() => Date)
  dateBirth: Date

  @Field(() => String)
  celphone: string

  @Field(() => String)
  state: string

  @Field(() => String)
  city: string

  @Field(() => String)
  street: string

  @Field(() => Number)
  number: number

  @Field(() => String)
  complement: string

  @Field(() => String)
  knowUs: string

  @Field(() => String)
  socialMediaId: string

  @Field(() => String)
  socialMedia: string
}
