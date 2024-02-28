import { CreateSessionInput } from './create-session.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { SessionStatus } from '@prisma/client'

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field(() => String)
  id: string

  @Field(() => SessionStatus)
  status?: SessionStatus
}
