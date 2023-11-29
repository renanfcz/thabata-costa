import { CreateIndicationInput } from './create-indication.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { SocialMedia } from '@prisma/client'

@InputType()
export class UpdateIndicationInput extends PartialType(CreateIndicationInput) {
  @Field(() => String)
  name: string

  @Field(() => String)
  celphone: string

  @Field(() => SocialMedia)
  socialMedia: SocialMedia

  @Field(() => String)
  socialMediaId: string

  @Field(() => String)
  clientId: string
}
