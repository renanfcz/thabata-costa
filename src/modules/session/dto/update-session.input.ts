import { CreateSessionInput } from './create-session.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { Client } from 'src/modules/client/entities/client.entity'
import { Procedure } from 'src/modules/procedure/entities/procedure.entity'

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field(() => String)
  id: string

  @Field(() => Date)
  appointment: Date

  @Field(() => String)
  procedureId: string

  @Field(() => String)
  clientId: string
}
