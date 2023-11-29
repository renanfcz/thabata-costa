import { InputType, Field } from '@nestjs/graphql'
import { SocialMedia } from '@prisma/client'

@InputType()
export class CreateIndicationInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  celphone: string

  @Field(() => SocialMedia, { nullable: true })
  socialMedia: SocialMedia

  @Field(() => String, { nullable: true })
  socialMediaId: string

  @Field(() => String)
  clientId: string
}
