import { CreateClientInput } from './create-client.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { KnowUs, SocialMedia } from '@prisma/client'

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

  @Field(() => KnowUs)
  knowUs: KnowUs

  @Field(() => String)
  recommendedBy: string

  @Field(() => String)
  socialMediaId: string

  @Field(() => SocialMedia)
  socialMedia: SocialMedia
}
