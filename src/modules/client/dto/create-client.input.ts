import { InputType, Field } from '@nestjs/graphql'
import { KnowUs, SocialMedia } from '@prisma/client'

@InputType()
export class CreateClientInput {
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

  @Field(() => String, { nullable: true })
  street?: string

  @Field(() => Number, { nullable: true })
  number?: number

  @Field(() => String, { nullable: true })
  complement?: string

  @Field(() => KnowUs, { nullable: true })
  knowUs?: KnowUs

  @Field(() => String, { nullable: true })
  recommendedBy?: string

  @Field(() => String, { nullable: true })
  socialMediaId?: string

  @Field(() => SocialMedia, { nullable: true })
  socialMedia?: SocialMedia
}
