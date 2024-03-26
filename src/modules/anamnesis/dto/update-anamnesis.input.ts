import { Field, InputType } from '@nestjs/graphql'
import { CreateAnamnesisInput } from './create-anamnesis.input'
import { PartialType } from '@nestjs/mapped-types'

@InputType()
export class UpdateAnamnesisInput extends PartialType(CreateAnamnesisInput) {
  @Field(() => String)
  id: string

  @Field(() => String, { nullable: true })
  protocolType: string

  @Field(() => Date, { nullable: true })
  signedIn: Date

  @Field(() => String, { nullable: true })
  signature: string

  @Field(() => String, { nullable: true })
  data: string
}
