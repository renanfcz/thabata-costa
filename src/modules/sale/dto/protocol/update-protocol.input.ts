import { InputType, Field, PartialType } from '@nestjs/graphql'
import { CreateProtocolInput } from './create-protocol.input'

@InputType()
export class UpdateProtocolInput extends PartialType(CreateProtocolInput) {
  @Field(() => String)
  protocolName: string

  @Field(() => String)
  protocolDesc: string
}
