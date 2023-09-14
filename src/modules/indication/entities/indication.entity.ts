import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType()
export class Indication {
  @Field(() => String)
  id: string

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
