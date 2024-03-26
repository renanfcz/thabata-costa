import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateAnamnesisInput {
  @Field(() => String)
  protocolType: string

  @Field(() => String)
  clientId: string

  @Field(() => String)
  data: string
}
