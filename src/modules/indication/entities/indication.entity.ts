import { ObjectType, Field, registerEnumType } from '@nestjs/graphql'
import { SocialMedia } from '@prisma/client'

@ObjectType()
export class Indication {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  celphone: string

  @Field(() => SocialMedia, { nullable: true })
  socialMedia?: SocialMedia

  @Field(() => String, { nullable: true })
  socialMediaId?: string

  @Field(() => String)
  clientId: string
}

registerEnumType(SocialMedia, {
  name: 'SocialMedia',
})
